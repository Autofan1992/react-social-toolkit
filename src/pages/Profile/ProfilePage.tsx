import { FC, memo, useEffect } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { fetchUserProfile, fetchUserStatus } from '../../redux/reducers/profile-reducer'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import ProfileForm from '../../components/Profile/ProfileForm'
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo'
import Preloader from '../../components/common/Preloader/Preloader'
import { selectAuthUserId } from '../../redux/selectors/auth-selectors'
import { selectAppInitialized } from '../../redux/selectors/app-selectors'
import { selectProfileError, selectProfileIsFetching, selectProfile, selectProfileStatus } from '../../redux/selectors/profile-selectors'

const ProfilePage: FC = memo(() => {
    const { userId: urlUserId } = useParams()
    const editProfile = useMatch('/profile/edit')
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(selectAppInitialized)
    const authUserId = useAppSelector(selectAuthUserId)
    const profile = useAppSelector(selectProfile)
    const isFetching = useAppSelector(selectProfileIsFetching)
    const error = useAppSelector(selectProfileError)
    const status = useAppSelector(selectProfileStatus)

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