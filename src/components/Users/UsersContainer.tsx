import { FC, memo, useEffect } from 'react'
import Users from './Users'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getUsersState } from '../../redux/selectors/selectors'
import { fetchUsers, toggleUserFollow } from '../../redux/reducers/users-reducers'
import Paginator from '../common/Paginator/Paginator'
import SearchUsersForm from './SearchUsersForm'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'

const UsersContainer: FC = memo(() => {
    const dispatch = useAppDispatch()
    const {
        isFetching,
        error,
        users,
        currentPage,
        pageSize,
        followInProgress,
        totalUsersCount
    } = useAppSelector(getUsersState)
    const [searchParams, setSearchParams] = useSearchParams()
    const termParam = searchParams.get('term')
    const friendParam = searchParams.get('friend') as string

    const term = (termParam !== null) ? termParam : ''
    const friend = friendParam === 'true' ? true : friendParam === 'false' ? false : undefined

    useEffect(() => {
        dispatch(fetchUsers({ currentPage, pageSize, term, friend }))
    }, [dispatch, currentPage, pageSize, friend, term])

    const toggleFollowUser = (userId: number, followed: boolean) => {
        dispatch(toggleUserFollow({ userId, followed }))
    }

    const onPageChange = (currentPage: number, pageSize: number) => {
        dispatch(fetchUsers({ currentPage, pageSize, term, friend }))
    }

    const handleSearch = debounce(({ friend, term }: { friend: string, term: string }) => {
        const friendToBoolean = friend === 'true' ? true : friendParam === 'false' ? false : undefined

        setSearchParams({ term, friend })
        dispatch(fetchUsers({ friend: friendToBoolean, term }))
    }, 1000)

    return <>
        <SearchUsersForm handleSearch={handleSearch} term={term} friend={friendParam} serverError={error}
                         isFetching={isFetching}/>
        <Users
            users={users}
            isFetching={isFetching}
            toggleFollowing={toggleFollowUser}
            followInProgress={followInProgress}/>
        <Paginator
            onPageChange={onPageChange}
            totalItemsCount={totalUsersCount}
            currentPage={currentPage}
            pageSize={pageSize}
            disabled={isFetching}
        />
    </>
})

export default UsersContainer