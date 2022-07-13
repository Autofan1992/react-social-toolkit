import { FC, memo, useEffect } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { fetchUserProfile, fetchUserStatus } from '../../redux/slices/profile-slice'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import ProfileForm from '../../components/Profile/ProfileForm'
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo'
import Preloader from '../../components/common/Preloader/Preloader'
import { selectAuthUserId } from '../../redux/selectors/auth-selectors'
import {
    selectProfile,
    selectProfileError,
    selectProfileIsFetching,
    selectProfileStatus
} from '../../redux/selectors/profile-selectors'

const ProfilePage: FC = memo(() => {
    const { userId: urlUserId } = useParams()
    const profilePath = useMatch('/profile')
    const editProfilePath = useMatch('/profile/edit')
    const dispatch = useAppDispatch()
    const authUserId = useAppSelector(selectAuthUserId)
    const profile = useAppSelector(selectProfile)
    const isFetching = useAppSelector(selectProfileIsFetching)
    const error = useAppSelector(selectProfileError)
    const status = useAppSelector(selectProfileStatus)

    useAuthRedirect()

    const isProfileId = !urlUserId || (authUserId === +urlUserId)

    useEffect(() => {
        if (authUserId) {
            if (!profilePath && urlUserId) {
                dispatch(fetchUserProfile(+urlUserId))
                dispatch(fetchUserStatus(+urlUserId))
                return
            }

            dispatch(fetchUserProfile(authUserId))
            dispatch(fetchUserStatus(authUserId))
        }
    }, [authUserId, dispatch, profilePath, urlUserId])

    if (!profile) return <Preloader/>

    return (
        <div className="container">
            {editProfilePath
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
        </div>
    )
})

export default ProfilePage