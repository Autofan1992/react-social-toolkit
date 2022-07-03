import useAuthRedirect from '../../hooks/useAuthRedirect'
import React, { memo, useEffect, useRef, useState } from 'react'
import MessageForm from '../../components/Chat/MessageForm/MessageForm'
import { List } from 'antd'
import styles from './ChatPage.module.scss'
import MessageItem from '../../components/Chat/MessageItem/MessageItem'
import { ChatConnectionStatus } from '../../types/chat-types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { selectChatConnectionStatus, selectMessages } from '../../redux/selectors/chat-selectors'
import { connectChat, disconnectChat, sendMessage } from '../../redux/slices/chat-slice'

const ChatPage = memo(() => {
    const dispatch = useAppDispatch()
    const connectionStatus = useAppSelector(selectChatConnectionStatus)
    const messages = useAppSelector(selectMessages)
    const [autoScrollBottomOnMessage, setAutoScrollBottomOnMessage] = useState(false)
    const messagesEnd = useRef<HTMLDivElement>(null)

    useAuthRedirect()

    useEffect(() => {
        dispatch(connectChat())

        return () => {
            dispatch(disconnectChat())
        }
    }, [dispatch])

    useEffect(() => {
        if (autoScrollBottomOnMessage && messagesEnd.current) messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages, autoScrollBottomOnMessage])

    const handleSendMessage = (message: string) => {
        dispatch(sendMessage(message))
    }

    const handleChatScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop = e.currentTarget.scrollTop
        const chatHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight

        if (!autoScrollBottomOnMessage && scrollTop === chatHeight) {
            !autoScrollBottomOnMessage && setAutoScrollBottomOnMessage(true)
        } else {
            autoScrollBottomOnMessage && setAutoScrollBottomOnMessage(false)
        }
    }

    return <div className={'h-100 p-5 d-flex flex-column'}>
        {connectionStatus === ChatConnectionStatus.Error && <h2>Some error occurred. Please reload the page</h2>}
        <>
            <div
                className={`${styles.chatBlock} mb-4 flex-grow-1`}
                onScroll={handleChatScroll}
            >
                <List
                    loading={connectionStatus === ChatConnectionStatus.Disconnected}
                    dataSource={messages}
                    renderItem={item => <>
                        <MessageItem
                            userId={item.userId}
                            message={item.message}
                            photo={item.photo}
                            userName={item.userName}
                            key={item.id}
                        />
                        <div ref={messagesEnd}></div>
                    </>}
                />
            </div>
            <MessageForm connectionStatus={connectionStatus} handleSendMessage={handleSendMessage}/>
        </>
    </div>
})

export default ChatPage