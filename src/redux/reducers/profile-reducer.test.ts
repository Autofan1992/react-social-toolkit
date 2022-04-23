import { PostType, ProfileType } from '../../types/types'
import profileReducer, { addPost, deletePost, likePost } from './profile-reducer'

test('should like post with id = 0', () => {
    const previousState = {
        posts: [
            {
                post: '',
                id: 0,
                likesCount: 0
            }
        ] as Array<PostType>,
        profile: null as ProfileType | null,
        status: null as string | null,
        isFetching: false as boolean,
        error: null as string | null,
    }
    expect(profileReducer(previousState, likePost(0))).toEqual(
        {
            posts: [
                {
                    post: '',
                    id: 0,
                    likesCount: 1
                }
            ] as Array<PostType>,
            profile: null as ProfileType | null,
            status: null as string | null,
            isFetching: false as boolean,
            error: null as string | null,
        }
    )
})

test('should add text in post with id = 0', () => {
    const previousState = {
        posts: [] as Array<PostType>,
        profile: null as ProfileType | null,
        status: null as string | null,
        isFetching: false as boolean,
        error: null as string | null,
    }
    expect(profileReducer(previousState, addPost({
        id: 0,
        post: 'Mykola is Senior dev',
        likesCount: 0
    }))).toEqual(
        {
            posts: [
                {
                    post: 'Mykola is Senior dev',
                    id: 0,
                    likesCount: 0
                }
            ] as Array<PostType>,
            profile: null as ProfileType | null,
            status: null as string | null,
            isFetching: false as boolean,
            error: null as string | null,
        }
    )
})

test('should delete post with id = 0', () => {
    const previousState = {
        posts: [
            {
                id: 0,
                post: 'Mykola is Senior dev',
                likesCount: 0
            }
        ] as Array<PostType>,
        profile: null as ProfileType | null,
        status: null as string | null,
        isFetching: false as boolean,
        error: null as string | null,
    }
    expect(profileReducer(previousState, deletePost(0))).toEqual(
        {
            posts: [] as Array<PostType>,
            profile: null as ProfileType | null,
            status: null as string | null,
            isFetching: false as boolean,
            error: null as string | null,
        }
    )
})