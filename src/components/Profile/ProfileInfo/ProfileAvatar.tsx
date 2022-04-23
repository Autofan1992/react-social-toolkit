import { ChangeEvent, FC } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import styles from './ProfileInfo.module.scss'
import userPhoto from '../../../images/user.svg'
import { EditOutlined } from '@ant-design/icons'

const ProfileAvatar: FC<PropsType> = ({ isProfileId, avatar, savePhoto, isFetching }) => {
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        savePhoto(e.target.files[0])
    }

    return (
        <div className={styles.avatar}>
            {isFetching && <Preloader/>}
            <label style={{ display: 'block' }}>
                <img src={avatar ?? userPhoto} alt="avatar"/>
                {isProfileId &&
                    <>
                        <input type="file" onChange={handleAvatarChange} style={{ display: 'none' }}/>
                        <div className={`${styles.icon} ant-typography-edit`}>
                            <EditOutlined/>
                        </div>
                    </>
                }
            </label>
        </div>
    )
}

type PropsType = {
    isProfileId: boolean
    avatar: string
    savePhoto: (avatar: File) => void
    isFetching: boolean
}

export default ProfileAvatar