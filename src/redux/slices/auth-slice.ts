import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CaptchaResultCode, ResultCodesEnum } from '../../api/api'
import { authAPI } from '../../api/auth-api'
import { AuthInfoDataType } from '../../types/auth-types'
import { LoginType } from '../../types/login-types'

const initialState = {
    authInfo: {
        id: null,
        email: null,
        login: null
    } as AuthInfoDataType,
    isAuth: false,
    error: null as string | null,
    captchaUrl: null as string | null,
    isFetching: false
}

export const fetchAuthUserData = createAsyncThunk<AuthInfoDataType, undefined, { rejectValue: string }>(
    'auth/getAuthUserData',
    async (_, { rejectWithValue }) => {
        const { resultCode, messages, data } = await authAPI.getAuthInfo()

        if (resultCode === ResultCodesEnum.Success) {
            return data
        }

        return rejectWithValue(messages[0])
    })

export const login = createAsyncThunk<void, LoginType, { rejectValue: string }>(
    'auth/login',
    async (values, { dispatch, rejectWithValue }) => {
        const { resultCode, messages } = await authAPI.loginRequest(values)

        if (resultCode === ResultCodesEnum.Success) {
            await dispatch(fetchAuthUserData())
            return
        } else if (resultCode === CaptchaResultCode.CaptchaIsRequired) {
            const { url } = await authAPI.getCaptchaURL()

            dispatch(setCaptcha(url))
            return rejectWithValue(messages[0])
        }

        return rejectWithValue(messages[0])
    })

export const logout = createAsyncThunk<AuthInfoDataType, undefined, { rejectValue: string }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        const { messages, resultCode } = await authAPI.logoutRequest()

        if (resultCode === ResultCodesEnum.Success) {
            return { id: null, email: null, login: null }
        }
        return rejectWithValue(messages[0])
    })

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCaptcha: (state, { payload }: PayloadAction<string>) => {
            state.error = null
            state.captchaUrl = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthUserData.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(fetchAuthUserData.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.isAuth = true
                state.authInfo = payload
            })
            .addCase(fetchAuthUserData.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) state.error = payload
            })
            .addCase(login.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(login.fulfilled, (state) => {
                state.isFetching = false
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) state.error = payload
            })
            .addCase(logout.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.isFetching = false
                state.isAuth = false
                state.authInfo = payload
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.isFetching = false
                if (payload) state.error = payload
            })
    }
})

export const { setCaptcha } = authSlice.actions
export default authSlice.reducer