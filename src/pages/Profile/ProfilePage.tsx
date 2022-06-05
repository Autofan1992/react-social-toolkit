import { FC, memo, useEffect } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { fetchUserProfile, fetchUserStatus } from '../../redux/reducers/profile-reducer'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import ProfileForm from '../../components/Profile/ProfileForm'
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo'
import Preloader from '../../components/common/Preloader/Preloader'
import { getAuthUserId } from '../../redux/selectors/auth-selectors'
import { getAppInitialized } from '../../redux/selectors/app-selectors'
import { getError, getIsFetching, getProfile, getStatus } from '../../redux/selectors/profile-selectors'

const ProfilePage: FC = memo(() => {
    const { userId: urlUserId } = useParams()
    const editProfile = useMatch('/profile/edit')
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(getAppInitialized)
    const authUserId = useAppSelector(getAuthUserId)
    const profile = useAppSelector(getProfile)
    const isFetching = useAppSelector(getIsFetching)
    const error = useAppSelector(getError)
    const status = useAppSelector(getStatus)

    useAuthRedirect()

    const isProfileId = !urlUserId || (authUserId === +urlUserId)
    const userId = urlUserId ? +urlUserId : authUserId

    useEffect(() => {
        if (userId && initialized) {
            if (profile && userId !== profile.userId) dispatch(fetchUserProfile(userId))
            dispatch(fetchUserStatus(userId))
        }
    }, [dispatch, userId, initialized])

    if (!profile) return <Preloader/>

    return (
        <>
            {editProfile
                ? <ProfileForm
                    serverError={error}
                    isProfileId={isProfileId}
                    isFetching={isFetching}
                    profile={profile}
                />
                : <ProfileInfo
                    isFetching={isFetching}
                    profile={profile}
                    isProfileId={isProfileId}
                    status={status}
                />}
        </>
    )
})

export default ProfilePage