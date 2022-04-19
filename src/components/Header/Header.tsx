import { Button, Col, Layout, Row, Skeleton, Space, Typography } from 'antd'
import logo from '../../images/logo.svg'
import { NavLink } from 'react-router-dom'
import avatar from '../../images/user.svg'
import { PhotosType } from '../../types/types'
import { FC } from 'react'

const { Header: HeaderANTD } = Layout
const { Paragraph } = Typography

const Header: FC<PropsType> = (
    { handleLogout, isFetching, photos, isAuth, id, login }) => {

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
                <Skeleton avatar active paragraph={false} loading={isFetching}/>
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
                            <Button size="small" onClick={handleLogout}>Logout</Button>
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

type PropsType = {
    isFetching: boolean
    id: number | null
    login: string | null
    isAuth: boolean
    photos: PhotosType | null
    handleLogout: () => void
}