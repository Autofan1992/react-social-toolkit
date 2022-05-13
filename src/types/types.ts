export type FriendsType = {
    name: string
}

export type PostType = {
    id: number
    post: string
    likesCount: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type UserType = {
    id: number
    name: string
    status: string
    followed: boolean
    photos: PhotosType
}

export type MessageType = {
    id: number
    message: string
}

export type DialogType = {
    id: string
    name: string
}

export type ProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export type AuthInfoDataType = {
    id: number | null
    email: string | null
    login: string | null
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export type WeatherType = {
    description: string
    icon: string
}

export type WeatherDataType = {
    name: string
    country: string
    weather: Array<WeatherType>
    sys: {
        sunrise: number
        sunset: number
    },
    main: {
        temp: number
        feels_like: number
    }
    wind: {
        speed: number
    }
}

export type SearchRequestType = {
    currentPage: number,
    pageSize: number
    term: string
    friend: boolean | undefined
}