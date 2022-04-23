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

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (userId: number, { rejectWithValue }) => {
        try {
            return await profileAPI.getProfile(userId)
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const fetchUserStatus = createAsyncThunk(
    'profile/fetchUserStatus',
    async (userId: number, { rejectWithValue }) => {
        try {
            return await profileAPI.getStatus(userId)
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const setUserStatus = createAsyncThunk(
    'profile/setUserStatus',
    async (status: string, { rejectWithValue }) => {
        try {
            const { resultCode, messages, data } = await profileAPI.setStatus(status)
            if (resultCode === ResultCodesEnum.Success) {
                return data
            }
            return rejectWithValue(messages[0])
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const setUserAvatar = createAsyncThunk(
    'profile/setUserAvatar',
    async (avatar: File, { rejectWithValue }) => {
        try {
            const { resultCode, messages, data } = await profileAPI.setAvatar(avatar)
            if (resultCode === ResultCodesEnum.Success) {
                return data.photos
            }
            return rejectWithValue(messages[0])
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const saveUserProfile = createAsyncThunk(
    'profile/saveUserProfile',
    async (values: ProfileType, { rejectWithValue }) => {
        try {
            const { resultCode, data, messages } = await profileAPI.saveProfile(values)
            if (resultCode === ResultCodesEnum.Success) {
                return data
            }
            return rejectWithValue(messages[0])
        } catch (e) {
            return rejectWithValue(e)
        }
    })

const profileSlice = createSlice({
    name: 'profileReducer',
    initialState,
    reducers: {
        addPost: (state, { payload }: PayloadAction<PostType>) => {
            state.posts.unshift({
                id: state.posts.length,
                post: payload.post,
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
    extraReducers: {
        [fetchUserProfile.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchUserProfile.fulfilled.type]: (state, { payload }: PayloadAction<ProfileType>) => {
            state.isFetching = false
            state.error = null
            state.profile = payload
        },
        [fetchUserProfile.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        },
        [fetchUserStatus.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchUserStatus.fulfilled.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = null
            state.status = payload
        },
        [fetchUserStatus.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        },
        [setUserStatus.pending.type]: (state) => {
            state.isFetching = true
        },
        [setUserStatus.fulfilled.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = null
            state.status = payload
        },
        [setUserStatus.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        },
        [setUserAvatar.pending.type]: (state) => {
            state.isFetching = true
        },
        [setUserAvatar.fulfilled.type]: (state, { payload }: PayloadAction<PhotosType>) => {
            state.isFetching = false
            state.error = null
            if (state.profile) state.profile.photos = payload
        },
        [setUserAvatar.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        },
        [saveUserProfile.pending.type]: (state) => {
            state.isFetching = true
        },
        [saveUserProfile.fulfilled.type]: (state, { payload }: PayloadAction<PhotosType>) => {
            state.isFetching = false
            state.error = null
            if (state.profile) state.profile.photos = payload
        },
        [saveUserProfile.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        },
    }
})

export const { likePost, addPost, deletePost } = profileSlice.actions

export default profileSlice.reducer