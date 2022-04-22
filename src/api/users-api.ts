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
    getUsers: (pageNum: number, pageSize: number, term: string, friend: boolean | undefined) => instance
        .get<UsersResponseType<Array<UserType>>>(`users?page=${pageNum}&count=${pageSize}${term ? `&term=${term}` : ''}${friend ? `&friend=${friend}` : ''}`)
        .then(res => res.data),
    unfollowUserRequest: (userId: number) => instance
        .delete<UsersResponseType>(`follow/${userId}`)
        .then(res => res.data),
    followUserRequest: (userId: number) => instance
        .post<UsersResponseType>(`follow/${userId}`)
        .then(res => res.data)
}