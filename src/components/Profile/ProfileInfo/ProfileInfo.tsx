import { FC, memo } from 'react'
import ProfileAvatar from './ProfileAvatar'
import avatar from '../../../assets/images/user.svg'
import ProfileStatus from './ProfileStatus'
import { ProfileType } from '../../../types/types'
import Posts from '../MyPosts/Posts'
import Preloader from '../../common/Preloader/Preloader'
import { Space } from 'antd'
import styles from '../Profile.module.scss'

const ProfileInfo: FC<PropsType> = memo((
    {
        isProfileId,
        toggleEditMode,
        isFetching,
        profile,
        status,
        serverError
    }) => {
    if (isFetching) return <Preloader/>

    return <>
        <div>
            <div className={styles.profileBg}></div>
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
                        isFetching={isFetching}
                    />
                    <div>
                        <ProfileStatus
                            isProfileId={isProfileId}
                            status={status}
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
        <Posts/>
    </>
})

export default ProfileInfo

export type PropsType = {
    profile: ProfileType
    status: string | null
    isProfileId: boolean
    isFetching: boolean
    toggleEditMode: () => void
    serverError: string | null
}