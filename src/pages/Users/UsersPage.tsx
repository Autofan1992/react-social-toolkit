import { FC, memo, useEffect } from 'react'
import Users from '../../components/Users/Users'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { fetchUsers, setUsersSearchParams } from '../../redux/slices/users-slice'
import Paginator from '../../components/common/Paginator/Paginator'
import SearchUsersForm from '../../components/Users/SearchUsersForm'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import { Divider } from 'antd'
import {
    selectFollowInProgress,
    selectTotalUsersCount,
    selectUsers,
    selectUsersError,
    selectUsersIsFetching,
    selectUsersSearchParams
} from '../../redux/selectors/users-selectors'
import boolOrNullToString, { BoolOrNullToStringType } from '../../helpers/boolOrNullToStringType'
import { UsersSearchParamsType } from '../../types/users-types'
import stringToBoolOrNull from '../../helpers/stringToBoolOrNull'

const UsersPage: FC = memo(() => {
    const dispatch = useAppDispatch()
    const isFetching = useAppSelector(selectUsersIsFetching)
    const error = useAppSelector(selectUsersError)
    const users = useAppSelector(selectUsers)
    const followInProgress = useAppSelector(selectFollowInProgress)
    const totalUsersCount = useAppSelector(selectTotalUsersCount)
    const { friend, term, pageSize, currentPage } = useAppSelector(selectUsersSearchParams)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPageParam = searchParams.get('page') ?? currentPage
    const pageSizeParam = searchParams.get('count') ?? pageSize
    const termParam = searchParams.get('term') ?? term
    const friendParam = searchParams.get('friend') ?? friend

    useEffect(() => {
        const newParams = {} as UsersSearchParamsType
        
        newParams.currentPage = +currentPageParam
        newParams.pageSize =  +pageSizeParam
        newParams.term = termParam
        newParams.friend = stringToBoolOrNull(friendParam as BoolOrNullToStringType)

        dispatch(setUsersSearchParams(newParams))

    }, [currentPageParam, dispatch, friendParam, pageSizeParam, termParam])

    useEffect(() => {
        dispatch(fetchUsers())
    }, [searchParams, dispatch])

    const handleSearchParams = ({ currentPage, pageSize, friend, term }: UsersSearchParamsType) => {
        searchParams.set('page', `${currentPage}`)
        searchParams.set('count', `${pageSize}`)
        if (term) searchParams.set('term', term)
        if (friend !== null) {
            searchParams.set('friend', boolOrNullToString(friend))
        } else {
            searchParams.delete('friend')
        }

        setSearchParams(searchParams)
    }

    const onPageChange = (currentPage: number, pageSize: number) => {
        handleSearchParams({ currentPage, pageSize, friend, term })
    }

    const handleSearch = debounce(({ friend, term }: { friend: boolean | null, term: string }) => {
        handleSearchParams({ currentPage: 1, pageSize: 5, friend, term })
    }, 1000)

    return <div className="d-flex flex-column h-100">
        <SearchUsersForm
            handleSearch={handleSearch}
            term={termParam}
            friend={stringToBoolOrNull(friendParam as BoolOrNullToStringType)}
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