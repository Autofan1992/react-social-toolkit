import { FC, memo } from 'react'
import { UserType } from '../../types/types'
import { Avatar, Button, List, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/user.svg'
import { toggleUserFollow } from '../../redux/reducers/users-reducers'
import { useAppDispatch } from '../../redux/hooks/hooks'

const Users: FC<PropsType> = memo(({ users, followInProgress, isFetching }) => {
    const dispatch = useAppDispatch()

    return <>
        <List
            className='flex-grow-1'
            itemLayout="horizontal"
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

export default Users

type PropsType = {
    users: Array<UserType>
    isFetching: boolean
    followInProgress: Array<number>
}