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
            const response = await authAPI.getAuthInfo()

            if (response.resultCode === ResultCodesEnum.Success) {
                const { id, email, login } = response.data
                const { photos } = await authAPI.getAuthProfile(id)

                return { id, email, login, photos, isAuth: true }
            }

            return rejectWithValue(response.messages[0])
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const login = createAsyncThunk(
    'auth/login',
    async (values: LoginType, { dispatch, rejectWithValue }) => {
        try {
            const response = await authAPI.loginRequest(values)

            if (response.resultCode === ResultCodesEnum.Success) {
                await dispatch(fetchAuthUserData())
            }
            if (response.resultCode === CaptchaResultCode.CaptchaIsRequired) {
                const { url } = await authAPI.getCaptchaURL()

                await dispatch(setCaptcha(url))
                return rejectWithValue(response.messages[0])
            }
            if (response.resultCode > ResultCodesEnum.Success && response.resultCode < CaptchaResultCode.CaptchaIsRequired) {
                return rejectWithValue(response.messages[0])
            }
        } catch (e) {
            return rejectWithValue(e)
        }
    })

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authAPI.logoutRequest()
            if (response.resultCode === ResultCodesEnum.Success) {
                return {
                    isAuth: false,
                    id: null,
                    email: null,
                    login: null,
                    userPhoto: null
                }
            }
        } catch (e) {
            rejectWithValue(e)
        }
    })

const setError = (state: InitialStateType, { payload }: PayloadAction<string>) => {
    state.isFetching = false
    state.error = payload
}
const setIsFetching = (state: InitialStateType) => {
    state.isFetching = true
}

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setAuthUserData: (state, { payload }: PayloadAction<AuthProfileType>) => {
            state.profile = payload
        },
        setCaptcha: (state, { payload }: PayloadAction<string>) => {
            state.captchaUrl = payload
        }
    }, extraReducers: {
        [fetchAuthUserData.pending.type]: setIsFetching,
        [fetchAuthUserData.fulfilled.type]: (state, { payload }: PayloadAction<AuthProfileType>) => {
            state.profile = payload
            state.isFetching = false
        },
        [fetchAuthUserData.rejected.type]: setError,
        [login.pending.type]: setIsFetching,
        [login.fulfilled.type]: (state, { payload }: PayloadAction<string>) => {
            state.isFetching = false
        },
        [login.rejected.type]: setError,
        [logout.pending.type]: setIsFetching,
        [logout.fulfilled.type]: (state, { payload }: PayloadAction<AuthProfileType>) => {
            state.profile = payload
            state.isFetching = false
        },
        [logout.rejected.type]: setError
    }
})

export const { setCaptcha } = authSlice.actions
export default authSlice.reducer
type InitialStateType = typeof initialState