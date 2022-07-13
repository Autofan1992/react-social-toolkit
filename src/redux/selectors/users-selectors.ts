import { RootStateType } from '../store'

export const selectUsersIsFetching = (state: RootStateType) => state.usersPage.isFetching
export const selectUsers = (state: RootStateType) => state.usersPage.users
export const selectUsersSearchParams = (state: RootStateType) => state.usersPage.usersSearchParams
export const selectFollowInProgress = (state: RootStateType) => state.usersPage.followInProgress
export const selectTotalUsersCount = (state: RootStateType) => state.usersPage.totalUsersCount