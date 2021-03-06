import { FC } from 'react'
import { Formik } from 'formik'
import { createSelectField, createTextField } from '../../components/forms/CustomField'
import { Form, SubmitButton } from 'formik-antd'
import { Col, Row } from 'antd'
import styles from './UsersPage.module.scss'
import { UsersSearchParamsType } from '../../types/users-types'

const SearchUsersForm: FC<PropsType> = ({ handleSearch, term, friend, isFetching }) => {
    return <Formik
        initialValues={{ term, friend }}
        onSubmit={({ friend, term }) => {
            handleSearch({ friend, term })
        }}
    >
        {({ handleSubmit, isSubmitting }) => (
            <Form>
                <Row gutter={15}>
                    <Col xs={24} className="mb-2 mb-md-0"
                         md={8}>{createTextField<InputNames>('Type user name to start search', 'term', undefined, {
                        onInput: handleSubmit
                    })}</Col>

                    <Col xs={12} md={8}>{createSelectField<InputNames>('Search all users', 'friend', [
                            {
                                name: 'Search all users',
                                value: null
                            },
                            {
                                name: 'Search friends only',
                                value: true,
                            },
                            {
                                name: 'Search only not friends',
                                value: false
                            }
                        ],
                        {
                            className: styles.searchInput
                        }
                    )}</Col>
                    <Col xs={12} md={8}>
                        <SubmitButton
                            type="primary"
                            className="w-100"
                            loading={isSubmitting && isFetching}
                        >Search</SubmitButton>
                    </Col>
                </Row>
            </Form>)}
    </Formik>
}

type InputNames = keyof UsersSearchParamsType

type PropsType = {
    isFetching: boolean,
    term: string
    friend: boolean | null
    handleSearch: ({ friend, term }: { friend: boolean | null, term: string }) => void
}

export default SearchUsersForm