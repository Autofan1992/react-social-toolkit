import { FC } from 'react'
import { useParams } from 'react-router-dom'

const ProfileContainer: FC = () => {
    const { userId } = useParams()

    console.log(userId)

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}

export default ProfileContainer