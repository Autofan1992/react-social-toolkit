import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsersType, UserType } from '../../types/types'
import { userAPI } from '../../api/users-api'
import { ResultCodesEnum } from '../../api/api'

const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followInProgress: [] as Array<number>,
    error: null as string | null
}

export const toggleUserFollow = createAsyncThunk<number, { id: number, followed: boolean }, { rejectValue: string }>(
    'users/toggleUserFollow',
    async ({ id, followed }, { rejectWithValue }) => {
        const followMethod = followed ? userAPI.unfollowUserRequest : userAPI.followUserRequest
        const { resultCode, messages } = await followMethod(id)

        if (resultCode === ResultCodesEnum.Success) return id
        return rejectWithValue(messages[0])
    })

export const fetchUsers = createAsyncThunk<{ users: Array<UserType>, totalCount: number, currentPage: number }, fetchUsersType>(
    'users/fetchUsers',
    async (
        {
            currentPage,
            pageSize,
            term,
            friend
        }) => {
        const { items: users, totalCount } = await userAPI.getUsers(currentPage, pageSize, term, friend)

        return { users, totalCount, currentPage }
    })

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleUserFollow.pending, (state, { meta }) => {
                state.isFetching = true
                state.followInProgress.push(meta.arg.id)
            })
            .addCase(toggleUserFollow.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.followInProgress = state.followInProgress.filter(id => id !== payload)
                state.users.map(user => user.id === payload ? user.followed = !user.followed : user)
            })
            .addCase(toggleUserFollow.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) state.error = payload
            })
            .addCase(fetchUsers.pending, (state) => {
                state.isFetching = true
            })
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.users = payload.users
                state.totalUsersCount = payload.totalCount
                state.currentPage = payload.currentPage
            })
    }
})

export default usersSlice.reducer