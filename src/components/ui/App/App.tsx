import React, { FC, lazy, memo, Suspense, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Layout } from 'antd'
import Preloader from '../Preloader/Preloader'
import Header from '../Header/Header'
import styles from './App.module.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../../../pages/LoginPage/LoginPage'
import ChatPage from '../../../pages/ChatPage/ChatPage'
import NotFoundPage from '../../../pages/404/NotFoundPage'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks'
import { initializeApp } from '../../../redux/slices/app-slice'
import { selectIsDarkTheme } from '../../../redux/selectors/app-selectors'
import { Footer } from '../Footer/Footer'
import { SettingsPage } from '../../../pages/SettingsPage/SettingsPage'

const { Content } = Layout

const ProfileContainer = lazy(() => import('../../../pages/ProfilePage/ProfilePage'))
const UsersContainer = lazy(() => import('../../../pages/UsersPage/UsersPage'))

const App: FC = memo(() => {
    const dispatch = useAppDispatch()
    const isDarkTheme = useAppSelector(selectIsDarkTheme)

    useEffect(() => {
        const bgColor = isDarkTheme ? '#1d2226' : '#f0f2f5'
        const textColor = isDarkTheme ? '#fff' : '#000000d9'

        document.documentElement.style.setProperty('--app-bg-color', bgColor)
        document.documentElement.style.setProperty('--app-text-color', textColor)
    }, [isDarkTheme])

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    return <div className={styles.wrapper}>
        <Layout className="h-100">
            <Header/>
            <Layout className={styles.appLayout}>
                <Navbar/>
                <Layout className="p-3 px-2 p-xl-4">
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
                                <Route path="settings" element={<SettingsPage/>}/>
                                <Route path="*" element={<NotFoundPage/>}/>
                            </Routes>
                        </Suspense>
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
        </Layout>
    </div>
})

export default App
