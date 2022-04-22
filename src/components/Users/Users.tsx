import { FC } from 'react'
import { UserType } from '../../types/types'
import { Skeleton } from 'antd'
import User from './User'

const Users: FC<PropsType> = ({ users, followInProgress, toggleFollowing, isFetching }) => {
    return <div>

        <Skeleton active loading={isFetching}>
            {users.map(u =>
                <User
                    key={u.id}
                    user={u}
                    toggleFollowing={toggleFollowing}
                    followInProgress={followInProgress}
                />
            )}
        </Skeleton>

        {!isFetching && !users.length && <div>Users not found</div>}

    </div>
}

export default Users

type PropsType = {
    users: Array<UserType>
    isFetching: boolean
    toggleFollowing: (userId: number, followed: boolean) => void
    followInProgress: Array<number>
}