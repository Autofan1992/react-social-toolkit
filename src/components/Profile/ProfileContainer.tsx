import { FC, memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getAppState, getAuthState, getProfileState } from '../../redux/selectors/selectors'
import { fetchUserProfile, fetchUserStatus } from '../../redux/reducers/profile-reducer'
import useAuthRedirect from '../hooks/useAuthRedirect'
import ProfileForm from './ProfileForm'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../common/Preloader/Preloader'

const ProfileContainer: FC = memo(() => {
    const { userId: urlUserId } = useParams()
    const dispatch = useAppDispatch()
    const { initialized } = useAppSelector(getAppState)
    const { authInfo } = useAppSelector(getAuthState)
    const { id: authUserId } = authInfo
    const { profile, isFetching, status, error } = useAppSelector(getProfileState)
    const [editMode, setEditMode] = useState(false)
    const isProfileId = !urlUserId || (authUserId === +urlUserId)
    const userId = urlUserId ? +urlUserId : authUserId

    useAuthRedirect()

    useEffect(() => {
        if (userId && initialized) {
            if (profile && userId !== profile.userId) dispatch(fetchUserProfile(userId))
            dispatch(fetchUserStatus(userId))
        }
    }, [dispatch, userId, initialized])

    if (!profile) return <Preloader/>

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <>
            {editMode
                ? <ProfileForm
                    serverError={error}
                    isProfileId={isProfileId}
                    isFetching={isFetching}
                    toggleEditMode={toggleEditMode}
                    profile={profile}
                />
                : <ProfileInfo
                    serverError={error}
                    isFetching={isFetching}
                    profile={profile}
                    isProfileId={isProfileId}
                    status={status}
                    toggleEditMode={toggleEditMode}
                />}
        </>
    )
})

export default ProfileContainer