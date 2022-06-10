import React, { FC } from 'react'
import { Avatar, List, Space } from 'antd'
import userPhoto from '../../../assets/images/user.svg'
import { MessageType } from '../../../types/dialogs-types'
import { useAppSelector } from '../../../redux/hooks/hooks'
import { selectAuthUserId } from '../../../redux/selectors/auth-selectors'
import styles from './DialogItem.module.scss'

const DialogItem: FC<Omit<MessageType, 'id'>> = ({ message, photo, userName, userId }) => {
    const authUserId = useAppSelector(selectAuthUserId)
    const isAuthUserId = (userId === authUserId) ? true : ''

    return (
        <List.Item
            className={`${isAuthUserId && 'justify-content-end'}`}
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
}

export default DialogItem