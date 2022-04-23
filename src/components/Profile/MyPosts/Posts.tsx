import { FC } from 'react'
import { PostType } from '../../../types/types'
import Post from './Post/Post'
import PostForm from './PostForm'

const Posts: FC<PropsType> = ({ addPost, deletePost, likePost, posts }) => {
    return <div>
        <h2>My posts</h2>
        <div>
            <PostForm addPost={addPost}/>
        </div>
        <ul>
            {posts
                .map((p) => <Post
                    key={p.id} id={p.id}
                    post={p.post}
                    likesCount={p.likesCount}
                    likePost={likePost}
                    deletePost={deletePost}
                />)
            }
        </ul>
    </div>
}

type PropsType = {
    addPost: (post: string) => void
    deletePost: (id: number) => void
    likePost: (id: number) => void
    posts: Array<PostType>
}

export default Posts
