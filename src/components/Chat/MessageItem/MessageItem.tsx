import React, { FC, memo } from 'react'
import { Avatar, List, Space } from 'antd'
import userPhoto from '../../../assets/images/user.svg'
import { MessageType } from '../../../types/chat-types'
import { useAppSelector } from '../../../redux/hooks/hooks'
import { selectAuthUserId } from '../../../redux/selectors/auth-selectors'
import styles from './MessageItem.module.scss'

const MessageItem: FC<Omit<MessageType, 'id'>> = memo(({ message, photo, userName, userId }) => {
    const authUserId = useAppSelector(selectAuthUserId)
    const isAuthUserId = (userId === authUserId) ? true : ``

    return (
        <List.Item
            className={`${isAuthUserId && 'justify-content-end pe-3'}`}
        >
            <Space
                className={`ant-space-align-start ${isAuthUserId && 'flex-row-reverse'}`}
            >
                <Avatar src={photo ?? userPhoto}/>
                <div className={`mx-2 ${styles.messageBlock} ${isAuthUserId && styles.rev}`}>
                    <p className={`fw-bold fs-6 ${isAuthUserId && 'text-end'}`}>{userName}</p>
                    <p>{message}</p>
                </div>
            </Space>
        </List.Item>
    )
})

export default MessageItem