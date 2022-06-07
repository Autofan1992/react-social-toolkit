import { FC, memo, useEffect } from 'react'
import Users from '../../components/Users/Users'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { fetchUsers } from '../../redux/reducers/users-reducers'
import Paginator from '../../components/common/Paginator/Paginator'
import SearchUsersForm from '../../components/Users/SearchUsersForm'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import { Divider } from 'antd'
import stringToBoolean, { StringBooleanType } from '../../helpers/stringToBoolean'
import {
    selectFollowInProgress,
    selectTotalUsersCount,
    selectUsers,
    selectUsersError,
    selectUsersIsFetching,
    selectUsersSearchFilters
} from '../../redux/selectors/users-selectors'

const UsersPage: FC = memo(() => {
    const dispatch = useAppDispatch()
    const isFetching = useAppSelector(selectUsersIsFetching)
    const error = useAppSelector(selectUsersError)
    const users = useAppSelector(selectUsers)
    const followInProgress = useAppSelector(selectFollowInProgress)
    const totalUsersCount = useAppSelector(selectTotalUsersCount)
    const { friend, term, pageSize, currentPage } = useAppSelector(selectUsersSearchFilters)

    const [searchParams, setSearchParams] = useSearchParams()

    const termParam = searchParams.get('term') ?? term
    const currentPageParam = searchParams.get('page') ?? currentPage
    const pageSizeParam = searchParams.get('count') ?? pageSize
    const friendParam = searchParams.get('friend') as StringBooleanType
    const friendBooleanParam = friendParam ? stringToBoolean(friendParam) : friend

    useEffect(() => {
        searchParams.set('page', `${currentPage}`)
        searchParams.set('count', `${pageSize}`)
        if (term) searchParams.set('term', term)
        if (friend !== null) {
            searchParams.set('friend', `${friend}`)
        } else {
            searchParams.delete('friend')
        }

        setSearchParams(searchParams)
    }, [currentPage, pageSize, term, friend])

    useEffect(() => {
        dispatch(fetchUsers({
            currentPage: +currentPageParam,
            pageSize: +pageSizeParam,
            term: termParam,
            friend: friendBooleanParam
        }))
    }, [dispatch])

    const onPageChange = (currentPage: number, pageSize: number) => {
        dispatch(fetchUsers({ currentPage, pageSize, term, friend }))
    }

    const handleSearch = debounce(({ friend, term }: { friend: string, term: string }) => {
        const friendToBoolean = stringToBoolean(friend as StringBooleanType)

        dispatch(fetchUsers({ currentPage: 1, pageSize: 5, friend: friendToBoolean, term }))
    }, 1000)

    return <div className="d-flex flex-column h-100">
        <SearchUsersForm
            handleSearch={handleSearch}
            term={termParam} friend={friendParam}
            serverError={error}
            isFetching={isFetching}
        />
        <Divider/>
        <Users
            users={users}
            isFetching={isFetching}
            followInProgress={followInProgress}
        />
        <Paginator
            onPageChange={onPageChange}
            totalItemsCount={totalUsersCount}
            currentPage={currentPage}
            pageSize={pageSize}
            disabled={isFetching}
        />
    </div>
})

export default UsersPage