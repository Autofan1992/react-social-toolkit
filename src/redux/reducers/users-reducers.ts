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
            const { resultCode } = await followMethod(userId)

            if (resultCode === ResultCodesEnum.Success) return userId
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ pageNum, pageSize }: { pageNum: number, pageSize: number }, { rejectWithValue }) => {
        try {
            const data = await userAPI.getUsers(pageNum, pageSize)
            const { items: users, totalCount } = data

            return { users, totalCount, pageNum }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

const usersSlice = createSlice({
    name: 'usersReducer',
    initialState,
    reducers: {
        setCurrentPage: (state, { payload }: PayloadAction<{ pageNum: number, pageSize: number }>) => {
            state.currentPage = payload.pageNum
            state.pageSize = payload.pageSize
        }
    },
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
            state.error = payload
        },
        [fetchUsers.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchUsers.fulfilled.type]: (state, { payload }: PayloadAction<{ users: Array<UserType>, totalCount: number, pageNum: number }>) => {
            state.isFetching = false
            state.error = null
            state.users = payload.users
            state.totalUsersCount = payload.totalCount
            state.currentPage = payload.pageNum
        },
        [fetchUsers.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        }
    }
})

export const { setCurrentPage } = usersSlice.actions

export default usersSlice.reducer