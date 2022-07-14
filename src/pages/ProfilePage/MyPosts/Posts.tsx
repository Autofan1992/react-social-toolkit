import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks'
import { addPost, deletePost, likePost } from '../../../redux/slices/profile-slice'
import PostForm from './PostForm'
import Post from './Post/Post'
import { selectPosts } from '../../../redux/selectors/profile-selectors'

const Posts: FC = () => {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectPosts)


    const handleAddPost = (post: string) => {
        dispatch(addPost(post))
    }
    const handleDeletePost = (id: number) => {
        dispatch(deletePost(id))
    }
    const handleLikePost = (id: number) => {
        dispatch(likePost(id))
    }

    return <>
        <h2 className="mb-3">My posts</h2>
        <div className="mb-3">
            {posts
                .map((p) => <Post
                    key={p.id} id={p.id}
                    post={p.post}
                    likesCount={p.likesCount}
                    likePost={handleLikePost}
                    deletePost={handleDeletePost}
                />)
            }
        </div>
        <div>
            <PostForm addPost={handleAddPost}/>
        </div>
    </>
}

export default Posts