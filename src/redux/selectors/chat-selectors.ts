import { RootStateType } from '../store'

export const selectMessages = (state: RootStateType) => state.chatPage.messages
export const selectChatScrollTop = (state: RootStateType) => state.chatPage.chatScrollTop
export const selectChatConnectionStatus = (state: RootStateType) => state.chatPage.chatConnectionStatus