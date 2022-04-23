import { FC, memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getAuthState, getProfileState } from '../../redux/selectors/selectors'
import {
    fetchUserProfile,
    fetchUserStatus,
    saveUserProfile,
    setUserAvatar,
    setUserStatus
} from '../../redux/reducers/profile-reducer'
import useAuthRedirect from '../hooks/useAuthRedirect'
import { ProfileType } from '../../types/types'
import ProfileForm from './ProfileForm'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../common/Preloader/Preloader'

const ProfileContainer: FC = memo(() => {
    const { userId: urlUserId } = useParams()
    const dispatch = useAppDispatch()
    const { id: profileUserId } = useAppSelector(getAuthState).profile
    const { profile, isFetching, status, error } = useAppSelector(getProfileState)
    const [editMode, setEditMode] = useState(false)
    const isProfileId = !urlUserId || (profileUserId === +urlUserId)

    useAuthRedirect()

    useEffect(() => {
        const userId = urlUserId ? +urlUserId : profileUserId
        if (userId) {
            dispatch(fetchUserProfile(userId))
            dispatch(fetchUserStatus(userId))
        }
    }, [urlUserId, profileUserId, fetchUserProfile, fetchUserStatus, dispatch])

    if (!profile) return <Preloader/>

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleSaveProfile = (values: ProfileType) => {
        dispatch(saveUserProfile(values))
    }

    const handleStatusUpdate = (status: string) => {
        dispatch(setUserStatus(status))
    }

    const handleAvatarUpdate = (avatar: File) => {
        dispatch(setUserAvatar(avatar))
    }

    return (
        <>
            {editMode ?
                <ProfileForm
                    serverError={error}
                    isProfileId={isProfileId}
                    isFetching={isFetching}
                    toggleEditMode={toggleEditMode}
                    profile={profile}
                    saveProfile={handleSaveProfile}/> :
                <ProfileInfo
                    serverError={error}
                    isFetching={isFetching}
                    profile={profile}
                    isProfileId={isProfileId}
                    status={status}
                    updateUserStatus={handleStatusUpdate}
                    updateUserAvatar={handleAvatarUpdate}
                    toggleEditMode={toggleEditMode}
                />}
        </>
    )
})

export default ProfileContainer