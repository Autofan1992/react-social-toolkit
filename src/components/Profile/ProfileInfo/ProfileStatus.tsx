import { FC, useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const { Paragraph} = Typography

const ProfileStatus: FC<PropsType> = ({ status, updateUserStatus, isProfileId }) => {
    const [currentStatus, setStatus] = useState(status)

    useEffect(() => {
        setStatus(status)
    }, [status])

    const handleStatusUpdate = (text: string) => {
        if (text !== status) updateUserStatus(text)
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
    updateUserStatus: (status: string) => void
    isProfileId: boolean
}