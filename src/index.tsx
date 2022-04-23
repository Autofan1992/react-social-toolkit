import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import AppContainer from './AppContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import './index.css'
import ProfileContainer from './components/Profile/ProfileContainer'
import LoginContainer from './components/Login/LoginContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import NotFound from './components/common/404/NotFound'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppContainer/>}>
                        <Route index element={<ProfileContainer/>}/>
                        <Route path="login" element={<LoginContainer/>}/>
                        <Route path="dialogs" element={<DialogsContainer/>}/>
                        <Route path="users" element={<UsersContainer/>}/>
                        <Route path="users/:userId" element={<ProfileContainer/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
