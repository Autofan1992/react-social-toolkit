import { Button, Col, Layout, Row, Skeleton, Space, Typography } from 'antd'
import logo from '../../images/logo.svg'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getAuthState } from '../../redux/selectors/selectors'
import { logout } from '../../redux/reducers/auth-reducer'
import avatar from '../../images/user.svg'
import useAuthRedirect from '../../redux/hooks/useAuthRedirect'

const { Header: HeaderANTD } = Layout
const { Paragraph } = Typography

const Header = () => {
    const dispatch = useAppDispatch()
    const { id, login, photos, isAuth } = useAppSelector(getAuthState).profile
    const { isFetching } = useAppSelector(getAuthState)

    useAuthRedirect()

    return <HeaderANTD className="header" style={{
        lineHeight: 1
    }}>
        <Row justify="space-between" align="middle" style={{
            minHeight: '64px'
        }}>
            <Col md={2} className="logo">
                <img src={logo} alt="logo"/>
            </Col>
            <Col md={2}>
                <Skeleton avatar active paragraph={false} loading={isFetching} />
                {!isFetching && (isAuth
                    ? <Space>
                        <NavLink to={`/profile/${id}`}>
                            <img src={photos?.small ?? avatar} alt="avatar" width="50px"/>
                        </NavLink>
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <Paragraph style={{
                                color: '#fff',
                                marginBottom: '.5em'
                            }}>{login}</Paragraph>
                            <Button size="small" onClick={() => dispatch(logout())}>Logout</Button>
                        </div>
                    </Space>
                    : <div style={{
                        textAlign: 'center'
                    }}><NavLink to="/login">Login</NavLink></div>)
                }
            </Col>
        </Row>
    </HeaderANTD>
}

export default Header