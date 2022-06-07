import React, { FC } from 'react'
import { Avatar, List, Space, Typography } from 'antd'
import userPhoto from '../../../assets/images/user.svg'
import { MessageType } from '../../../types/dialogs-types'
import { useAppSelector } from '../../../redux/hooks/hooks'
import { selectAuthUserId } from '../../../redux/selectors/auth-selectors'

const DialogItem: FC<Omit<MessageType, 'id'>> = ({ message, photo, userName, userId }) => {
    const authUserId = useAppSelector(selectAuthUserId)

    return (
        <List.Item
            className={userId === authUserId ? 'justify-content-end' : undefined}
        >
            <Space
                className={userId === authUserId ? 'flex-row-reverse' : undefined}
            >
                <Avatar src={photo ?? userPhoto}/>
                    <Typography.Text mark>{userName}</Typography.Text>
                    <span className={'ms-3'}>{message}</span>
            </Space>
        </List.Item>
    )
}

export default DialogItem