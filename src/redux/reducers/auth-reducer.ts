import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginType, PhotosType, ProfileType } from '../../types/types'
import { CaptchaResultCode, ResultCodesEnum } from '../../api/api'
import { authAPI } from '../../api/auth-api'

const authSlice = createSlice({
    name: 'authReducer',
    initialState: {
        userId: null as number | null,
        email: null as string | null,
        login: null as string | null,
        userPhoto: null as PhotosType | null,
        isAuth: false as boolean,
        authError: null as string | null,
        captchaUrl: null as string | null,
        isFetching: false
    },
    reducers: {
        setAuthUserData: (state, { payload }: PayloadAction<{
            isAuth: boolean,
            userId: number | null,
            email: string | null,
            login: string | null,
            userPhoto: PhotosType | null
        }>) => {
            return {
                ...state,
                ...payload
            }
        },
        setIsFetching: (state, { payload }: PayloadAction<boolean>) => {
            state.isFetching = payload
        },
        setCaptcha: (state, { payload }: PayloadAction<string>) => {
            state.captchaUrl = payload
        }
    }
})

export const getAuthUserData = createAsyncThunk(
    'auth/getAuthUserData',
    async (_, { dispatch }) => {
        const userData = await authAPI.getAuthInfo()

        if (userData.resultCode === ResultCodesEnum.Success) {
            const { id, email, login } = userData.data
            const authData = await authAPI.getAuthProfile(id)

            dispatch(setAuthUserData({
                isAuth: true,
                userId: id,
                email,
                login,
                userPhoto: authData.photos
            }))
        }
    })

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password, rememberMe, captcha }: LoginType, { dispatch }) => {
        debugger
        try {
            dispatch(setIsFetching(true))
            const loginData = await authAPI.loginRequest(email, password, rememberMe, captcha)

            if (loginData.resultCode === ResultCodesEnum.Success) {
                // logged in, sending profile request
                await dispatch(getAuthUserData())
            } else if (loginData.resultCode > ResultCodesEnum.Success && loginData.resultCode < CaptchaResultCode.CaptchaIsRequired) {
                // error in form fields
                //dispatch(stopSubmit('loginForm', { _error: 'Проверьте логин и/или пароль' }))
            }
            if (loginData.resultCode === CaptchaResultCode.CaptchaIsRequired) {
                // many wrong requests, sending captcha request
                //dispatch(stopSubmit('loginForm', { _error: 'Проверьте логин и/или пароль, а также введите символы изображенные на картинке в поле ниже' }))
                const captchaData = await authAPI.getCaptchaURL()
                dispatch(setCaptcha(captchaData.url))
            }
        } catch (e) {
            console.log(e)
            window.alert('Something went wrong')
        } finally {
            dispatch(setIsFetching(false))
        }
    })

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        const data = await authAPI.logoutRequest()
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData({
                isAuth: false,
                userId: null,
                email: null,
                login: null,
                userPhoto: null
            }))
        }
    })

export const { setAuthUserData, setIsFetching, setCaptcha } = authSlice.actions
export default authSlice.reducer