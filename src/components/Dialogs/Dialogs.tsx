import useAuthRedirect from '../hooks/useAuthRedirect'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getDialogsState } from '../../redux/selectors/selectors'
import React, { memo } from 'react'
import MessageForm from './Message/MessageForm'
import { Col, Layout, List, Row, Typography } from 'antd'
import { addMessage } from '../../redux/reducers/dialogs-reducer'
import styles from './Dialogs.module.scss'

const { Content } = Layout

const Dialogs = memo(() => {
    const dispatch = useAppDispatch()
    const { dialogs, messages } = useAppSelector(getDialogsState)

    useAuthRedirect()

    const handleAddMessage = (message: string) => {
        dispatch(addMessage(message))
    }

    return <Content className={styles.dialogsContent}>
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
                    <MessageForm handleAddMessage={handleAddMessage}/>
                </>
            </Col>
        </Row>
    </Content>
})

export default Dialogs