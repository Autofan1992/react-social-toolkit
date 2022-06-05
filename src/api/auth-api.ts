import { APIResponseType, CaptchaResultCode, mainAxiosInstance, ResultCodesEnum } from './api'
import { AuthInfoDataType } from '../types/auth-types'
import { LoginType } from '../types/login-types'

type AuthDataType = {
    userId: number
}
type CaptchaResponseType = {
    url: string
}

export const authAPI = {
    getAuthInfo: () => mainAxiosInstance
        .get<APIResponseType<AuthInfoDataType>>(`auth/me`)
        .then(res => res.data),
    loginRequest: (values: LoginType) => mainAxiosInstance
        .post<APIResponseType<AuthDataType, ResultCodesEnum | CaptchaResultCode>>(`auth/login`, values)
        .then(res => res.data),
    getCaptchaURL: () => mainAxiosInstance
        .get<CaptchaResponseType>(`security/get-captcha-url`)
        .then(res => res.data),
    logoutRequest: () => mainAxiosInstance
        .delete<APIResponseType>(`auth/login`)
        .then(res => res.data)
}