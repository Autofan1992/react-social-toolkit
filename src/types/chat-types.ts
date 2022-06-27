export type MessageAPIType = {
    message: string
    photo: string | null
    userId: number
    userName: string
}

export type MessageType = MessageAPIType & {
    id: string
}

export enum ChatConnectionStatus {
    Disconnected,
    Connected,
    Pending,
    Error
}