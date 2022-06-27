import useAuthRedirect from '../../hooks/useAuthRedirect'
import React, { memo, useEffect, useRef, useState } from 'react'
import MessageForm from '../../components/Chat/MessageForm/MessageForm'
import { List } from 'antd'
import styles from './ChatPage.module.scss'
import MessageItem from '../../components/Chat/MessageItem/MessageItem'
import { ChatConnectionStatus } from '../../types/chat-types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { selectChatConnectionStatus, selectChatScrollTop, selectMessages } from '../../redux/selectors/chat-selectors'
import { connectChat, disconnectChat, sendMessage, setChatScrollTop } from '../../redux/slices/chat-slice'

const ChatPage = memo(() => {
    const dispatch = useAppDispatch()
    const connectionStatus = useAppSelector(selectChatConnectionStatus)
    const messages = useAppSelector(selectMessages)
    const chatLastScrollTop = useAppSelector(selectChatScrollTop)
    const chatBlockRef = useRef<HTMLDivElement>(null)
    const [chatListHeight, setChatListHeight] = useState(0)
    const scrollCheckRef = useRef(0)

    useAuthRedirect()

    useEffect(() => {
        let interval: NodeJS.Timer
        dispatch(connectChat())

        interval = setInterval(() => {
            scrollCheckRef.current = chatBlockRef.current?.scrollTop as number
        }, 1000)

        if (chatBlockRef.current) {
            const chatScrollTop = chatBlockRef.current.scrollTop
            const chatScrollHeight = chatBlockRef.current.scrollHeight
            const chatClientHeight = chatBlockRef.current.clientHeight

            if (chatScrollTop !== 0 && chatScrollTop === chatListHeight) {
                chatBlockRef.current.scrollTo({
                    top: chatScrollHeight - chatClientHeight,
                    behavior: 'smooth'
                })
            } else if (chatLastScrollTop) {
                chatBlockRef.current.scrollTop = chatLastScrollTop
            }

            setChatListHeight(chatScrollHeight - chatClientHeight)
        }
        return () => {
            clearInterval(interval)
            dispatch(setChatScrollTop(scrollCheckRef.current))
            dispatch(disconnectChat())
        }
    }, [messages, dispatch])

    const handleSendMessage = (message: string) => {
        dispatch(sendMessage(message))
    }

    return <div className={'h-100 p-5 d-flex flex-column'}>
        {connectionStatus === ChatConnectionStatus.Error && <h2>Some error occurred. Please reload the page</h2>}
        <>
            <div
                className={`${styles.chatBlock} mb-4 flex-grow-1`}
                ref={chatBlockRef}>
                <List
                    loading={connectionStatus === ChatConnectionStatus.Disconnected}
                    dataSource={messages}
                    renderItem={item => (
                        <MessageItem
                            userId={item.userId}
                            message={item.message}
                            photo={item.photo}
                            userName={item.userName}
                            key={item.id}
                        />
                    )}
                />
            </div>
            <MessageForm connectionStatus={connectionStatus} handleSendMessage={handleSendMessage}/>
        </>
    </div>
})

export default ChatPage