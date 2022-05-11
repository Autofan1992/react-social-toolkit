import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PhotosType, PostType, ProfileType } from '../../types/types'
import { profileAPI } from '../../api/profile-api'
import { ResultCodesEnum } from '../../api/api'

const initialState = {
    posts: [] as Array<PostType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    isFetching: false as boolean,
    error: null as string | null,
}

export const fetchUserProfile = createAsyncThunk<ProfileType, number>(
    'profile/fetchUserProfile',
    async (userId) => {
        return await profileAPI.getProfile(userId)
    })

export const fetchUserStatus = createAsyncThunk<string, number>(
    'profile/fetchUserStatus',
    async (userId) => {
        return await profileAPI.getStatus(userId)
    })

export const setUserStatus = createAsyncThunk<string, string, { rejectValue: string }>(
    'profile/setUserStatus',
    async (status, { rejectWithValue }) => {
        const { data, resultCode, messages } = await profileAPI.setStatus(status)

        if (resultCode === ResultCodesEnum.Success) return data
        return rejectWithValue(messages[0])
    })

export const setUserAvatar = createAsyncThunk<PhotosType, File, { rejectValue: string }>(
    'profile/setUserAvatar',
    async (avatar: File, { rejectWithValue }) => {
        const { resultCode, messages, data } = await profileAPI.setAvatar(avatar)

        if (resultCode === ResultCodesEnum.Success) return data.photos
        return rejectWithValue(messages[0])
    })

export const saveUserProfile = createAsyncThunk<void, ProfileType, { rejectValue: string }>(
    'profile/saveUserProfile',
    async (values: ProfileType, { rejectWithValue }) => {
        const { resultCode, messages } = await profileAPI.saveProfile(values)

        if (resultCode === ResultCodesEnum.Success) return
        return rejectWithValue(messages[0])
    })

const profileSlice = createSlice({
    name: 'profileReducer',
    initialState,
    reducers: {
        addPost: (state, { payload }: PayloadAction<string>) => {
            state.posts.unshift({
                id: state.posts.length,
                post: payload,
                likesCount: 0
            })
        },
        deletePost: (state, { payload }: PayloadAction<number>) => {
            state.posts = state.posts.filter(post => post.id !== payload)
        },
        likePost: (state, { payload }: PayloadAction<number>) => {
            state.posts.map(post => post.id === payload ? ++post.likesCount : post)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.profile = payload
            })
            .addCase(fetchUserStatus.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(fetchUserStatus.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.status = payload
            })
            .addCase(setUserStatus.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(setUserStatus.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.status = payload
            })
            .addCase(setUserStatus.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) state.error = payload
            })
            .addCase(setUserAvatar.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(setUserAvatar.fulfilled, (state, { payload }) => {
                state.isFetching = false
                if (state.profile) state.profile.photos = payload
            })
            .addCase(setUserAvatar.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) state.error = payload
            })
            .addCase(saveUserProfile.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(saveUserProfile.fulfilled, (state) => {
                state.isFetching = false
                state.error = null
            })
            .addCase(saveUserProfile.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) state.error = payload
            })
    }
})

export const { likePost, addPost, deletePost } = profileSlice.actions

export default profileSlice.reducer