import { createSlice } from '@reduxjs/toolkit'
import { AppThunkType } from '../store'
import { fetchAuthUserData } from './auth-reducer'

const initialState = {
    initialized: false as boolean,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setInitializingSuccess: (state) => {
            state.initialized = true
        },
    },
})

export const initializeApp = (): AppThunkType => async dispatch => {
    await dispatch(fetchAuthUserData())
    dispatch(setInitializingSuccess())
}

export const { setInitializingSuccess } = appSlice.actions
export default appSlice.reducer