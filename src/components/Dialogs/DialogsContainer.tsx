import useAuthRedirect from '../hooks/useAuthRedirect'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getDialogsState } from '../../redux/selectors/selectors'
import { addMessage } from '../../redux/reducers/dialogs-reducer'
import React, { memo } from 'react'
import { FormikErrors, withFormik } from 'formik'
import { MessageType } from '../../types/types'
import MessageForm from './Message/MessageForm'
import { Col, Layout, List, Row, Typography } from 'antd'

const { Content } = Layout

const DialogsContainer = memo(() => {
    const dispatch = useAppDispatch()
    const { dialogs, messages } = useAppSelector(getDialogsState)

    useAuthRedirect()

    const FormikMessageForm = withFormik<{}, Omit<MessageType, 'id'>>({
        mapPropsToValues: () => {
            return {
                message: ''
            }
        },
        validate: (values: Omit<MessageType, 'id'>) => {
            const errors: FormikErrors<Omit<MessageType, 'id'>> = {}
            if (!values.message) {
                errors.message = 'Required'
            }
            return errors
        },
        handleSubmit: ({ message }, { setSubmitting }) => {
            dispatch(addMessage(message))
            setSubmitting(false)
        },
    })(MessageForm)

    return <Content style={{ padding: '50px 0' }}>
        <Row gutter={24}>
            <Col md={6}>
                <List
                    header="Dialogs"
                    bordered
                    dataSource={dialogs}
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text mark>Message:</Typography.Text> {item.name}
                        </List.Item>
                    )}/>
            </Col>
            <Col md={10}>
                <>
                    <List
                        bordered
                        dataSource={messages}
                        renderItem={item => (
                            <List.Item>
                                <Typography.Text mark>Message:</Typography.Text> {item.message}
                            </List.Item>
                        )}/>
                    <FormikMessageForm/>
                </>
            </Col>
        </Row>
    </Content>
})

export default DialogsContainer