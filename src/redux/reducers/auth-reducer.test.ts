import authReducer, { setAuthUserData } from './auth-reducer'
import { PhotosType } from '../../types/types'

test('should add user data to state', () => {
    const previousState = {
        userId: null as number | null,
        email: null as string | null,
        login: null as string | null,
        userPhoto: null as PhotosType | null,
        isAuth: false as boolean,
        authError: null as string | null,
        captchaUrl: null as string | null,
        isFetching: false
    }

    expect(authReducer(previousState, setAuthUserData({
        userId: 1,
        isAuth: true,
        login: 'yoyo1',
        email: 'yoyo2',
        userPhoto: {
            small: 'y1',
            large: 'y2'
        }
    }))).toEqual({
        userId: 1,
        isAuth: true,
        login: 'yoyo1',
        email: 'yoyo2',
        userPhoto: {
            small: 'y1',
            large: 'y2'
        }})
})