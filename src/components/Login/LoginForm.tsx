import React, { FC } from 'react'
import { Formik } from 'formik'
import { Form, SubmitButton } from 'formik-antd'
import { createCheckbox, createTextField } from '../../helpers/CustomField'
import * as Yup from 'yup'
import styles from '../../pages/Login/LoginPage.module.scss'
import { LoginType } from '../../types/login-types'

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
        isFetching
    }) => {

    return <div className={styles.loginFormBlock}>
        <h2 className="mb-5">Please login to proceed</h2>
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
                <Form className="w-100">
                    <div className="mb-3">
                        {createTextField<InputNames>('Type your email', 'email', 'email', {
                            disabled: isFetching,
                            status: (touched.email && errors.email) && 'error',
                            placeholder: errors.email
                        })}
                    </div>

                    <div className="mb-3">
                        {createTextField<InputNames>('Type your password', 'password', 'password', {
                            disabled: isFetching,
                            status: (touched.password && errors.password) && 'error',
                            placeholder: errors.password,
                        })}
                    </div>

                    <label className="d-flex justify-content-center mb-3">
                        <span className="me-2">Remember me</span>
                        {createCheckbox<InputNames>('rememberMe')}
                    </label>

                    {captchaUrl &&
                        <div className="mb-3 text-center">
                            <div className="mb-3">
                                <img src={captchaUrl} alt="captcha"/>
                            </div>
                            {createTextField<InputNames>('Type symbols from image', 'captcha', undefined, {
                                disabled: isFetching,
                                status: (touched.captcha && errors.captcha) && 'error'
                            })}
                        </div>
                    }

                    <SubmitButton
                        size="large"
                        type="primary"
                        loading={isFetching}
                        disabled={isFetching}
                        className="w-100">Submit
                    </SubmitButton>
                </Form>
            )}
        </Formik>
    </div>
}

type InputNames = keyof LoginType

type PropsType = {
    handleLogin: (values: LoginType) => void
    captchaUrl: string | null
    isFetching: boolean
}

export default LoginForm