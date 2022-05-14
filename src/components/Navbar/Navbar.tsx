import React, { FC, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Sider: SideBar } = Layout

const Navbar: FC = () => {
    const { pathname } = useLocation()
    const [collapsed, setCollapsed] = useState(false)

    const handleSidebarCollapse = () => {
        if (window.innerWidth < 992) setCollapsed(!collapsed)
    }

    const trigger = document.querySelector('.ant-layout-sider-zero-width-trigger-left')

    if (trigger) trigger.addEventListener('click', handleSidebarCollapse)

    return <SideBar
        className="site-layout-background main-sidebar"
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed}
    >
        <Menu
            onClick={handleSidebarCollapse}
            theme="dark"
            defaultSelectedKeys={['1']}
            selectedKeys={[pathname]}
        >
            <Menu.Item key="/" className="mt-0">
                <Link
                    to="/">Profile</Link>
            </Menu.Item>
            <Menu.Item key="/dialogs">
                <Link
                    to="/dialogs">Messages</Link>
            </Menu.Item>
            <Menu.Item key="/news">
                <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Item key="/music">
                <Link
                    to="/music">Music</Link>
            </Menu.Item>
            <Menu.Item key="/settings">
                <Link
                    to="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item key="/users">
                <Link
                    to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="/weather">
                <Link
                    to="/weather">Weather</Link>
            </Menu.Item>
        </Menu>
    </SideBar>
}

export default Navbar