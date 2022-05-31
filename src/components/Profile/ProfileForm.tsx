import { FC, memo } from 'react'
import { Formik } from 'formik'
import { Form, SubmitButton } from 'formik-antd'
import { ProfileType } from '../../types/types'
import { createCheckbox, createTextAreaField, createTextField } from '../../helpers/CustomField'
import * as Yup from 'yup'
import { Col, Row } from 'antd'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { saveUserProfile } from '../../redux/reducers/profile-reducer'
import { useNavigate } from 'react-router-dom'

const ProfileSchema = Yup.object().shape({
    aboutMe: Yup.string()
        .min(2, 'Too Short!')
        .max(500, 'Too Long!')
        .required('Required'),
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required')
})

const ProfileForm: FC<PropsType> = memo((
    {
        profile,
        isFetching,
        serverError,
    }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return <Formik
        initialValues={
            profile as ProfileType
        }
        validationSchema={ProfileSchema}
        onSubmit={async (values, { setSubmitting }) => {
            const res = await dispatch(saveUserProfile(values))
            setSubmitting(false)
            if (!res.type.endsWith('rejected')) navigate('/profile')
        }}>
        {({ errors, touched, dirty }) => (
            <Form>
                <Row gutter={24}>
                    <Col md={12}>
                        <div>
                            <div>
                                <p><b>Full name</b></p>
                                {createTextField<InputNames>('Type your full name', 'fullName', undefined, {
                                    status: (touched.fullName && errors.fullName) && 'error',
                                    placeholder: errors.fullName
                                })}
                            </div>
                            <div>
                                <p><b>About me</b></p>
                                {createTextAreaField<InputNames>('Write about yourself', 'aboutMe', {
                                    status: (touched.aboutMe && errors.aboutMe) && 'error',
                                    placeholder: errors.aboutMe
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="d-flex">
                                <p className="me-2">
                                    <span>Looking for a job</span>
                                </p>
                                {createCheckbox<InputNames>('lookingForAJob')}
                            </div>
                            <div>
                                <p><b>My skills</b></p>
                                {createTextAreaField<InputNames>('Type your skills', 'lookingForAJobDescription', {
                                    status: (touched.lookingForAJobDescription && errors.lookingForAJobDescription) && 'error',
                                    placeholder: errors.lookingForAJobDescription
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <p><b>My socials</b></p>
                        <Row gutter={[12, 12]}>
                            {Object.keys(profile.contacts).map((title) => {
                                let splitTitle

                                if (serverError) {
                                    const serverErrorFieldTitle = serverError.split(/[( -> )]/)
                                    splitTitle = serverErrorFieldTitle[serverErrorFieldTitle.length - 2].toLowerCase()
                                }

                                return <Col md={6} key={title}>
                                    <p>{title}</p>
                                    {createTextField('Type url address', `contacts.${title}`, 'url', {
                                        status: splitTitle === title && 'error',
                                        placeholder: errors.contacts
                                    })}
                                </Col>
                            })}
                        </Row>
                    </Col>
                </Row>
                <div className="text-center mt-5">
                    <SubmitButton
                        type="primary"
                        size="large"
                        disabled={!dirty || isFetching }
                    >Save profile
                    </SubmitButton>
                </div>
            </Form>
        )}
    </Formik>
})

export default ProfileForm

type InputNames = keyof ProfileType

export type PropsType = {
    profile: ProfileType
    isProfileId: boolean
    isFetching: boolean
    serverError: string | null
}