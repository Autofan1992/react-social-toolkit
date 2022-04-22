import { FC } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Layout } from 'antd'
import ProfileContainer from './components/Profile/ProfileContainer'
import NotFound from './components/common/404/NotFound'
import LoginContainer from './components/Login/LoginContainer'
import Preloader from './components/common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'

const { Content } = Layout

const App: FC<PropsType> = ({ initialized }) => {
    return <Layout style={{
        minHeight: '100vh'
    }}>
        <HeaderContainer/>
        <Layout>
            <Navbar/>
            <Layout style={{ padding: '0 24px 24px' }}>
                {initialized
                    ? <Content>
                        <Routes>
                            <Route path="/" element={<ProfileContainer/>}/>
                            <Route path="/user/:userId" element={<ProfileContainer/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                            <Route path="/dialogs" element={<DialogsContainer/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route
                                path="*"
                                element={<NotFound/>}
                            />
                        </Routes>
                    </Content>
                    : <Preloader/>
                }
            </Layout>
        </Layout>
    </Layout>
}

/*

                                <Route path="/news" element={<News/>}/>
                                <Route path="/music" element={<Music/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/todolist" element={<ToDoListContainer/>}/>

                                <Route path="/weather" element={<WeatherContainer/>}/>
                                <Route path="/budgets" element={<BudgetsContainer/>}/>
                                <Route path="*" element={<NotFound/>}/>*/

export default App

type PropsType = {
    initialized: boolean
}
