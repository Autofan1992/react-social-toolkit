import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

const Navbar: FC = () => {
    return (
        <Sider className="site-layout-background">
            <Menu
                theme="dark"
                defaultSelectedKeys={['1']}
            >
                <Menu.Item key="1" style={{
                    marginTop: 0
                }}>
                    <NavLink className={({ isActive }) => isActive ? 'active' : undefined}
                             to="/">Profile</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink className={({ isActive }) => isActive ? 'active' : undefined}
                             to="/dialogs">Messages</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink className={({ isActive }) => isActive ? 'active' : undefined} to="/news">News</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink className={({ isActive }) => isActive ? 'active' : undefined}
                             to="/music">Music</NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                    <NavLink className={({ isActive }) => isActive ? 'active' : undefined}
                             to="/settings">Settings</NavLink>
                </Menu.Item>
                <Menu.Item key="6">
                    <NavLink className={({ isActive }) => isActive ? 'active' : undefined}
                             to="/users">Users</NavLink>
                </Menu.Item>
                <Menu.Item key="7">
                    <NavLink className={({ isActive }) => isActive ? 'active' : undefined} to="/todolist">Todo
                        List</NavLink>
                </Menu.Item>
                <Menu.Item key="8">
                    <NavLink className={({ isActive }) => isActive ? 'active' : undefined}
                             to="/weather">Weather</NavLink>
                </Menu.Item>
                <Menu.Item key="9">
                    <NavLink className={({ isActive }) => isActive ? 'active' : undefined}
                             to="/budgets">Budgets</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Navbar