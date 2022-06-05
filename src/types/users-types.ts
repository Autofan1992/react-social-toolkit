import { PhotosType } from './profile-types'

export type UsersSearchRequestType = {
    currentPage: number,
    pageSize: number
    term: string
    friend: boolean | undefined
}

export type UserType = {
    id: number
    name: string
    status: string
    followed: boolean
    photos: PhotosType
}