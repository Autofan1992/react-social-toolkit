import { Formik } from 'formik'
import { FC } from 'react'
import { Form, SubmitButton } from 'formik-antd'
import { createTextField } from '../../../helpers/CustomField'
import * as Yup from 'yup'
import { ChatConnectionStatus, MessageType } from '../../../types/chat-types'

const MessageSchema = Yup.object().shape({
    message: Yup.string()
        .min(2, 'Too Short!')
        .max(1000, 'Too Long!')
        .required('Required'),
})

const MessageForm: FC<PropsType> = ({ handleSendMessage, connectionStatus }) => {
    return <Formik
        initialValues={{
            message: ''
        } as MessageType}
        validationSchema={MessageSchema}
        onSubmit={({ message }, { setSubmitting, resetForm }) => {
            handleSendMessage(message)
            resetForm()
            setSubmitting(false)
        }}>
        {({ errors, touched, isSubmitting }) => (
            <Form
                className={'flex-nowrap'}
                layout="inline"
            >
                {createTextField<InputNames>(undefined, 'message', 'text', {
                    status: (touched.message && errors.message) && 'error',
                    placeholder: errors.message ?? 'Type your message',
                    className: 'flex-1'
                })}
                <SubmitButton size="large" type="primary" htmlType="submit" disabled={isSubmitting || connectionStatus === ChatConnectionStatus.Disconnected}>
                    Add message
                </SubmitButton>
            </Form>
        )}
    </Formik>
}

export default MessageForm

type InputNames = keyof MessageType

type PropsType = {
    connectionStatus: ChatConnectionStatus
    handleSendMessage: (message: string) => void
}

