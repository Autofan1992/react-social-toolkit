import React, { FC, memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getAuthState } from '../../redux/selectors/selectors'
import LoginForm from './LoginForm'
import { login } from '../../redux/reducers/auth-reducer'
import { LoginType } from '../../types/types'
import { useNavigate } from 'react-router-dom'

const LoginContainer: FC = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { captchaUrl, error, isAuth, isFetching } = useAppSelector(getAuthState)

    useEffect(() => {
        if (isAuth) navigate('/', { replace: true })
    }, [isAuth, navigate])

    const handleLogin = (values: LoginType) => dispatch(login(values))

    return <LoginForm captchaUrl={captchaUrl} serverError={error} isFetching={isFetching} handleLogin={handleLogin}/>
})

export default LoginContainer