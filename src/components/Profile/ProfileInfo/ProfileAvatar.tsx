import { ChangeEvent, FC } from 'react'
import userPhoto from '../../../assets/images/user.svg'
import { useAppDispatch } from '../../../redux/hooks/hooks'
import { setUserAvatar } from '../../../redux/slices/profile-slice'
import styles from './ProfileInfo.module.scss'

const ProfileAvatar: FC<PropsType> = ({ isProfileId, avatar }) => {
    const dispatch = useAppDispatch()

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        dispatch(setUserAvatar(e.target.files[0]))
    }

    return (
        <div className={`${styles.profileAvatar} ${isProfileId ? `${styles.isProfile}` : ``}`}>
            <img src={avatar ?? userPhoto} alt="avatar"/>
            {
                isProfileId && (
                    <label className={`ant-typography-edit fs-4 ${styles.avatarLabel}`}>
                        <input type="file" onChange={handleAvatarChange} className="d-none"/>
                    </label>
                )}
        </div>
    )
}

type PropsType = {
    isProfileId: boolean
    avatar: string
}

export default ProfileAvatar