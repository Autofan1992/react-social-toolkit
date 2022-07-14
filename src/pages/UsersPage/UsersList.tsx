import { FC, memo } from 'react'
import { Col, Row } from 'antd'
import { useAppSelector } from '../../redux/hooks/hooks'
import { UserType } from '../../types/users-types'
import { selectFollowInProgress, selectUsersIsFetching } from '../../redux/selectors/users-selectors'
import { UserItem } from './UserItem/UserItem'

const UsersList: FC<PropsType> = memo(({ users }) => {
    const followInProgress = useAppSelector(selectFollowInProgress)
    const isFetching = useAppSelector(selectUsersIsFetching)

    return <Row gutter={[15, 15]}>
        {users.map(user => (
            <Col key={user.id} xs={24} md={12} lg={8}>
                <UserItem
                    followInProgress={followInProgress}
                    isFetching={isFetching}
                    user={user}
                />
            </Col>
        ))}
    </Row>
})

type PropsType = {
    users: Array<UserType>
    isFetching: boolean
}

export default UsersList