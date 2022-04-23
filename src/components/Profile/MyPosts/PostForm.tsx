import { FC } from 'react'
import { PostType } from '../../../types/types'
import { Form, SubmitButton } from 'formik-antd'
import { createTextAreaField } from '../../../helpers/CustomField'
import { Formik } from 'formik'
import * as Yup from 'yup'

const PostSchema = Yup.object().shape({
    post: Yup.string()
        .min(2, 'Too Short!')
        .max(1000, 'Too Long!')
        .required('Required'),
})

const PostForm: FC<PropsType> = (
    { addPost }) => {
    return <Formik
        initialValues={{
            post: ''
        } as PostType}
        validationSchema={PostSchema}
        onSubmit={({ post }, { setSubmitting }) => {
            addPost(post)
            setSubmitting(false)
        }}>
        {({ errors, touched, isSubmitting }) => (
            <Form>
                {createTextAreaField<InputNames>('Type some text', 'post', {
                    status: (touched.post && errors.post) && 'error',
                    placeholder: errors.post
                })}
                <div style={{
                    textAlign: 'center',
                    marginTop: '30px'
                }}>
                    <SubmitButton size="large" type="primary" htmlType="submit" disabled={isSubmitting}>
                        Add message
                    </SubmitButton>
                </div>
            </Form>
        )}
    </Formik>
}

export default PostForm

type InputNames = keyof PostType

type PropsType = {
    addPost: (post: string) => void
}