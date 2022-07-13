import useAuthRedirect from '../../hooks/useAuthRedirect'
import React, { memo, useEffect, useRef, useState } from 'react'
import MessageForm from '../../components/Chat/MessageForm/MessageForm'
import { Col, List, Row } from 'antd'
import styles from './ChatPage.module.scss'
import MessageItem from '../../components/Chat/MessageItem/MessageItem'
import { ChatConnectionStatus } from '../../types/chat-types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { selectChatConnectionStatus, selectMessages } from '../../redux/selectors/chat-selectors'
import { connectChat, disconnectChat, sendMessage } from '../../redux/slices/chat-slice'
import { selectIsDarkTheme } from '../../redux/selectors/app-selectors'

const ChatPage = memo(() => {
    const dispatch = useAppDispatch()
    const connectionStatus = useAppSelector(selectChatConnectionStatus)
    const messages = useAppSelector(selectMessages)
    const [autoScrollBottomOnMessage, setAutoScrollBottomOnMessage] = useState(true)
    const messagesEnd = useRef<HTMLDivElement>(null)
    const isDarkTheme = useAppSelector(selectIsDarkTheme)

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

    return <div className="container h-100">
        <Row justify="center" className="h-100">
            <Col lg={20} xl={16} className="h-100 d-flex flex-column">
                {connectionStatus === ChatConnectionStatus.Error &&
                    <h2>Some error occurred. Please reload the page</h2>}
                <>
                    <div
                        className={`${styles.chatBlock} ${isDarkTheme ? `${styles.chatDark}` : ``} mb-4 flex-grow-1`}
                        onScroll={handleChatScroll}
                    >
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
                                />)
                            }
                        />
                        <div ref={messagesEnd}></div>
                    </div>
                    <MessageForm connectionStatus={connectionStatus} handleSendMessage={handleSendMessage}/>
                </>
            </Col>
        </Row>
    </div>
})

export default ChatPage