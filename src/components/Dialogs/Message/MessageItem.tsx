import { MessageType } from '../../../types/types'
import { FC } from 'react'
import { List } from 'antd'

const MessageItem: FC<MessageType> = ({ message }) => {
    return <List.Item>
        {message}
    </List.Item>
}

export default MessageItem