import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from '../../api/users-api'
import { ResultCodesEnum } from '../../api/api'
import { UsersSearchFiltersType, UserType } from '../../types/users-types'

const initialState = {
    users: [] as UserType[],
    totalUsersCount: 0,
    usersSearchFilters: {
        pageSize: 5,
        currentPage: 1,
        term: '',
        friend: null,
    } as UsersSearchFiltersType,
    isFetching: false,
    followInProgress: [] as number[],
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

export const fetchUsers = createAsyncThunk<{ users: UserType[], totalCount: number, usersSearchParams: UsersSearchFiltersType }, UsersSearchFiltersType, { rejectValue: string }>(
    'users/fetchUsers',
    async (
        {
            currentPage,
            pageSize,
            term,
            friend
        }, { rejectWithValue }) => {
        const { items: users, totalCount, error } = await userAPI.getUsers(currentPage, pageSize, term, friend)

        if (error) return rejectWithValue(error)
        return { users, totalCount, usersSearchParams: { currentPage, pageSize, term, friend } }
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
                state.usersSearchFilters = payload.usersSearchParams
            })
            .addCase(fetchUsers.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) state.error = payload
            })
    }
})

export default usersSlice.reducer