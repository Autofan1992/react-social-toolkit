import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Layout } from 'antd'
import Preloader from '../common/Preloader/Preloader'
import HeaderContainer from '../Header/HeaderContainer'
import styles from './App.module.scss'

const { Content } = Layout

const App: FC<PropsType> = ({ initialized }) => {
    return <div className={styles.wrapper}>
        <Layout className="h-100">
            <HeaderContainer/>
            <Layout>
                <Navbar/>
                <Layout className="p-4">
                    <Content>
                        {initialized
                            ? <Outlet/>
                            : <Preloader/>
                        }
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
}

export default App

type PropsType = {
    initialized: boolean
}
