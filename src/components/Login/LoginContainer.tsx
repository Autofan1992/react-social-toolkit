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
    const { captchaUrl, error } = useAppSelector(getAuthState)
    useAuthRedirect()

    const FormikLoginForm = withFormik<OwnProps, LoginType>({
        mapPropsToValues: props => {
            return {
                email: '',
                password: '',
                rememberMe: false,
                captcha: ''
            }
        },
        validate: (values: LoginType, { error }) => {
            let errors: FormikErrors<LoginType> = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!values.email) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        handleSubmit: (values, { props, setSubmitting }) => {
            dispatch(login(values))
            setSubmitting(false)
        },
    })(LoginForm)

    return (
        <FormikLoginForm captchaUrl={captchaUrl} error={error}/>
    )
}

export default LoginContainer

type OwnProps = {
    captchaUrl: string | null
    error: string | null
}