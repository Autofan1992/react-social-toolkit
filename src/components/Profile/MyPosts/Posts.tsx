import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks'
import { addPost, deletePost, likePost } from '../../../redux/reducers/profile-reducer'
import PostForm from './PostForm'
import Post from './Post/Post'
import { selectPosts } from '../../../redux/selectors/profile-selectors'

const Posts: FC = () => {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectPosts)

    const handleAddPost = (post: string) => dispatch(addPost(post))
    const handleDeletePost = (id: number) => dispatch(deletePost(id))
    const handleLikePost = (id: number) => dispatch(likePost(id))

    return <div>
        <h2>My posts</h2>
        <div>
            <PostForm addPost={handleAddPost}/>
        </div>
        <ul>
            {posts
                .map((p) => <Post
                    key={p.id} id={p.id}
                    post={p.post}
                    likesCount={p.likesCount}
                    likePost={handleLikePost}
                    deletePost={handleDeletePost}
                />)
            }
        </ul>
    </div>
}

export default Posts