import { FC } from 'react'
import { FormikProps } from 'formik'
import { APIRespondErrorType, LoginType } from '../../types/types'
import { Form, SubmitButton } from 'formik-antd'
import { createTextField } from '../../helpers/CustomField'

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
                        <div style={{
                            textAlign: 'center',
                            marginBottom: '15px'
                        }}>
                            <img src={captchaUrl} alt="captcha"/>
                        </div>
                        {createTextField<InputNames>('Type symbols from image', 'captcha', undefined, {
                            status: (touched.captcha && errors.captcha) && 'error'
                        })}
                    </>
                }

                {serverError &&
                    <div style={{
                        textAlign: 'center',
                        margin: '15px 0'
                    }}>{serverError}</div>
                }

                <SubmitButton
                    size="large"
                    type="primary"
                    disabled={isFetching}
                    style={{
                        width: '100%'
                    }}>Submit
                </SubmitButton>
            </Form>
        </div>
    )
}

export default LoginForm

type InputNames = keyof LoginType

type PropsType = {
    captchaUrl: string | null
    isFetching: boolean
}