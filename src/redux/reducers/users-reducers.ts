import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../types/types'
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

export const toggleUserFollow = createAsyncThunk(
    'users/toggleUserFollow',
    async ({ userId, followed }: { userId: number, followed: boolean }, { rejectWithValue }) => {
        const followMethod = followed ? userAPI.unfollowUserRequest : userAPI.followUserRequest

        try {
            const { resultCode, messages } = await followMethod(userId)

            if (resultCode === ResultCodesEnum.Success) {
                return userId
            } else {
                return rejectWithValue(messages[0])
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (
        {
            currentPage,
            pageSize,
            term,
            friend
        }: { currentPage: number, pageSize: number, term: string, friend: boolean | undefined }, { rejectWithValue }) => {
        try {
            const { items: users, totalCount } = await userAPI.getUsers(currentPage, pageSize, term, friend)

            return { users, totalCount, currentPage }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

const usersSlice = createSlice({
    name: 'usersReducer',
    initialState,
    reducers: {},
    extraReducers: {
        [toggleUserFollow.pending.type]: (state, { meta }: { meta: { arg: { userId: number } } }) => {
            state.followInProgress.push(meta.arg.userId)
        },
        [toggleUserFollow.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
            state.error = null
            state.followInProgress = state.followInProgress.filter(id => id !== payload)
            state.users.map(user => user.id === payload ? user.followed = !user.followed : user)
        },
        [toggleUserFollow.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.followInProgress = []
            state.error = payload
        },
        [fetchUsers.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchUsers.fulfilled.type]: (state, { payload }: PayloadAction<{ users: Array<UserType>, totalCount: number, currentPage: number }>) => {
            state.isFetching = false
            state.error = null
            state.users = payload.users
            state.totalUsersCount = payload.totalCount
            state.currentPage = payload.currentPage
        },
        [fetchUsers.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        }
    }
})

export default usersSlice.reducer