import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, MenuProps, Space, Switch } from 'antd'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { setAppTheme } from '../../redux/slices/app-slice'
import styles from './Navbar.module.scss'

const { Sider: Sidebar } = Layout

const Navbar: FC = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

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
        <Space className={styles.themeToggle}>
            <p className="text-white me-3">Dark theme</p>
            <Switch onChange={() => dispatch(setAppTheme())}/>
        </Space>
    </Sidebar>
}

export default Navbar