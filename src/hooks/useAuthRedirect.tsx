import { useEffect } from 'react'
import { useAppSelector } from '../redux/hooks/hooks'
import { useNavigate } from 'react-router-dom'
import { getIsAuth } from '../redux/selectors/auth-selectors'
import { getAppInitialized } from '../redux/selectors/app-selectors'

const useAuthRedirect = () => {
    const isAuth = useAppSelector(getIsAuth)
    const initialized = useAppSelector(getAppInitialized)
    const navigate = useNavigate()

    useEffect(() => {
        (initialized && !isAuth) && navigate('/login')
    }, [initialized, isAuth, navigate])
}

export default useAuthRedirect