import React from 'react'
import { Layout } from 'antd'
import logo from '../../images/logo.svg'

const { Header } = Layout

const HeaderContainer = () => {
    return (
        <Header className="header">
            <div className="logo">
                <img src={logo} alt="logo" style={{
                    width: '70px'
                }}/>
            </div>
        </Header>
    )
}

export default HeaderContainer