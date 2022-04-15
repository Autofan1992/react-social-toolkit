import { UserType } from '../types/types'
import { instance, ResultCodesEnum } from './api'

type UsersResponseType<I = [], RC = ResultCodesEnum> = {
    resultCode: RC
    items: I
    messages: Array<string>
    totalCount: number
    error: string
}

export const userAPI = {
    getUsers: (currentPage: number, pageSize: number) => instance
        .get<UsersResponseType<Array<UserType>>>(`users?page=${currentPage}&count=${pageSize}`)
        .then(res => res.data),
    searchUsers: (name: string, friend = false) => instance
        .get<UsersResponseType<Array<UserType>>>(`users?term=${name}${friend ? `&friend=true` : ``}`)
        .then(res => res.data),
    unfollowUserRequest: (userId: number) => instance
        .delete<UsersResponseType>(`follow/${userId}`)
        .then(res => res.data),
    followUserRequest: (userId: number) => instance
        .post<UsersResponseType>(`follow/${userId}`)
        .then(res => res.data)
}