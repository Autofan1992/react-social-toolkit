import { FC, useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useAppDispatch } from '../../../redux/hooks/hooks'
import { setUserStatus } from '../../../redux/reducers/profile-reducer'

const { Paragraph} = Typography

const ProfileStatus: FC<PropsType> = ({ status, isProfileId }) => {
    const dispatch = useAppDispatch()
    const [currentStatus, setStatus] = useState(status)

    useEffect(() => {
        setStatus(status)
    }, [status])

    const handleStatusUpdate = (text: string) => {
        if (text !== status) dispatch(setUserStatus(text))
    }

    return (
        <>
            <div>
                <Paragraph
                    editable={isProfileId && {
                        icon: <EditOutlined/>,
                        onChange: (text) => handleStatusUpdate(text)
                    }}
                >{currentStatus}
                </Paragraph>
            </div>
        </>
    )
}

export default ProfileStatus

type PropsType = {
    status: string | null
    isProfileId: boolean
}