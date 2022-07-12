import { createSlice } from '@reduxjs/toolkit'
import { AppThunkType } from '../store'
import { fetchAuthUserData } from './auth-slice'

const initialState = {
    initialized: false,
    darkTheme: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppTheme: (state) => {
            state.darkTheme = !state.darkTheme
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

export const { setInitializingSuccess, setAppTheme } = appSlice.actions
export default appSlice.reducer