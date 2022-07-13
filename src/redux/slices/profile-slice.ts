import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { profileAPI } from '../../api/profile-api'
import { AxiosResponseErrorType, ResultCodesEnum } from '../../api/api'
import { PhotosType, PostType, ProfileType } from '../../types/profile-types'
import { showNotification } from '../helpers/showNotification'

const initialState = {
    posts: [] as PostType[],
    profile: null as ProfileType | null,
    status: null as string | null,
    error: null as string | null,
    isFetching: false as boolean,
}

export const fetchUserProfile = createAsyncThunk<ProfileType, number, { rejectValue: string }>(
    'profile/fetchUserProfile',
    async (id, { rejectWithValue }) => {
        try {
            return await profileAPI.getProfile(id)
        } catch (e) {
            return rejectWithValue((e as AxiosResponseErrorType).response.data.error)
        }
    })

export const fetchUserStatus = createAsyncThunk<string, number, { rejectValue: string }>(
    'profile/fetchUserStatus',
    async (id, { rejectWithValue }) => {
        try {
            return await profileAPI.getStatus(id)
        } catch (e) {
            return rejectWithValue((e as AxiosResponseErrorType).response.data.error)
        }
    })

export const setUserStatus = createAsyncThunk<string, string, { rejectValue: string }>(
    'profile/setUserStatus',
    async (status, { rejectWithValue }) => {
        const { resultCode, messages } = await profileAPI.setStatus(status)

        if (resultCode === ResultCodesEnum.Success) return status

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
                state.profile = null
                state.isFetching = true
            })
            .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.profile = payload
            })
            .addCase(fetchUserProfile.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) showNotification({ type: 'error', title: payload })
            })
            .addCase(fetchUserStatus.pending, (state) => {
                state.isFetching = true
            })
            .addCase(fetchUserStatus.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.status = payload
            })
            .addCase(fetchUserStatus.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) showNotification({ type: 'error', title: payload })
            })
            .addCase(setUserStatus.pending, (state) => {
                state.isFetching = true
            })
            .addCase(setUserStatus.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.status = payload
            })
            .addCase(setUserStatus.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) showNotification({ type: 'error', title: payload })
            })
            .addCase(setUserAvatar.pending, (state) => {
                state.isFetching = true
            })
            .addCase(setUserAvatar.fulfilled, (state, { payload }) => {
                state.isFetching = false
                if (state.profile) state.profile.photos = payload
            })
            .addCase(setUserAvatar.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) showNotification({ type: 'error', title: payload })
            })
            .addCase(saveUserProfile.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(saveUserProfile.fulfilled, (state) => {
                state.isFetching = false
            })
            .addCase(saveUserProfile.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) {
                    state.error = payload
                    showNotification({ type: 'error', title: payload })
                }
            })
    }
})

export const { likePost, addPost, deletePost } = profileSlice.actions

export default profileSlice.reducer