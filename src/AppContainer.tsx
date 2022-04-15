import React, { FC, useEffect } from 'react'
import './App.css'
import App from './App'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { getAppState } from './redux/selectors/selectors'
import { initializeApp } from './redux/reducers/app-reducer'

const AppContainer: FC = () => {
    const dispatch = useAppDispatch()
    const { initialized } = useAppSelector(getAppState)

    const handleAllUnhandledErrors = (reason: any) => {
        alert(reason.reason)
    }

    useEffect(() => {
        dispatch(initializeApp())
        window.addEventListener('unhandledrejection', handleAllUnhandledErrors)
        return function cleanup() {
            window.removeEventListener('unhandledrejection', handleAllUnhandledErrors)
        }
    })

    return (
        <App/>
    )
}

export default AppContainer
