import { FC } from 'react'
import { Formik } from 'formik'
import { LoginType } from '../../types/types'
import { Form, SubmitButton } from 'formik-antd'
import { createTextField } from '../../helpers/CustomField'
import * as Yup from 'yup'
import styles from './Login.module.scss'

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
})

const LoginForm: FC<PropsType> = (
    {
        handleLogin,
        captchaUrl,
        serverError,
        isFetching
    }) => {

    return <div className={styles.loginFormBlock}>
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: ''
            } as LoginType}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleLogin(values)
                setSubmitting(false)
            }}>
            {({ touched, errors }) => (
                <Form>
                    {createTextField<InputNames>('Type your email', 'email', 'email', {
                        status: (touched.email && errors.email) && 'error',
                        placeholder: errors.email
                    })}

                    {createTextField<InputNames>('Type your password', 'password', 'password', {
                        status: (touched.password && errors.password) && 'error',
                        placeholder: errors.password,
                        style: {
                            margin: '15px 0'
                        }
                    })}

                    {captchaUrl &&
                        <>
                            <div className="text-center">
                                <img src={captchaUrl} alt="captcha"/>
                            </div>
                            {createTextField<InputNames>('Type symbols from image', 'captcha', undefined, {
                                status: (touched.captcha && errors.captcha) && 'error'
                            })}
                        </>
                    }

                    {serverError &&
                        <div className="text-center my-3">{serverError}</div>
                    }

                    <SubmitButton
                        size="large"
                        type="primary"
                        disabled={isFetching}
                        className="w-100">Submit
                    </SubmitButton>
                </Form>
            )}
        </Formik>
    </div>
}

export default LoginForm

type InputNames = keyof LoginType

type PropsType = {
    handleLogin: (values: LoginType) => void
    captchaUrl: string | null
    isFetching: boolean
    serverError: string | null
}