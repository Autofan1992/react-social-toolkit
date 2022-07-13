import { RootStateType } from '../store'

export const selectAppInitialized = (state: RootStateType) => state.app.initialized
export const selectIsDarkTheme = (state: RootStateType) => state.app.darkTheme
export const selectWindowWidth = (state: RootStateType) => state.app.appWindowWidth