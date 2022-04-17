import { FC, useEffect } from 'react'
import './App.css'
import App from './App'
import { useAppDispatch } from './redux/hooks/hooks'
import { initializeApp } from './redux/reducers/app-reducer'

const AppContainer: FC = () => {
    const handleAllUnhandledErrors = (reason: any) => alert(reason.reason)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())

        window.addEventListener('unhandledrejection', handleAllUnhandledErrors)
        return function cleanup() {
            window.removeEventListener('unhandledrejection', handleAllUnhandledErrors)
        }
    }, [])

    return <App/>
}

export default AppContainer
