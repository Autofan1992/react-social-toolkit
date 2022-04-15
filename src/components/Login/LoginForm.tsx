import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { login } from '../../redux/reducers/auth-reducer'
import { LoginType } from '../../types/types'
import { getAuthState } from '../../redux/selectors/selectors'

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const { captchaUrl } = useAppSelector(getAuthState)

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: ''
            }}
            onSubmit={(
                values: LoginType,
                { setSubmitting }: FormikHelpers<LoginType>
            ) => {
                dispatch(login(values))
                setSubmitting(false)
            }}
        >
            <Form>
                <Field
                    name="email"
                    placeholder="john@acme.com"
                    type="email"
                />
                <Field
                    name="password"
                    placeholader="enter your password"
                    type="password"
                />
                <Field
                    name="rememberMe"
                    type="checkbox"
                />
                <Field
                    name="captcha"
                    placeholder="enter symbols from image"
                    type="text"
                />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

export default LoginForm