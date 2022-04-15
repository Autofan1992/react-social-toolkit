import { ProfileType } from '../types/types'
import { APIResponseType, CaptchaResultCode, instance, ResultCodesEnum } from './api'

type AuthInfoDataType = {
    id: number
    email: string
    login: string
}
type AuthDataType = {
    userId: number
}
type CaptchaResponseType = {
    url: string
}

export const authAPI = {
    getAuthInfo: () => instance
        .get<APIResponseType<AuthInfoDataType>>(`auth/me`)
        .then(res => res.data),
    getAuthProfile: (id: number) => instance
        .get<ProfileType>(`profile/${id}`).then(res => res.data),
    loginRequest: (email: string, password: string, rememberMe: boolean, captcha: string) => instance
        .post<APIResponseType<AuthDataType, ResultCodesEnum | CaptchaResultCode>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
        .then(res => res.data),
    getCaptchaURL: () => instance
        .get<CaptchaResponseType>(`security/get-captcha-url`)
        .then(res => res.data),
    logoutRequest: () => instance
        .delete<APIResponseType>(`auth/login`)
        .then(res => res.data)
}