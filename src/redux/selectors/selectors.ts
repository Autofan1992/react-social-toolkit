import { RootStateType } from '../store'

export const getAppState = (state: RootStateType) => state.app
export const getAuthState = (state: RootStateType) => state.auth
export const getDialogsState = (state: RootStateType) => state.dialogs
export const getUsersState = (state: RootStateType) => state.users