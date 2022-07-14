import { Button, Card, Skeleton } from 'antd'
import { toggleUserFollow } from '../../../redux/slices/users-slice'
import avatar from '../../../assets/images/user.svg'
import { Link } from 'react-router-dom'
import { UserType } from '../../../types/users-types'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks'
import { selectIsDarkTheme } from '../../../redux/selectors/app-selectors'

type PropsType = {
    user: UserType
    followInProgress: number[]
    isFetching: boolean
}

export const UserItem: FC<PropsType> = ({ user, followInProgress, isFetching }) => {
    const dispatch = useAppDispatch()
    const isDarkTheme = useAppSelector(selectIsDarkTheme)

    return (
        <Card className={`${isDarkTheme ? `card-dark` : ``} text-center`}>
            <Skeleton avatar title={false} loading={isFetching} active>
                <Link to={`${user.id}`}>
                    <img src={user.photos.small ?? avatar} alt=""/>
                </Link>
                <h3 className="my-3 text-wrap">
                    <Link to={`${user.id}`}>{user.name}</Link>
                </h3>
            </Skeleton>
            <Button
                type="primary"
                className="w-100"
                loading={followInProgress.some(id => id === user.id)}
                onClick={() => dispatch(toggleUserFollow({ id: user.id, followed: user.followed }))}
            >
                {!user.followed ? 'Follow' : 'Unfollow'}
            </Button>
        </Card>
    )
}