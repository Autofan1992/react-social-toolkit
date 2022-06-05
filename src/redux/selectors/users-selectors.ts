import { RootStateType } from '../store'

export const getUsersIsFetching = (state: RootStateType) => state.usersPage.isFetching
export const getUsersError = (state: RootStateType) => state.usersPage.error
export const getUsers = (state: RootStateType) => state.usersPage.users
export const getUsersSearchParams = (state: RootStateType) => state.usersPage.usersSearchParams
export const getFollowInProgress = (state: RootStateType) => state.usersPage.followInProgress
export const getTotalUsersCount = (state: RootStateType) => state.usersPage.totalUsersCount