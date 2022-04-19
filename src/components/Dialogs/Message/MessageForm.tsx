import { FormikProps } from 'formik'
import { FC } from 'react'
import { MessageType } from '../../../types/types'
import { Form, Input, SubmitButton } from 'formik-antd'

const MessageForm: FC<FormikProps<MessageType>> = ({ errors, touched, isSubmitting }) => {
    return <Form
        style={{
            marginTop: '30px'
        }}
    >
        <Input.TextArea name="message" status={(touched.message && errors.message) ? 'error' : ''}/>

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