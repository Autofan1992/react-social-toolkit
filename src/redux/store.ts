import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import appReducer from './slices/app-slice'
import authReducer from './slices/auth-slice'
import chatReducer from './slices/chat-slice'
import usersReducers from './slices/users-slice'
import profileReducer from './slices/profile-slice'

const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        chatPage: chatReducer,
        usersPage: usersReducers,
        profilePage: profileReducer
    }
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export type AppThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AnyAction>


export default store