import React, { FC, lazy, memo, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Layout } from 'antd'
import Preloader from '../common/Preloader/Preloader'
import HeaderContainer from '../Header/HeaderContainer'
import styles from './App.module.scss'
import LoginContainer from '../Login/LoginContainer'
import Dialogs from '../Dialogs/Dialogs'
import NotFound from '../common/404/NotFound'

const { Content } = Layout

const ProfileContainer = lazy(() => import('../../components/Profile/ProfileContainer'))
const UsersContainer = lazy(() => import('../../components/Users/UsersContainer'))

const App: FC<PropsType> = memo(() => {
    return <div className={styles.wrapper}>
        <Layout className="h-100">
            <HeaderContainer/>
            <Layout className={styles.appLayout}>
                <Navbar/>
                <Layout className="p-4">
                    <Content>
                        <Suspense fallback={<Preloader/>}>
                            <Routes>
                                <Route path="/" element={<ProfileContainer/>}/>
                                <Route path="/:editProfile" element={<ProfileContainer/>}/>
                                <Route path="login" element={<LoginContainer/>}/>
                                <Route path="dialogs" element={<Dialogs/>}/>
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
