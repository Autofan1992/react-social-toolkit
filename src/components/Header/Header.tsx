import { Button, Col, Layout, Row, Skeleton, Space, Typography } from 'antd'
import logo from '../../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'
import avatar from '../../assets/images/user.svg'
import { PhotosType } from '../../types/types'
import { FC } from 'react'
import styles from './Header.module.scss'

const { Header: HeaderANTD } = Layout
const { Paragraph } = Typography

const Header: FC<PropsType> = (
    { handleLogout, isFetching, photos, isAuth, id, login }) => {

    return <HeaderANTD className={styles.header}>
        <Row className={styles.headerRow} justify="space-between" align="middle">
            <Col md={2} className="logo">
                <img src={logo} alt="logo"/>
            </Col>
            <Col md={2}>
                <Skeleton avatar active paragraph={false} loading={isFetching}/>
                {!isFetching && (isAuth
                    ? <Space>
                        <NavLink to={`/profile`}>
                            <img src={photos?.small ?? avatar} alt="avatar" width="50px"/>
                        </NavLink>
                        <div className="text-center">
                            <Paragraph className={styles.loginTxt}>{login}</Paragraph>
                            <Button size="small" onClick={handleLogout}>Logout</Button>
                        </div>
                    </Space>
                    : <div className="text-center">
                        <NavLink to="/login">Login</NavLink>
                    </div>)
                }
            </Col>
        </Row>
    </HeaderANTD>
}

export default Header

type PropsType = {
    isFetching: boolean
    id: number | null
    login: string | null
    isAuth: boolean
    photos: PhotosType | undefined
    handleLogout: () => void
}