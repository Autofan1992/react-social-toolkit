import { FC } from 'react'
import SearchForm from './SearchForm'
import { FormikErrors, withFormik } from 'formik'
import { APIRespondErrorType } from '../../../types/types'
import { useAppSelector } from '../../../redux/hooks/hooks'
import { getUsersState } from '../../../redux/selectors/selectors'

const SearchContainer: FC<PropsType> = ({ handleSearch, term, friend }) => {
    const { isFetching, error } = useAppSelector(getUsersState)


    const FormikSearchForm = withFormik<APIRespondErrorType & OwnProps, { friend: string, term: string }>({
        mapPropsToValues: ({ term, friend = '' }) => ({
            term: term,
            friend: friend
        }),
        validate: (values: { friend: string, term: string }) => {
            const errors: FormikErrors<{ friend: string, term: string }> = {}
            if (values.term.length < 2) {
                errors.term = 'Required'
            }
            return errors
        },
        handleSubmit: ({ friend, term }) => {
            handleSearch({ friend, term })
        }
    })(SearchForm)

    return <FormikSearchForm serverError={error} isFetching={isFetching} term={term} friend={friend}/>
}

export default SearchContainer

type OwnProps = {
    isFetching: boolean
    term: string
    friend: string
}

type PropsType = {
    term: string
    friend: string
    handleSearch: ({ friend, term }: { friend: string, term: string }) => void
}