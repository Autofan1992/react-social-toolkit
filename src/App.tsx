import React, { FC } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Layout } from 'antd'
import Header from './components/Header/Header'
import ProfileContainer from './components/Profile/ProfileContainer'
import NotFound from './components/404/NotFound'
import LoginContainer from './components/Login/LoginContainer'

const { Content } = Layout

const App: FC = () => {
    return (
        <Layout style={{
            minHeight: '100vh'
        }}>
            <Header/>
            <Layout>
                <Navbar/>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content>
                        <Routes>
                            <Route path="/" element={<ProfileContainer/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                            <Route
                                path="*"
                                element={<NotFound/>}
                            />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

/*
                                <Route path="/dialogs" element={<DialogsContainer/>}/>
                                <Route path="/profile/:userId?" element={<SuspenseProfile/>}/>
                                <Route path="/news" element={<News/>}/>
                                <Route path="/music" element={<Music/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/todolist" element={<ToDoListContainer/>}/>
                                <Route path="/users" element={<UsersContainer/>}/>
                                <Route path="/weather" element={<WeatherContainer/>}/>
                                <Route path="/budgets" element={<BudgetsContainer/>}/>
                                <Route path="*" element={<NotFound/>}/>*/

export default App
