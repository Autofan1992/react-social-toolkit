import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import appReducer from './reducers/app-reducer'
import authReducer from './reducers/auth-reducer'
import dialogsReducer from './reducers/dialogs-reducer'
import usersReducers from './reducers/users-reducers'
import profileReducer from './reducers/profile-reducer'

const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducers,
        profilePage: profileReducer
    }
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export type AppThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AnyAction>


export default store