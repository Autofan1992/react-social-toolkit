import { RootStateType } from '../store'

export const getAuthUserId = (state: RootStateType) => state.auth.authInfo.id
export const getAuthLogin = (state: RootStateType) => state.auth.authInfo.login
export const getLoginCaptchaUrl = (state: RootStateType) => state.auth.captchaUrl
export const getAuthError = (state: RootStateType) => state.auth.error
export const getAuthIsFetching = (state: RootStateType) => state.auth.isFetching
export const getIsAuth = (state: RootStateType) => state.auth.isAuth