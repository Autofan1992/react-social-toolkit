import { PhotosType } from './profile-types'

export type UsersSearchParamsType = {
    currentPage: number,
    pageSize: number
    term: string
    friend: boolean | null
}

export type UserType = {
    id: number
    name: string
    status: string
    followed: boolean
    photos: PhotosType
}