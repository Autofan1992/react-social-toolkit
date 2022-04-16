import React, { useEffect } from 'react'
import { useAppSelector } from './hooks'
import { getAuthState } from '../selectors/selectors'
import { useNavigate } from 'react-router-dom'

const useAuthRedirect = () => {
    const { isAuth } = useAppSelector(getAuthState).profile
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [isAuth])
}

export default useAuthRedirect