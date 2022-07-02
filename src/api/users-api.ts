import { mainAxiosInstance, ResultCodesEnum } from './api'
import { UserType } from '../types/users-types'

type UsersResponseType<I = [], RC = ResultCodesEnum> = {
    resultCode: RC
    items: I
    messages: string[]
    totalCount: number
    error: string
}

export const userAPI = {
    getUsers: (pageNum: number, pageSize: number, term: string, friend: boolean | null) => mainAxiosInstance
        .get<UsersResponseType<Array<UserType>>>(`users?page=${pageNum}&count=${pageSize}${term ? `&term=${term}` : ''}&friend=${friend}`)
        .then(res => res.data),
    unfollowUserRequest: (userId: number) => mainAxiosInstance
        .delete<UsersResponseType>(`follow/${userId}`)
        .then(res => res.data),
    followUserRequest: (userId: number) => mainAxiosInstance
        .post<UsersResponseType>(`follow/${userId}`)
        .then(res => res.data)
}