import { FC, memo } from 'react'
import { Avatar, Button, List, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/user.svg'
import { toggleUserFollow } from '../../redux/slices/users-slice'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { UserType } from '../../types/users-types'

const Users: FC<PropsType> = memo(({ users, followInProgress, isFetching }) => {
    const dispatch = useAppDispatch()

    return <>
        <List
            className="flex-grow-1"
            itemLayout="horizontal"
            loading={isFetching}
            dataSource={users}
            renderItem={user => (
                <List.Item
                    actions={[<Button
                        type="primary"
                        size="large"
                        loading={followInProgress.some(id => id === user.id)}
                        onClick={() => dispatch(toggleUserFollow({ id: user.id, followed: user.followed }))}
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
    </>
})

type PropsType = {
    users: Array<UserType>
    isFetching: boolean
    followInProgress: Array<number>
}

export default Users