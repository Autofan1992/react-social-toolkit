import React, { FC, memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import LoginForm from '../../components/Login/LoginForm'
import { login } from '../../redux/reducers/auth-reducer'
import { useNavigate } from 'react-router-dom'
import { LoginType } from '../../types/login-types'
import { selectAuthError, selectAuthIsFetching, selectIsAuth, selectLoginCaptchaUrl } from '../../redux/selectors/auth-selectors'

const LoginPage: FC = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const captchaUrl = useAppSelector(selectLoginCaptchaUrl)
    const error = useAppSelector(selectAuthError)
    const isAuth = useAppSelector(selectIsAuth)
    const isFetching = useAppSelector(selectAuthIsFetching)

    useEffect(() => {
        if (isAuth) navigate('/', { replace: true })
    }, [isAuth, navigate])

    const handleLogin = (values: LoginType) => dispatch(login(values))

    return <LoginForm captchaUrl={captchaUrl} serverError={error} isFetching={isFetching} handleLogin={handleLogin}/>
})

export default LoginPage