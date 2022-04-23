import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthProfileType, LoginType } from '../../types/types'
import { CaptchaResultCode, ResultCodesEnum } from '../../api/api'
import { authAPI } from '../../api/auth-api'

const initialState = {
    profile: {
        email: null,
        login: null,
        isAuth: false,
        photos: null,
        id: null,
    } as AuthProfileType,
    error: null as string | null,
    captchaUrl: null as string | null,
    isFetching: false
}

export const fetchAuthUserData = createAsyncThunk(
    'auth/getAuthUserData',
    async (_, { rejectWithValue }) => {
        try {
            const { resultCode, messages, data } = await authAPI.getAuthInfo()

            if (resultCode === ResultCodesEnum.Success) {
                const { id, email, login } = data
                const { photos } = await authAPI.getAuthProfile(id)

                return { id, email, login, photos, isAuth: true }
            }

            return rejectWithValue(messages[0])
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const login = createAsyncThunk(
    'auth/login',
    async (values: LoginType, { dispatch, rejectWithValue }) => {
        try {
            const { resultCode, messages } = await authAPI.loginRequest(values)

            if (resultCode === ResultCodesEnum.Success) {
                await dispatch(fetchAuthUserData())
            } else if (resultCode === CaptchaResultCode.CaptchaIsRequired) {
                const { url } = await authAPI.getCaptchaURL()

                await dispatch(setCaptcha(url))
                return rejectWithValue(messages[0])
            }
            return rejectWithValue(messages[0])
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const { data, messages, resultCode } = await authAPI.logoutRequest()
            if (resultCode === ResultCodesEnum.Success) {
                return {
                    isAuth: false,
                    id: null,
                    email: null,
                    login: null,
                    userPhoto: null
                }
            }
            return rejectWithValue(messages[0])
        } catch (e) {
            return rejectWithValue(e)
        }
    })

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setCaptcha: (state, { payload }: PayloadAction<string>) => {
            state.error = null
            state.captchaUrl = payload
        }
    }, extraReducers: {
        [fetchAuthUserData.pending.type]: (state) => {
            state.isFetching = true
        },
        [fetchAuthUserData.fulfilled.type]: (state, { payload }: PayloadAction<AuthProfileType>) => {
            state.isFetching = false
            state.error = null
            state.profile = payload
        },
        [fetchAuthUserData.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        },
        [login.pending.type]: (state) => {
            state.isFetching = true
        },
        [login.fulfilled.type]: (state) => {
            state.isFetching = false
            state.error = null
        },
        [login.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        },
        [logout.pending.type]: (state) => {
            state.isFetching = true
        },
        [logout.fulfilled.type]: (state, { payload }: PayloadAction<AuthProfileType>) => {
            state.isFetching = false
            state.error = null
            state.profile = payload
        },
        [logout.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
            state.error = payload
        }
    }
})

export const { setCaptcha } = authSlice.actions
export default authSlice.reducer