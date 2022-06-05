import { RootStateType } from '../store'

export const getProfile = (state: RootStateType) => state.profilePage.profile
export const getPosts = (state: RootStateType) => state.profilePage.posts
export const getIsFetching = (state: RootStateType) => state.profilePage.isFetching
export const getStatus = (state: RootStateType) => state.profilePage.status
export const getError = (state: RootStateType) => state.profilePage.error