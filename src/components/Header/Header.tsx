import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { logout } from '../../redux/reducers/auth-reducer'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import { FC } from 'react'
import styles from './Header.module.scss'
import { Button, Col, Layout, Row, Skeleton, Space, Typography } from 'antd'
import logo from '../../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'
import avatar from '../../assets/images/user.svg'
import { getProfile } from '../../redux/selectors/profile-selectors'
import { getAuthIsFetching, getAuthLogin, getIsAuth } from '../../redux/selectors/auth-selectors'

const { Header: HeaderANTD } = Layout
const { Paragraph } = Typography

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const login = useAppSelector(getAuthLogin)
    const isAuth = useAppSelector(getIsAuth)
    const isFetching = useAppSelector(getAuthIsFetching)
    const profile = useAppSelector(getProfile)
    const handleLogout = () => dispatch(logout())

    useAuthRedirect()

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
                            <img src={profile?.photos?.small ?? avatar} alt="avatar" width="50px"/>
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