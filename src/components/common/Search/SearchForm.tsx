import { FC } from 'react'
import { APIRespondErrorType, SearchRequestType } from '../../../types/types'
import { FormikProps } from 'formik'
import { createSelectField, createTextField } from '../../../helpers/CustomField'
import { Form, SubmitButton } from 'formik-antd'
import Preloader from '../Preloader/Preloader'

const SearchForm: FC<APIRespondErrorType & FormikProps<SearchRequestType> & PropsType> = (
    {
        errors,
        touched,
        placeholder,
        isFetching,
        serverError,
        handleSubmit
    }) => {
    return <Form
        style={{
            marginTop: '30px'
        }}
    >

        {createTextField<InputNames>(placeholder, 'term', undefined, {
            onInput: handleSubmit,
            status: (touched.term && errors.term) && 'error'
        })}

        {createSelectField<InputNames>('Search all users', 'friend', [
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
                style: {
                    width: 120
                }
            }
        )}

        {isFetching && <Preloader/>}

        {serverError &&
            <div style={{
                textAlign: 'center',
                margin: '15px 0'
            }}>{serverError}</div>
        }

        <SubmitButton hidden={true}/>
    </Form>
}

export default SearchForm

type PropsType = {
    placeholder: string
    isFetching: boolean
}

type InputNames = keyof SearchRequestType