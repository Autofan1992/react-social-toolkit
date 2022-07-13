import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunkType } from '../store'
import { fetchAuthUserData } from './auth-slice'

const initialState = {
    initialized: false,
    darkTheme: false,
    appWindowWidth: 0
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppTheme: (state) => {
            state.darkTheme = !state.darkTheme
        },
        setAppWindowWidth: (state, { payload }: PayloadAction<number>) => {
            state.appWindowWidth = payload
        },
        setInitializingSuccess: (state) => {
            state.initialized = true
        },
    },
})

export const initializeApp = (): AppThunkType => async dispatch => {
    await dispatch(fetchAuthUserData())
    dispatch(setInitializingSuccess())
}

export const { setInitializingSuccess, setAppTheme, setAppWindowWidth } = appSlice.actions
export default appSlice.reducer