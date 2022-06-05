import { RootStateType } from '../store'

export const getDialogs = (state: RootStateType) => state.dialogsPage.dialogs
export const getMessages = (state: RootStateType) => state.dialogsPage.messages