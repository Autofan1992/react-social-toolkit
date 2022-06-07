import useAuthRedirect from '../../hooks/useAuthRedirect'
import { useAppDispatch } from '../../redux/hooks/hooks'
import React, { memo, useEffect, useRef, useState } from 'react'
import MessageForm from '../../components/Dialogs/MessageForm/MessageForm'
import { List } from 'antd'
import styles from './Dialogs.module.scss'
import DialogItem from '../../components/Dialogs/DialogItem/DialogItem'
import { v4 as createId } from 'uuid'
import { MessageType } from '../../types/dialogs-types'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const DialogsPage = memo(() => {
    const dispatch = useAppDispatch()
    const chatBlockRef = useRef<HTMLDivElement>(null)
    const chatListBlock = chatBlockRef.current?.firstChild as HTMLDivElement
    const chatBlock = chatBlockRef.current

    const [messages, setMessages] = useState<MessageType[]>([])
    const [chatListHeight, setChatListHeight] = useState(0)

    useAuthRedirect()

    useEffect(() => {
        ws.addEventListener('message', e => {
            const newMessages = JSON.parse(e.data)

            setMessages((prevState) => [...prevState, ...newMessages])
        })
        return () => ws.removeEventListener('message', () => {
            setMessages([])
        })
    }, [])

    useEffect(() => {
        if (chatBlock) {
            const chatBlockScrollBottom = chatBlock.scrollTop + chatBlock.clientHeight

            if (chatBlock.scrollTop === 0) {
                chatBlock.scrollTop = chatListBlock.clientHeight
            }

            if (chatBlockScrollBottom === chatListHeight) {
                chatBlock.scrollTo({
                    behavior: 'smooth',
                    top: chatListHeight
                })
            }

            setChatListHeight(chatListBlock.clientHeight)
        }
    }, [messages])

    const handleAddMessage = (message: string) => {
        ws.send(message)
    }

    return <div className={'h-100 d-flex flex-column'}>
        <div
            className={`${styles.chatBlock} mb-4 flex-grow-1`}
            ref={chatBlockRef}
        >
            <List
                className={'p-3'}
                dataSource={messages}
                renderItem={item => (
                    <DialogItem
                        userId={item.userId}
                        message={item.message}
                        photo={item.photo}
                        userName={item.userName}
                        key={createId()}
                    />
                )}
            />
        </div>
        <MessageForm handleAddMessage={handleAddMessage}/>
    </div>
})

export default DialogsPage