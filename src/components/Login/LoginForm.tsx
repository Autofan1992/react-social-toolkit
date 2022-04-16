import React, { FC } from 'react'
import { Field, Form, FormikProps } from 'formik'
import { LoginType } from '../../types/types'

const LoginForm: FC<PropsType & FormikProps<LoginType>> = ({ captchaUrl, errors, error, touched, isSubmitting }) => {
    return (
        <Form>
            <h1>{error}</h1>
            <Field type="email" name="email"/>
            {touched.email && errors.email && <div>{errors.email}</div>}

            <Field type="password" name="password"/>
            {touched.password && errors.password && <div>{errors.password}</div>}

            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </Form>
    )
}

export default LoginForm

type PropsType = {
    captchaUrl: string | null
    error: string | null
}