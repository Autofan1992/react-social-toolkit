import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { ChatConnectionStatus, MessageType } from '../../types/chat-types'
import { AppThunkType } from '../store'
import { chatAPI } from '../../api/chat-api'
import { v4 as createId } from 'uuid'

const initialState = {
    messages: [] as MessageType[],
    chatConnectionStatus: ChatConnectionStatus.Disconnected,
    chatScrollTop: 0,
    isFetching: false,
    error: null as string | null
}

let unsubscribeFromMessages: () => void
let unsubscribeFromStatusChange: () => void

let _messagesHandler: ((messages: MessageType[]) => void) | undefined
const messagesHandlerCreator = (dispatch: Dispatch) => {
    if (_messagesHandler === undefined) {
        _messagesHandler = (messages: MessageType[]) => dispatch(setMessages(messages))
    }
    return _messagesHandler
}

let _statusChangeHandler: ((status: ChatConnectionStatus) => void) | undefined
const statusChangeHandlerHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangeHandler === undefined) {
        _statusChangeHandler = (status: ChatConnectionStatus) => dispatch(setConnectionStatus(status))
    }
    return _statusChangeHandler
}

export const connectChat = (): AppThunkType => async dispatch => {
    chatAPI.start()
    unsubscribeFromMessages = chatAPI.subscribe('messages-receive', messagesHandlerCreator(dispatch))
    unsubscribeFromStatusChange = chatAPI.subscribe('status-change', statusChangeHandlerHandlerCreator(dispatch))
}

export const disconnectChat = (): AppThunkType => async () => {
    unsubscribeFromMessages()
    unsubscribeFromStatusChange()
}

export const sendMessage = (message: string): AppThunkType => async () => {
    chatAPI.sendMessage(message)
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatScrollTop: (state, { payload }: PayloadAction<number>) => {
            state.chatScrollTop = payload
        },
        setMessages: (state, { payload }: PayloadAction<MessageType[]>) => {
            if (state.messages.length !== payload.length) {
                const newMessages = payload
                    .map(message => ({ ...message, id: createId() }))
                    .filter((_, idx, arr) => idx >= arr.length - 100)

                state.messages.push(...newMessages)
            }
        },
        setConnectionStatus: (state, { payload }: PayloadAction<ChatConnectionStatus>) => {
            state.chatConnectionStatus = payload
        },
    }
})

export const { setMessages, setConnectionStatus, setChatScrollTop } = chatSlice.actions
export default chatSlice.reducer