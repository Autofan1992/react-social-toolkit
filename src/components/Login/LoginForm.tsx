import React, { FC } from 'react'
import { Field, Form, FormikProps } from 'formik'
import { LoginType } from '../../types/types'

const LoginForm: FC<PropsType & FormikProps<LoginType>> = (
    {
        captchaUrl,
        serverError,
        errors,
        touched,
        isSubmitting
    }) => {
    return (
        <Form>
            <Field type="email" name="email"/>
            {touched.email && errors.email && <div>{errors.email}</div>}

            <Field type="password" name="password"/>
            {touched.password && errors.password && <div>{errors.password}</div>}

            {captchaUrl &&
                <>
                    <img src={captchaUrl} alt="captcha"/>
                    <Field type="text" name="captcha"/>
                    {touched.captcha && errors.captcha && <div>{errors.captcha}</div>}
                </>
            }

            {serverError}

            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </Form>
    )
}

export default LoginForm

type PropsType = {
    captchaUrl: string | null
    serverError: string | null
}