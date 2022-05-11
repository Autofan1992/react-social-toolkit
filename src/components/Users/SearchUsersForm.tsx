import { FC } from 'react'
import { Formik } from 'formik'
import { SearchRequestType } from '../../types/types'
import { createSelectField, createTextField } from '../../helpers/CustomField'
import { Form, SubmitButton } from 'formik-antd'
import { Col, Row } from 'antd'
import styles from './Users.module.scss'

const SearchUsersForm: FC<PropsType> = ({ handleSearch, term, friend, isFetching, serverError }) => {
    return <Formik
        initialValues={{ term, friend }}
        onSubmit={({ friend, term }) => {
            handleSearch({ friend, term })
        }}
    >
        {({ handleSubmit, isSubmitting }) => (
            <Form>
                <Row gutter={12}>
                    <Col md={4}>{createTextField<InputNames>('Type user name to start search', 'term', undefined, {
                        onInput: handleSubmit
                    })}</Col>

                    <Col md={3}>{createSelectField<InputNames>('Search all users', 'friend', [
                            {
                                name: 'Search all users',
                                value: 'null'
                            },
                            {
                                name: 'Search friends only',
                                value: 'true',
                            },
                            {
                                name: 'Search only not friends',
                                value: 'false'
                            }
                        ],
                        {
                            className: styles.searchInput
                        }
                    )}</Col>
                    <Col>
                        <SubmitButton type="primary" loading={isSubmitting && isFetching}>Search</SubmitButton>
                    </Col>
                </Row>

                {serverError &&
                    <div className="text-center my-5">{serverError}</div>
                }
            </Form>)}
    </Formik>
}

export default SearchUsersForm

type InputNames = keyof SearchRequestType

type PropsType = {
    isFetching: boolean,
    serverError: string | null
    term: string
    friend: string
    handleSearch: ({ friend, term }: { friend: string, term: string }) => void
}