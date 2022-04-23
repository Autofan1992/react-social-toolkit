import { FC } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Layout } from 'antd'
import Preloader from './components/common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'

const { Content } = Layout

const App: FC<PropsType> = ({ initialized }) => {
    return <Layout style={{
        minHeight: '100vh'
    }}>
        <HeaderContainer/>
        <Layout>
            <Navbar/>
            <Layout style={{ padding: '30px' }}>
                <Content>
                {initialized
                    ? <Outlet/>
                    : <Preloader/>
                }
                </Content>
            </Layout>
        </Layout>
    </Layout>
}

export default App

type PropsType = {
    initialized: boolean
}
