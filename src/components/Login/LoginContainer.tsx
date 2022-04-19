import React, { FC, memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getAuthState } from '../../redux/selectors/selectors'
import LoginForm from './LoginForm'
import { login } from '../../redux/reducers/auth-reducer'
import { APIRespondErrorType, LoginType } from '../../types/types'
import { FormikErrors, withFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const LoginContainer: FC = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { captchaUrl, error: serverError, profile, isFetching } = useAppSelector(getAuthState)
    const { isAuth } = profile

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth, navigate])

    const FormikLoginForm = withFormik<APIRespondErrorType & OwnPropsType, LoginType>({
        mapPropsToValues: () => {
            return {
                email: '',
                password: '',
                rememberMe: false,
                captcha: ''
            }
        },
        validate: (values: LoginType) => {
            const errors: FormikErrors<LoginType> = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!values.email) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        handleSubmit: (values) => {
            dispatch(login(values))
        },
    })(LoginForm)

    return (
        <FormikLoginForm captchaUrl={captchaUrl} serverError={serverError} isFetching={isFetching}/>
    )
})

export default LoginContainer

type OwnPropsType = {
    captchaUrl: string | null
    isFetching: boolean
}