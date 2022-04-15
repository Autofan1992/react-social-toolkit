import { ProfileType, UserType } from '../types/types'
import { APIResponseType, instance } from './api'

export const profileAPI = {
    getProfile: (userId: number) => instance
        .get<ProfileType>(`profile/${userId}`)
        .then(res => res.data),
    getStatus: (userId: number) => instance
        .get<string>(`profile/status/${userId}`)
        .then(res => res.data),
    setStatus: (status: string) => instance
        .put<APIResponseType>(`profile/status`, { status })
        .then(res => res.data),
    setAvatar: (avatar: File) => {
        const formData = new FormData()
        formData.append('image', avatar)
        return instance
            .put<APIResponseType<UserType>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
    },
    saveProfile: (profile: ProfileType) => instance
        .put<APIResponseType>(`profile`, profile)
        .then(res => res.data)
}