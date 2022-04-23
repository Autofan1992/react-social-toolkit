import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks'
import { getProfileState } from '../../../redux/selectors/selectors'
import { addPost, deletePost, likePost } from '../../../redux/reducers/profile-reducer'
import Posts from './Posts'

const PostsContainer: FC = () => {
    const dispatch = useAppDispatch()
    const { posts } = useAppSelector(getProfileState)

    const handleAddPost = (post: string) => dispatch(addPost(post))
    const handleDeletePost = (id: number) => dispatch(deletePost(id))
    const handleLikePost = (id: number) => dispatch(likePost(id))

    return <Posts addPost={handleAddPost} deletePost={handleDeletePost} likePost={handleLikePost} posts={posts}/>
}

export default PostsContainer