import styles from './SettingsPage.module.scss'
import { Col, Row, Space, Switch } from 'antd'
import { setAppTheme } from '../../redux/slices/app-slice'
import React from 'react'
import { useAppDispatch } from '../../redux/hooks/hooks'

export const SettingsPage = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="container">
            <Row justify="center">
                <Col lg={20} xl={16} className="d-flex flex-column">
                    <Space className={styles.themeToggle}>
                        <p className="me-3">Dark theme</p>
                        <Switch onChange={() => dispatch(setAppTheme())}/>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}