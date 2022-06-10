import React, { FC, lazy, memo, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Layout } from 'antd'
import Preloader from '../common/Preloader/Preloader'
import Header from '../Header/Header'
import styles from './App.module.scss'
import LoginPage from '../../pages/Login/LoginPage'
import DialogsPage from '../../pages/Dialogs/DialogsPage'
import NotFound from '../../pages/404/NotFound'

const { Content } = Layout

const ProfileContainer = lazy(() => import('../../pages/Profile/ProfilePage'))
const UsersContainer = lazy(() => import('../../pages/Users/UsersPage'))

const App: FC<PropsType> = memo(() => {
    return <div className={styles.wrapper}>
        <Layout className="h-100">
            <Header/>
            <Layout className={styles.appLayout}>
                <Navbar/>
                <Layout className="p-4">
                    <Content>
                        <Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/profile" replace/>}/>
                                <Route path="/profile" element={<ProfileContainer/>}>
                                    <Route path="edit" element={<ProfileContainer/>}/>
                                </Route>
                                <Route path="login" element={<LoginPage/>}/>
                                <Route path="dialogs" element={<DialogsPage/>}/>
                                <Route path="users" element={<UsersContainer/>}/>
                                <Route path="users/:userId" element={<ProfileContainer/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
})

export default App

type PropsType = {
    initialized: boolean
}
