import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, MenuProps } from 'antd'

const { Sider: Sidebar } = Layout

const Navbar: FC = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const currentMenuKey = (key: string) => pathname.search(key) >= 0 ? pathname : key

    const onClick: MenuProps['onClick'] = e => navigate(e.key)

    const menuItems = [
        { label: 'Profile', key: currentMenuKey('/profile') },
        { label: 'Messages', key: currentMenuKey('/chat') },
        { label: 'Users', key: currentMenuKey('/users') },
    ]

    return <Sidebar
        className="site-layout-background main-sidebar"
        breakpoint="lg"
        collapsedWidth="0"
    >
        <Menu
            onClick={onClick}
            theme="dark"
            selectedKeys={[pathname]}
            items={menuItems}
        />
    </Sidebar>
}

export default Navbar