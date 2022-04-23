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
    id: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export type AuthProfileType = {
    email:  string | null,
    login: string | null,
    isAuth: boolean,
    photos: PhotosType | null,
    id: number | null,
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export type TodoType = {
    id: number
    text: string
    complete: boolean
}

export type BudgetType = {
    id: string
    name: string
    max: number
}

export type ExpenseType = {
    id: string
    budgetId: string
    amount: number
    description: string
}

export type CurrentBudgetType = {
    id: string
    name: string
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
    term: string
    friend: boolean | undefined
}

export type fetchUsersType = {
    currentPage?: number,
    pageSize?: number
    term?: string
    friend?: boolean | undefined
}

export type APIRespondErrorType = {
    serverError: string | null
}