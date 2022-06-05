import { APIResponseType, mainAxiosInstance } from './api'
import { ProfileType } from '../types/profile-types'
import { UserType } from '../types/users-types'

export const profileAPI = {
    getProfile: (userId: number) => mainAxiosInstance
        .get<ProfileType>(`profile/${userId}`)
        .then(res => res.data),
    getStatus: (userId: number) => mainAxiosInstance
        .get<string>(`profile/status/${userId}`)
        .then(res => res.data),
    setStatus: (status: string) => mainAxiosInstance
        .put<APIResponseType<string>>(`profile/status`, { status })
        .then(res => res.data),
    setAvatar: (avatar: File) => {
        const formData = new FormData()

        formData.append('image', avatar)

        return mainAxiosInstance
            .put<APIResponseType<UserType>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
    },
    saveProfile: (profile: ProfileType) => mainAxiosInstance
        .put<APIResponseType>(`profile`, profile)
        .then(res => res.data)
}