import useAuthRedirect from '../../hooks/useAuthRedirect'
import React, { memo, useEffect, useRef, useState } from 'react'
import MessageForm from '../../components/Dialogs/MessageForm/MessageForm'
import { List } from 'antd'
import styles from './Dialogs.module.scss'
import DialogItem from '../../components/Dialogs/DialogItem/DialogItem'
import { v4 as createId } from 'uuid'
import { MessageType } from '../../types/dialogs-types'

const DialogsPage = memo(() => {
    const chatBlockRef = useRef<HTMLDivElement>(null)
    const chatListBlock = chatBlockRef.current?.firstChild as HTMLDivElement
    const chatBlock = chatBlockRef.current
    const [ws, setWs] = useState<WebSocket>()
    const [isSocketConnected, setIsSocketConnected] = useState(0)
    const [messages, setMessages] = useState<MessageType[]>([])
    const [chatListHeight, setChatListHeight] = useState(0)

    useAuthRedirect()

    useEffect(() => {
        let wsChannel: WebSocket
        let timeOut: number

        const onConnectionOpen = () => {
            console.log('connection established')
            setIsSocketConnected(1)
        }

        const onConnectionClose = () => {
            console.log('connection closed')
            timeOut = window.setTimeout(createChannel, 3000)

            if (ws !== undefined) {
                setIsSocketConnected(0)
                wsChannel.removeEventListener('open', onConnectionOpen)
                wsChannel.removeEventListener('close', onConnectionClose)
                wsChannel.removeEventListener('message', onMessageReceived)
            }

            setWs(undefined)
        }

        const createChannel = () => {
            wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            wsChannel.addEventListener('open', onConnectionOpen)
            wsChannel.addEventListener('close', onConnectionClose)
            wsChannel.addEventListener('message', onMessageReceived)

            setWs(wsChannel)
        }

        createChannel()

        return () => {
            console.log('unmounted')
            window.clearTimeout(timeOut)
            wsChannel.close()
            wsChannel.removeEventListener('open', onConnectionOpen)
            wsChannel.removeEventListener('close', onConnectionClose)
            wsChannel.removeEventListener('message', onMessageReceived)
        }
    }, [])

    useEffect(() => {
        scrollToBottomOnMessage()
    }, [messages])

    const onMessageReceived = (e: MessageEvent) => {
        const newMessages = JSON.parse(e.data)

        setMessages((prevState) => {
            if (newMessages.length !== prevState.length) {
                return [...prevState, ...newMessages]
            } else {
                return prevState
            }
        })
    }

    const scrollToBottomOnMessage = () => {
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
    }

    const handleAddMessage = (message: string) => {
        if (ws) {
            ws.send(message)
        }
    }

    return <div className={'h-100 p-5 d-flex flex-column'}>
        <div
            className={`${styles.chatBlock} mb-4 flex-grow-1`}
            ref={chatBlockRef}
        >
            <List
                className={'p-3'}
                loading={ws?.readyState === WebSocket.CLOSED}
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
        <MessageForm isSocketConnected={isSocketConnected} handleAddMessage={handleAddMessage}/>
    </div>
})

export default DialogsPage