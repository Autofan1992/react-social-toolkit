import { FC, memo } from 'react'
import ProfileAvatar from './ProfileAvatar'
import avatar from '../../../assets/images/user.svg'
import ProfileStatus from './ProfileStatus'
import Posts from '../MyPosts/Posts'
import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { ProfileType } from '../../../types/profile-types'
import { FormOutlined } from '@ant-design/icons'
import styles from './ProfileInfo.module.scss'
import { useAppSelector } from '../../../redux/hooks/hooks'
import { selectIsDarkTheme } from '../../../redux/selectors/app-selectors'

const ProfileInfo: FC<PropsType> = memo((
    {
        isProfileId,
        isFetching,
        profile,
        status,
    }) => {

    const isDarkTheme = useAppSelector(selectIsDarkTheme)

    return <Row justify="center">
        <Col lg={20} xl={16}>
            <Card className={`${styles.profileCard} ${isDarkTheme ? `card-dark` : ``} mb-2`}>
                <ProfileAvatar
                    isProfileId={isProfileId}
                    avatar={(profile.photos.large ?? profile.photos.small) || avatar}
                />
                {isProfileId &&
                    <div className="text-end">
                        <Link to={'edit'}><FormOutlined/></Link>
                    </div>
                }
                <div className={styles.profileInfo}>
                    <h2>{profile.fullName} {profile.lookingForAJob && '- Looking for new opportunities'}</h2>
                    <ProfileStatus
                        isFetching={isFetching}
                        isProfileId={isProfileId}
                        status={status}
                    />
                </div>
            </Card>
            {profile.lookingForAJobDescription && (
                <Card className={`${isDarkTheme ? `card-dark` : ``} mb-2`}>
                    <h2>Skills</h2>
                    <h3>{profile.lookingForAJobDescription}</h3>
                </Card>
            )}
            {profile.aboutMe && (<Card className={`${isDarkTheme ? `card-dark` : ``} mb-2`}>
                <h2>About me</h2>
                <h3>{profile.aboutMe}</h3>
            </Card>)}
            {Object.entries(profile.contacts).some(el => el && el.length > 2) && (
                <Card className={`${isDarkTheme ? `card-dark` : ``} mb-2`}>
                    <h2>My socials:</h2>
                    {Object.entries(profile.contacts).map(([title, url]) => (
                        url &&
                        <a target="_blank" rel="noreferrer" className={title} key={url} href={url}>{title}</a>
                    ))}
                </Card>)}
            {isProfileId && (
                <>
                    <hr className="my-5"/>
                    <Posts/>
                </>
            )}
        </Col>
    </Row>
})

type PropsType = {
    profile: ProfileType
    status: string | null
    isProfileId: boolean
    isFetching: boolean
}

export default ProfileInfo