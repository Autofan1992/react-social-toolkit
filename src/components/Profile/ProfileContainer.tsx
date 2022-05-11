import { FC, memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getAuthState, getProfileState } from '../../redux/selectors/selectors'
import { fetchUserProfile, fetchUserStatus } from '../../redux/reducers/profile-reducer'
import useAuthRedirect from '../hooks/useAuthRedirect'
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
    }, [urlUserId, profileUserId, dispatch])

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