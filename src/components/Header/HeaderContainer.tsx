import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getAuthState, getProfileState } from '../../redux/selectors/selectors'
import { logout } from '../../redux/reducers/auth-reducer'
import useAuthRedirect from '../hooks/useAuthRedirect'
import { FC } from 'react'
import Header from './Header'

const HeaderContainer: FC = () => {
    const dispatch = useAppDispatch()
    const { authInfo, isAuth } = useAppSelector(getAuthState)
    const { id, login } = authInfo
    const { profile } = useAppSelector(getProfileState)
    const { isFetching } = useAppSelector(getAuthState)
    const handleLogout = () => dispatch(logout())

    useAuthRedirect()

    return <Header
        isFetching={isFetching}
        isAuth={isAuth}
        login={login}
        id={id}
        photos={profile?.photos}
        handleLogout={handleLogout}
    />
}

export default HeaderContainer