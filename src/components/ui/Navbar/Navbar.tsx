import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, MenuProps } from 'antd'
import styles from './Navbar.module.scss'

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
        { label: 'Settings', key: currentMenuKey('/settings') },
    ]

    return <Sidebar
        className={`${styles.sidebar} site-layout-background main-sidebar`}
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