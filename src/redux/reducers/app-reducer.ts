import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunkType } from '../store'

const appSlice = createSlice({
    name: 'appReducer',
    initialState: {
        initialized: false as boolean,
        requestSuccess: undefined as boolean | undefined
    },
    reducers: {
        setInitializingSuccess: (state) => {
            state.initialized = true
        },
        setRequestSuccess: (state, action: PayloadAction<boolean | undefined>) => {
            state.requestSuccess = action.payload
        }
    },
})

export const setRequestSuccessToggle = (requestSuccess: boolean): AppThunkType => async dispatch => {
    dispatch(setRequestSuccess(requestSuccess))
    setTimeout(() => {
        dispatch(setRequestSuccess(undefined))
    }, 3000)
}

export const initializeApp = (): AppThunkType => async dispatch => {
    //await appSlice.actions.getAuthUserData()
    dispatch(setInitializingSuccess())
}

export const { setInitializingSuccess, setRequestSuccess } = appSlice.actions

export default appSlice.reducer