import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { logout } from '../../redux/slices/auth-slice'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import { FC } from 'react'
import styles from './Header.module.scss'
import { Button, Col, Layout, Row, Skeleton, Space, Typography } from 'antd'
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/user.svg'
import { selectProfile } from '../../redux/selectors/profile-selectors'
import { selectAuthIsFetching, selectAuthLogin, selectIsAuth } from '../../redux/selectors/auth-selectors'

const { Header: HeaderANTD } = Layout
const { Paragraph } = Typography

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const login = useAppSelector(selectAuthLogin)
    const isAuth = useAppSelector(selectIsAuth)
    const isFetching = useAppSelector(selectAuthIsFetching)
    const profile = useAppSelector(selectProfile)
    const handleLogout = () => dispatch(logout())

    useAuthRedirect()

    return <HeaderANTD className={styles.header}>
        <div className="container">
            <Row className={styles.headerRow} justify="space-between" align="middle">
                <Col md={2} className="logo">
                    <img src={logo} alt="logo"/>
                </Col>
                <Col md={2}>
                    <Skeleton avatar active paragraph={false} loading={isFetching}/>
                    {!isFetching && (isAuth
                        ? <Space>
                            <Link to={`/profile`}>
                                <img src={profile?.photos?.small ?? avatar} alt="avatar" width="50px"/>
                            </Link>
                            <div className="text-center">
                                <Paragraph className={styles.loginTxt}>{login}</Paragraph>
                                <Button size="small" onClick={handleLogout}>Logout</Button>
                            </div>
                        </Space>
                        : <div className="text-center">
                            <Link to="/login">Login</Link>
                        </div>)
                    }
                </Col>
            </Row>
        </div>
    </HeaderANTD>
}

export default Header