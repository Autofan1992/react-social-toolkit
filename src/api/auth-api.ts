import { AuthInfoDataType, LoginType } from '../types/types'
import { APIResponseType, CaptchaResultCode, instance, ResultCodesEnum } from './api'

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
    loginRequest: (values: LoginType) => instance
        .post<APIResponseType<AuthDataType, ResultCodesEnum | CaptchaResultCode>>(`auth/login`, values)
        .then(res => res.data),
    getCaptchaURL: () => instance
        .get<CaptchaResponseType>(`security/get-captcha-url`)
        .then(res => res.data),
    logoutRequest: () => instance
        .delete<APIResponseType>(`auth/login`)
        .then(res => res.data)
}