import { FC, memo, useEffect } from 'react'
import './App.css'
import App from './App'
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks'
import { initializeApp } from './redux/reducers/app-reducer'
import { getAppState } from './redux/selectors/selectors'

const AppContainer: FC = memo(() => {
    const handleAllUnhandledErrors = (reason: any) => alert(reason.reason)
    const dispatch = useAppDispatch()
    const { initialized } = useAppSelector(getAppState)

    useEffect(() => {
        dispatch(initializeApp())

        window.addEventListener('unhandledrejection', handleAllUnhandledErrors)
        return function cleanup() {
            window.removeEventListener('unhandledrejection', handleAllUnhandledErrors)
        }
    }, [dispatch])

    return <App initialized={initialized}/>
})

export default AppContainer
