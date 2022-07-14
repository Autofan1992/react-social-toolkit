import { FC, useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useAppDispatch } from '../../../redux/hooks/hooks'
import { setUserStatus } from '../../../redux/slices/profile-slice'

const ProfileStatus: FC<PropsType> = ({ status, isProfileId, isFetching }) => {
    const dispatch = useAppDispatch()
    const [currentStatus, setStatus] = useState(status)

    useEffect(() => {
        setStatus(status)
    }, [status])

    const handleStatusUpdate = (text: string) => {
        if (text !== status) dispatch(setUserStatus(text))
    }

    return <div>
        <Typography.Title
            level={5}
            disabled={isFetching}
            editable={isProfileId && {
                icon: <EditOutlined/>,
                onChange: (text) => handleStatusUpdate(text)
            }}
        >{currentStatus}
        </Typography.Title>
    </div>
}

type PropsType = {
    status: string | null
    isProfileId: boolean
    isFetching: boolean
}

export default ProfileStatus