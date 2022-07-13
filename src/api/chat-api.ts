import { ChatConnectionStatus, MessageType } from '../types/chat-types'

const subscribers: SubscribersTypes = {
    'messages-receive': [],
    'status-change': []
}

let ws: WebSocket | undefined

const notifySubscribersOnStatusChange = (status: ChatConnectionStatus) => {
    subscribers['status-change'].forEach(sub => sub(status))
}

const onConnectionOpen = () => {
    notifySubscribersOnStatusChange(ChatConnectionStatus.Connected)
}

const removeAllListeners = () => {
    ws?.removeEventListener('open', onConnectionOpen)
    ws?.removeEventListener('close', onConnectionClose)
    ws?.removeEventListener('message', onMessageReceive)
    ws?.removeEventListener('error', onError)
}

const onConnectionClose = () => {
    setTimeout(createChannel, 3000)
    notifySubscribersOnStatusChange(ChatConnectionStatus.Disconnected)
}

const onError = () => {
    console.warn('some error occurred. Try to refresh the page')
    notifySubscribersOnStatusChange(ChatConnectionStatus.Error)
}

const createChannel = () => {
    removeAllListeners()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersOnStatusChange(ChatConnectionStatus.Pending)
    ws.addEventListener('open', onConnectionOpen)
    ws.addEventListener('close', onConnectionClose)
    ws.addEventListener('message', onMessageReceive)
    ws.addEventListener('error', onError)
}

const onMessageReceive = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-receive'].forEach(sub => sub(newMessages))
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-receive'] = []
        subscribers['status-change'] = []
        removeAllListeners()
        ws?.close()
    },
    subscribe(eventName: SubscribersTypesNames, callback: MessagesSubscriberType | StatusSubscriberType) {
        if (eventName === 'status-change') {
            subscribers[eventName].push(callback as StatusSubscriberType)
        } else {
            subscribers[eventName].push(callback as MessagesSubscriberType)
        }
        return () => {
            removeAllListeners()
            if (eventName === 'status-change') {
                subscribers[eventName] = subscribers[eventName].filter((sub) => sub !== callback)
            } else {
                subscribers[eventName] = subscribers[eventName].filter((sub) => sub !== callback)
            }
        }
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type SubscribersTypes = {
    'messages-receive': MessagesSubscriberType[]
    'status-change': StatusSubscriberType[]
}

export type SubscribersTypesNames = keyof SubscribersTypes

export type MessagesSubscriberType = (messages: MessageType[]) => void
export type StatusSubscriberType = (status: ChatConnectionStatus) => void