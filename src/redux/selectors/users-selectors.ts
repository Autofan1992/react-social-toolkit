import { RootStateType } from '../store'

export const selectUsersIsFetching = (state: RootStateType) => state.usersPage.isFetching
export const selectUsersError = (state: RootStateType) => state.usersPage.error
export const selectUsers = (state: RootStateType) => state.usersPage.users
export const selectUsersSearchFilters = (state: RootStateType) => state.usersPage.usersSearchFilters
export const selectFollowInProgress = (state: RootStateType) => state.usersPage.followInProgress
export const selectTotalUsersCount = (state: RootStateType) => state.usersPage.totalUsersCount