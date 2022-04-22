import { FormikProps } from 'formik'
import { FC } from 'react'
import { MessageType } from '../../../types/types'
import { Form, SubmitButton } from 'formik-antd'
import { createTextAreaField } from '../../../helpers/CustomField'

const MessageForm: FC<FormikProps<MessageType>> = ({ errors, touched, isSubmitting }) => {
    return <Form
        style={{
            marginTop: '30px'
        }}
    >

        {createTextAreaField<InputNames>('Type your message', 'message', {
            status: (touched.message && errors.message) && 'error'
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
}

export default MessageForm

type InputNames = keyof MessageType