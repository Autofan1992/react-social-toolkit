import { useEffect } from 'react'
import { useAppSelector } from './hooks'
import { getAppState, getAuthState } from '../selectors/selectors'
import { useNavigate } from 'react-router-dom'

const useAuthRedirect = () => {
    const { isAuth } = useAppSelector(getAuthState).profile
    const { initialized } = useAppSelector(getAppState)
    const navigate = useNavigate()

    useEffect(() => {
        initialized && !isAuth ? navigate('/login') : navigate('/')
    }, [initialized, isAuth])
}

export default useAuthRedirect