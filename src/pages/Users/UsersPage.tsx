import { FC, memo, useEffect } from 'react'
import Users from '../../components/Users/Users'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { fetchUsers, setUsersSearchParams } from '../../redux/slices/users-slice'
import Paginator from '../../components/common/Paginator/Paginator'
import SearchUsersForm from '../../components/Users/SearchUsersForm'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import { Col, Divider, Row } from 'antd'
import {
    selectTotalUsersCount,
    selectUsers,
    selectUsersIsFetching,
    selectUsersSearchParams
} from '../../redux/selectors/users-selectors'
import boolOrNullToString, { BoolOrNullToStringType } from '../../helpers/boolOrNullToStringType'
import { UsersSearchParamsType } from '../../types/users-types'
import stringToBoolOrNull from '../../helpers/stringToBoolOrNull'
import { DEFAULT_USERS_PER_PAGE } from '../../redux/constants/user-constants'
import Preloader from '../../components/common/Preloader/Preloader'

const UsersPage: FC = memo(() => {
    const dispatch = useAppDispatch()
    const isFetching = useAppSelector(selectUsersIsFetching)
    const users = useAppSelector(selectUsers)
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
        newParams.pageSize = +pageSizeParam
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
        handleSearchParams({ currentPage: 1, pageSize: DEFAULT_USERS_PER_PAGE, friend, term })
    }, 1000)

    return <div className="container h-100">
        <Row justify="center" className="h-100">
            <Col lg={20} xl={16} className="h-100 d-flex flex-column">
                <SearchUsersForm
                    handleSearch={handleSearch}
                    term={termParam}
                    friend={stringToBoolOrNull(friendParam as BoolOrNullToStringType)}
                    isFetching={isFetching}
                />
                <Divider/>
                <div className="flex-grow-1 d-flex flex-column justify-content-center">
                    {users ? (
                        <Users
                            users={users}
                            isFetching={isFetching}
                        />
                    ) : (
                        <Preloader/>
                    )}
                </div>
                <Paginator
                    onPageChange={onPageChange}
                    totalItemsCount={totalUsersCount}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    disabled={isFetching}
                />
            </Col>
        </Row>
    </div>
})

export default UsersPage