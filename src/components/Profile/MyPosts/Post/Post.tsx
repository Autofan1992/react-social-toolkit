import avatar from '../../../../assets/images/user.svg'
import { FC } from 'react'

const Post: FC<PropsType> = ({ post, id, likePost, deletePost, likesCount }) => {
    return (
        <li>
            <div className="d-flex">
                <div>
                    <img src={avatar} className="w-100" alt=""/>
                </div>
                <div>{post}</div>
            </div>
            <hr/>
            <div className="d-flex">
                {!likesCount ? 'Click thumb up' :
                    <span className="me-2">Likes: {likesCount}</span>}
                <span
                    className="ms-auto"
                    onClick={() => likePost(id)}
                >👍</span>
            </div>
            <div className="d-flex">
                <button onClick={() => deletePost(id)}>Delete post</button>
            </div>
        </li>
    )
}

export default Post

type PropsType = {
    post: string
    id: number
    deletePost: (id: number) => void
    likePost: (id: number) => void
    likesCount: number
}