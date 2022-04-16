import React from 'react'
import { Button, Col, Layout, Row, Typography } from 'antd'
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

    useAuthRedirect()

    return (
        <HeaderANTD className="header">
            <Row justify="space-between">
                <Col className="logo">
                    <img src={logo} alt="logo"/>
                </Col>
                <Col>
                    {isAuth
                        ? <div>
                            <NavLink to={`/profile/${id}`}>
                                <div>
                                    <img src={photos?.small ?? avatar} alt="avatar"/>
                                </div>
                            </NavLink>
                            <div className="text-center">
                                <Paragraph>{login}</Paragraph>
                                <Button onClick={() => dispatch(logout())}>Logout</Button>
                            </div>
                        </div>
                        : <NavLink to="/login">Login</NavLink>
                    }
                </Col>
            </Row>
        </HeaderANTD>
    )
}

export default Header