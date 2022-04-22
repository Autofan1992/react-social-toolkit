import { memo, useEffect } from 'react'
import Users from './Users'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getUsersState } from '../../redux/selectors/selectors'
import { fetchUsers, setCurrentPage, toggleUserFollow } from '../../redux/reducers/users-reducers'
import { SearchRequestType } from '../../types/types'
import { debounce } from 'lodash'
import Paginator from '../common/Paginator/Paginator'

const UsersContainer = memo(() => {
    const dispatch = useAppDispatch()
    const {
        isFetching,
        users,
        error,
        currentPage,
        pageSize,
        followInProgress,
        totalUsersCount
    } = useAppSelector(getUsersState)

    useEffect(() => {
        dispatch(fetchUsers({pageNum: currentPage, pageSize}))

    }, [currentPage, pageSize])

    const toggleFollowUser = (userId: number, followed: boolean) => {
        dispatch(toggleUserFollow({ userId, followed }))
    }

    const onPageChange = (pageNum: number, pageSize: number) => {
        dispatch(setCurrentPage({ pageNum, pageSize }))
    }

    const handleSearch = debounce((values: SearchRequestType) => {
        //dispatch(searchUsers(values))
    }, 500)


    return <>
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