import { FC } from 'react'
import { FormikProps } from 'formik'
import { APIRespondErrorType, LoginType } from '../../types/types'
import { Form, Input, SubmitButton } from 'formik-antd'

const LoginForm: FC<PropsType & APIRespondErrorType & FormikProps<LoginType>> = (
    {
        captchaUrl,
        serverError,
        errors,
        touched,
        isFetching
    }) => {
    return (
        <div style={{
            maxWidth: '400px',
            display: 'flex',
            alignItems: 'center',
            margin: 'auto',
            height: '100%'
        }}>
            <Form>
                <Input type="email" name="email"/>
                {touched.email && errors.email && <div>{errors.email}</div>}

                <Input type="password" name="password" style={{
                    margin: '15px 0'
                }}/>
                {touched.password && errors.password && <div>{errors.password}</div>}

                {captchaUrl &&
                    <>
                        <img src={captchaUrl} alt="captcha"/>
                        <Input type="text" name="captcha"/>
                        {touched.captcha && errors.captcha && <div>{errors.captcha}</div>}
                    </>
                }

                {serverError &&
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '15px'
                    }}>{serverError}</div>
                }

                <SubmitButton size="large" type="primary" htmlType="submit" disabled={isFetching} style={{
                    width: '100%'
                }}>
                    Submit
                </SubmitButton>
            </Form>
        </div>
    )
}

export default LoginForm

type PropsType = {
    captchaUrl: string | null
    isFetching: boolean
}