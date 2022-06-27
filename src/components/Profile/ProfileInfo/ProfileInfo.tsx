import { FC, memo } from 'react'
import ProfileAvatar from './ProfileAvatar'
import avatar from '../../../assets/images/user.svg'
import ProfileStatus from './ProfileStatus'
import Posts from '../MyPosts/Posts'
import Preloader from '../../common/Preloader/Preloader'
import { Space } from 'antd'
import styles from '../../../pages/Profile/ProfilePage.module.scss'
import { Link } from 'react-router-dom'
import { ProfileType } from '../../../types/profile-types'

const ProfileInfo: FC<PropsType> = memo((
    {
        isProfileId,
        isFetching,
        profile,
        status,
    }) => {

    if (isFetching) return <Preloader/>

    return <>
        <div>
            <div className={styles.profileBg}></div>
            <Space>
                <div>
                    <ProfileAvatar
                        isProfileId={isProfileId}
                        avatar={(profile.photos.large ?? profile.photos.small) || avatar}
                        isFetching={isFetching}
                    />
                    {isProfileId &&
                        <div className="text-end">
                            <Link to={'edit'}>Edit profile</Link>
                        </div>
                    }
                </div>
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
        <Posts/>
    </>
})

export default ProfileInfo

export type PropsType = {
    profile: ProfileType
    status: string | null
    isProfileId: boolean
    isFetching: boolean
}