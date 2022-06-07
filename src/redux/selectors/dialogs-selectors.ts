import { RootStateType } from '../store'

export const selectDialogs = (state: RootStateType) => state.dialogsPage.dialogs
export const selectMessages = (state: RootStateType) => state.dialogsPage.messages