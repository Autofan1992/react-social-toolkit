import { RootStateType } from '../store'

export const selectMessages = (state: RootStateType) => state.chatPage.messages
export const selectChatLastScrollTop = (state: RootStateType) => state.chatPage.lastScrollTop
export const selectChatConnectionStatus = (state: RootStateType) => state.chatPage.chatConnectionStatus