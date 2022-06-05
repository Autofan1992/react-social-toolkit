import React, { FC, memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import LoginForm from '../../components/Login/LoginForm'
import { login } from '../../redux/reducers/auth-reducer'
import { useNavigate } from 'react-router-dom'
import { LoginType } from '../../types/login-types'
import { getAuthError, getAuthIsFetching, getIsAuth, getLoginCaptchaUrl } from '../../redux/selectors/auth-selectors'

const LoginPage: FC = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const captchaUrl = useAppSelector(getLoginCaptchaUrl)
    const error = useAppSelector(getAuthError)
    const isAuth = useAppSelector(getIsAuth)
    const isFetching = useAppSelector(getAuthIsFetching)

    useEffect(() => {
        if (isAuth) navigate('/', { replace: true })
    }, [isAuth, navigate])

    const handleLogin = (values: LoginType) => dispatch(login(values))

    return <LoginForm captchaUrl={captchaUrl} serverError={error} isFetching={isFetching} handleLogin={handleLogin}/>
})

export default LoginPage