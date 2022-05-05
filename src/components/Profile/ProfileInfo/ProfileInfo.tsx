import { FC } from 'react'
import ProfileAvatar from './ProfileAvatar'
import avatar from '../../../images/user.svg'
import ProfileStatus from './ProfileStatus'
import { ProfileType } from '../../../types/types'
import PostsContainer from '../MyPosts/PostsContainer'
import Preloader from '../../common/Preloader/Preloader'
import profileThumbnailBig from '../../../images/profile-thumbnail-big.jpg'
import { Space } from 'antd'

const ProfileInfo: FC<PropsType> = (
    {
        isProfileId,
        toggleEditMode,
        isFetching,
        profile,
        status,
        updateUserAvatar,
        updateUserStatus,
        serverError
    }) => {

    if (isFetching) return <Preloader/>

    return <>
        <div>
            <div style={{
                margin: '-30px -30px 0',
                height: '30vh',
                background: `url(${profileThumbnailBig}) no-repeat center / cover`
            }}></div>
            <div>
                {isProfileId &&
                    <div className="text-end">
                        <button onClick={toggleEditMode} className="btn btn-link">Edit profile</button>
                    </div>
                }
                <Space>
                    <ProfileAvatar
                        isProfileId={isProfileId}
                        avatar={(profile.photos.large ?? profile.photos.small) || avatar}
                        savePhoto={updateUserAvatar}
                        isFetching={isFetching}
                    />
                    <div>
                        <ProfileStatus
                            isProfileId={isProfileId}
                            status={status}
                            updateUserStatus={updateUserStatus}
                        />
                        <p>
                            <span>Full name:</span> {profile.fullName}
                        </p>
                        <p>
                            <span>Looking for a job:</span> {profile.lookingForAJob ? 'Yes' : 'No'}
                        </p>
                        {profile.lookingForAJob &&
                            <p>
                                <span>My skills:</span> {profile.lookingForAJobDescription}
                            </p>}
                    </div>
                </Space>
                <div>
                    <p><b>About me</b></p>
                    <p>{profile.aboutMe}</p>
                </div>
                <div>
                    <p><b>My socials:</b></p>
                    {Object.entries(profile.contacts).map(([title, url]) => (
                        url &&
                        <a target="_blank" rel="noreferrer" className={title} key={url} href={url}>{title}</a>
                    ))}
                </div>
            </div>
        </div>
        <PostsContainer/>
    </>
}

export default ProfileInfo

export type PropsType = {
    profile: ProfileType
    status: string | null
    isProfileId: boolean
    updateUserStatus: (status: string) => void
    updateUserAvatar: (avatar: File) => void
    isFetching: boolean
    toggleEditMode: () => void
    serverError: string | null
}