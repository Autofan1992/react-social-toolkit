import { RootStateType } from '../store'

export const selectProfile = (state: RootStateType) => state.profilePage.profile
export const selectPosts = (state: RootStateType) => state.profilePage.posts
export const selectProfileIsFetching = (state: RootStateType) => state.profilePage.isFetching
export const selectProfileStatus = (state: RootStateType) => state.profilePage.status
export const selectProfileError = (state: RootStateType) => state.profilePage.error