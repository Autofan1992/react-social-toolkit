import axios from 'axios'

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: string[]
}

export const mainAxiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'cb233b84-2199-4231-8a72-d5a32fccbd92'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum CaptchaResultCode {
    CaptchaIsRequired = 10
}

export const weatherAxiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

export enum WeatherResultCodes {
    Success = 200
}

