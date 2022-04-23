import { FC } from 'react'
import { UserType } from '../../types/types'
import { Avatar, Button, List, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import avatar from '../../images/user.svg'

const Users: FC<PropsType> = ({ users, followInProgress, toggleFollowing, isFetching }) => {
    return <div>
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={user => (
                <List.Item
                    actions={[<Button
                        type="primary"
                        size="large"
                        loading={followInProgress.some(id => id === user.id)}
                        onClick={() => toggleFollowing(user.id, user.followed)}
                    >
                        {!user.followed ? 'Follow' : 'Unfollow'}
                    </Button>]}
                >
                    <Skeleton avatar title={false} loading={isFetching} active>
                        <List.Item.Meta
                            avatar={<Avatar src={user.photos.small ?? avatar}/>}
                            title={<Link to={`${user.id}`}>{user.name}</Link>}
                            description={user.status}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
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