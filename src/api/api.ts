import axios from 'axios'

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: string[]
}

export type AxiosResponseErrorType = {
    response: {
        data: {
            error: string
        }
    }
}

export const mainAxiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum CaptchaResultCode {
    CaptchaIsRequired = 10
}

