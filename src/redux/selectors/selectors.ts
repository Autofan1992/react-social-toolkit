import { RootStateType } from '../store'

export const getAppState = (state: RootStateType) => state.app
export const getAuthState = (state: RootStateType) => state.auth