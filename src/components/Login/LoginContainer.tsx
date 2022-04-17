import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getAuthState } from '../../redux/selectors/selectors'
import useAuthRedirect from '../../redux/hooks/useAuthRedirect'
import LoginForm from './LoginForm'
import { login } from '../../redux/reducers/auth-reducer'
import { LoginType } from '../../types/types'
import { FormikErrors, withFormik } from 'formik'

const LoginContainer: FC = () => {
    const dispatch = useAppDispatch()
    const { captchaUrl, error: serverError } = useAppSelector(getAuthState)
    useAuthRedirect()

    const FormikLoginForm = withFormik<OwnPropsType, LoginType>({
        mapPropsToValues: (props)  => {
            return {
                email: '',
                password: '',
                rememberMe: false,
                captcha: ''
            };
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
        handleSubmit: (values, { setSubmitting }) => {
            dispatch(login(values))
            setSubmitting(false)
        },
    })(LoginForm)

    return (
        <FormikLoginForm captchaUrl={captchaUrl} serverError={serverError}/>
    )
}

export default LoginContainer

type OwnPropsType = {
    captchaUrl: string | null
    serverError: string | null
}