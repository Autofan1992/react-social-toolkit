import { FC, memo, useEffect } from 'react'
import Users from './Users'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getUsersState } from '../../redux/selectors/selectors'
import { fetchUsers } from '../../redux/reducers/users-reducers'
import Paginator from '../common/Paginator/Paginator'
import SearchUsersForm from './SearchUsersForm'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import { Divider } from 'antd'
import stringToBoolean, { StringBooleanType } from '../../helpers/stringToBoolean'

const UsersContainer: FC = memo(() => {
    const dispatch = useAppDispatch()
    const {
        isFetching,
        error,
        users,
        usersSearchParams,
        followInProgress,
        totalUsersCount
    } = useAppSelector(getUsersState)
    const { friend, term, pageSize, currentPage } = usersSearchParams

    const [searchParams, setSearchParams] = useSearchParams()

    const termParam = searchParams.get('term') ?? term
    const currentPageParam = searchParams.get('page') ?? currentPage
    const pageSizeParam = searchParams.get('count') ?? pageSize
    const friendParam = searchParams.get('friend') as StringBooleanType

    const friendBooleanParam = friendParam ? stringToBoolean(friendParam) : friend

    useEffect(() => {
        dispatch(fetchUsers({
            currentPage: +currentPageParam,
            pageSize: +pageSizeParam,
            term: termParam,
            friend: friendBooleanParam
        }))
    }, [dispatch, fetchUsers])

    const onPageChange = (currentPage: number, pageSize: number) => {
        dispatch(fetchUsers({ currentPage, pageSize, term, friend }))
        setSearchParams({ page: `${currentPage}`, count: `${pageSize}` })
    }

    const handleSearch = debounce(({ friend, term }: { friend: string, term: string }) => {
        const friendToBoolean = stringToBoolean(friend as StringBooleanType)

        setSearchParams({ term, friend })
        dispatch(fetchUsers({ currentPage: 1, pageSize: 5, friend: friendToBoolean, term }))
    }, 1000)

    return <div className="d-flex flex-column h-100">
        <SearchUsersForm
            handleSearch={handleSearch}
            term={term} friend={friendParam}
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

export default UsersContainer