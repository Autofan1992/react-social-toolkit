import { UserType } from '../../types/types'
import { Button } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../images/user.svg'

const User: FC<PropsType> = ({ user, toggleFollowing, followInProgress }) => {
    return (
        <div key={user.id} >
            <div>
                <div>
                    <Link to={'/profile/' + user.id}>
                        <img src={user.photos.small ?? avatar} alt=""/>
                    </Link>
                </div>
                <div>
                    <Button
                        type="primary"
                        size="large"
                        loading={followInProgress.some(id => id === user.id)}
                        onClick={() => toggleFollowing(user.id, user.followed)}
                    >
                        {!user.followed ? 'Follow' : 'Unfollow'}
                    </Button>
                </div>
            </div>
            <div>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
            </div>
        </div>

    )
}

export default User

type PropsType = {
    user: UserType
    toggleFollowing: (userID: number, followed: boolean) => void
    followInProgress: Array<number>
}