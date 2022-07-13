import { RootStateType } from '../store'

export const selectAuthUserId = (state: RootStateType) => state.auth.authInfo.id
export const selectAuthLogin = (state: RootStateType) => state.auth.authInfo.login
export const selectLoginCaptchaUrl = (state: RootStateType) => state.auth.captchaUrl
export const selectAuthIsFetching = (state: RootStateType) => state.auth.isFetching
export const selectIsAuth = (state: RootStateType) => state.auth.isAuth