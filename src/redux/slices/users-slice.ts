import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userAPI } from '../../api/users-api'
import { ResultCodesEnum } from '../../api/api'
import { UsersSearchParamsType, UserType } from '../../types/users-types'
import { RootStateType } from '../store'

const initialState = {
    users: [] as UserType[],
    totalUsersCount: 0,
    usersSearchParams: {
        pageSize: 5,
        currentPage: 1,
        term: '',
        friend: null,
    } as UsersSearchParamsType,
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

export const fetchUsers = createAsyncThunk<{ users: UserType[], totalCount: number }, undefined, { rejectValue: string, state: RootStateType }>(
    'users/fetchUsers',
    async (_, { rejectWithValue, getState }) => {
        const { usersPage: { usersSearchParams: { currentPage, pageSize, term, friend } } } = getState()
        const { items: users, totalCount, error } = await userAPI.getUsers(currentPage, pageSize, term, friend)

        if (error) return rejectWithValue(error)
        return { users, totalCount }
    })

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersSearchParams: (state, { payload }: PayloadAction<UsersSearchParamsType>) => {
            state.usersSearchParams = {
                ...state.usersSearchParams,
                ...payload
            }
        }
    },
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
            })
            .addCase(fetchUsers.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) state.error = payload
            })
    }
})

export const { setUsersSearchParams } = usersSlice.actions

export default usersSlice.reducer