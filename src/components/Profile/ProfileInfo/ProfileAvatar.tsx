import { ChangeEvent, FC } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import userPhoto from '../../../assets/images/user.svg'
import { EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../redux/hooks/hooks'
import { setUserAvatar } from '../../../redux/reducers/profile-reducer'
import styles from '../Profile.module.scss'

type PropsType = {
    isProfileId: boolean
    avatar: string
    isFetching: boolean
}

const ProfileAvatar: FC<PropsType> = ({ isProfileId, avatar, isFetching }) => {
    const dispatch = useAppDispatch()
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        dispatch(setUserAvatar(e.target.files[0]))
    }

    return (
        <div>
            {isFetching && <Preloader/>}
            <div className={`${styles.profileAvatar} d-block position-relative`}>
                <img src={avatar ?? userPhoto} alt="avatar"/>
                {isProfileId &&
                    <>
                        <input type="file" onChange={handleAvatarChange} className="d-none"/>
                        <label className={`ant-typography-edit fs-4 ${styles.avatarLabel}`} >
                            <EditOutlined/>
                        </label>
                    </>
                }
            </div>
        </div>
    )
}

export default ProfileAvatar