import { AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import appReducer from './reducers/app-reducer'
import authReducer from './reducers/auth-reducer'
import dialogsReducer from './reducers/dialogs-reducer'
import usersReducers from './reducers/users-reducers'
import profileReducer from './reducers/profile-reducer'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    dialogs: dialogsReducer,
    users: usersReducers,
    profile: profileReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = typeof store.dispatch
export type AppThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AnyAction>

export default store