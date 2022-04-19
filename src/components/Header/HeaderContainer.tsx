import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getAuthState } from '../../redux/selectors/selectors'
import { logout } from '../../redux/reducers/auth-reducer'
import useAuthRedirect from '../hooks/useAuthRedirect'
import { FC } from 'react'
import Header from './Header'

const HeaderContainer: FC = () => {
    const dispatch = useAppDispatch()
    const { id, login, photos, isAuth } = useAppSelector(getAuthState).profile
    const { isFetching } = useAppSelector(getAuthState)
    const handleLogout = () => dispatch(logout())

    useAuthRedirect()

    return <Header
        isFetching={isFetching}
        isAuth={isAuth}
        login={login}
        id={id}
        photos={photos}
        handleLogout={handleLogout}/>
}

export default HeaderContainer