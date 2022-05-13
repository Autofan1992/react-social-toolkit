import { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks/hooks'
import { getAppState, getAuthState } from '../../redux/selectors/selectors'
import { useNavigate } from 'react-router-dom'

const useAuthRedirect = () => {
    const { isAuth } = useAppSelector(getAuthState)
    const { initialized } = useAppSelector(getAppState)
    const navigate = useNavigate()

    useEffect(() => {
        (initialized && !isAuth) && navigate('/login')
    }, [initialized, isAuth, navigate])
}

export default useAuthRedirect