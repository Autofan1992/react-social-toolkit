import { useEffect } from 'react'
import { useAppSelector } from '../redux/hooks/hooks'
import { useNavigate } from 'react-router-dom'
import { selectIsAuth } from '../redux/selectors/auth-selectors'
import { selectAppInitialized } from '../redux/selectors/app-selectors'

const useAuthRedirect = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const initialized = useAppSelector(selectAppInitialized)
    const navigate = useNavigate()

    useEffect(() => {
        (initialized && !isAuth) && navigate('/login')
    }, [initialized, isAuth, navigate])
}

export default useAuthRedirect