import { Formik } from 'formik'
import { FC } from 'react'
import { MessageType } from '../../../types/types'
import { Form, SubmitButton } from 'formik-antd'
import { createTextAreaField } from '../../../helpers/CustomField'
import * as Yup from 'yup'

const MessageSchema = Yup.object().shape({
    message: Yup.string()
        .min(2, 'Too Short!')
        .max(1000, 'Too Long!')
        .required('Required'),
})

const MessageForm: FC<PropsType> = ({ handleAddMessage }) => {
    return <Formik
        initialValues={{
            message: ''
        } as MessageType}
        validationSchema={MessageSchema}
        onSubmit={({ message }, { setSubmitting }) => {
            handleAddMessage(message)
            setSubmitting(false)
        }}>
        {({ errors, touched, isSubmitting }) => (
            <Form>
                {createTextAreaField<InputNames>('Type your message', 'message', {
                    status: (touched.message && errors.message) && 'error',
                    placeholder: errors.message
                })}
                <div style={{
                    textAlign: 'center',
                    marginTop: '30px'
                }}>
                    <SubmitButton size="large" type="primary" htmlType="submit" disabled={isSubmitting}>
                        Add message
                    </SubmitButton>
                </div>
            </Form>
        )}
    </Formik>
}

export default MessageForm

type InputNames = keyof MessageType

type PropsType = {
    handleAddMessage: (message: string) => void
}

