import React, { FC, lazy, memo, Suspense, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Layout } from 'antd'
import Preloader from '../common/Preloader/Preloader'
import Header from '../Header/Header'
import styles from './App.module.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../../pages/Login/LoginPage'
import ChatPage from '../../pages/Chat/ChatPage'
import NotFound from '../../pages/404/NotFound'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { initializeApp } from '../../redux/slices/app-slice'

const { Content } = Layout

const ProfileContainer = lazy(() => import('../../pages/Profile/ProfilePage'))
const UsersContainer = lazy(() => import('../../pages/Users/UsersPage'))

const App: FC = memo(() => {
    const handleAllUnhandledErrors = (reason: any) => alert(reason.reason)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
        window.addEventListener('unhandledrejection', handleAllUnhandledErrors)

        return () => {
            window.removeEventListener('unhandledrejection', handleAllUnhandledErrors)
        }
    }, [dispatch])

    return <div className={styles.wrapper}>
        <Layout className="h-100">
            <Header/>
            <Layout className={styles.appLayout}>
                <Navbar/>
                <Layout className="p-4">
                    <Content>
                        <Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path="/" element={<Navigate to="profile" replace/>}/>
                                <Route path="profile" element={<ProfileContainer/>}/>
                                <Route path="profile/edit" element={<ProfileContainer/>}/>
                                <Route path="login" element={<LoginPage/>}/>
                                <Route path="chat" element={<ChatPage/>}/>
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
