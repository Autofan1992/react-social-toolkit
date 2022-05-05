import { ChangeEvent, FC } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import userPhoto from '../../../images/user.svg'
import { EditOutlined } from '@ant-design/icons'

const ProfileAvatar: FC<PropsType> = ({ isProfileId, avatar, savePhoto, isFetching }) => {
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        savePhoto(e.target.files[0])
    }

    return (
        <div>
            {isFetching && <Preloader/>}
            <div style={{
                display: 'block',
                position: 'relative',
                maxWidth: 150
            }}>
                <img src={avatar ?? userPhoto} alt="avatar"/>
                {isProfileId &&
                    <>
                        <input type="file" onChange={handleAvatarChange} style={{ display: 'none' }}/>
                        <label className="ant-typography-edit" style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 20,
                            fontSize: '1.5rem'
                        }}>
                            <EditOutlined/>
                        </label>
                    </>
                }
            </div>
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