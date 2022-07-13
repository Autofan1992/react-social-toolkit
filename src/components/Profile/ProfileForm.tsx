import { FC, memo } from 'react'
import { Formik } from 'formik'
import { Form, SubmitButton } from 'formik-antd'
import { createCheckbox, createTextAreaField, createTextField } from '../../helpers/CustomField'
import * as Yup from 'yup'
import { Button, Card, Col, Row } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { saveUserProfile } from '../../redux/slices/profile-slice'
import { ProfileType } from '../../types/profile-types'
import { selectIsDarkTheme } from '../../redux/selectors/app-selectors'
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
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isDarkTheme = useAppSelector(selectIsDarkTheme)

    return (
        <>
            <Button onClick={() => navigate(-1)}>Go back</Button>
            <Formik
                initialValues={
                    profile as ProfileType
                }
                validationSchema={ProfileSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    await dispatch(saveUserProfile(values))
                    setSubmitting(false)
                }}>
                {({ errors, touched, dirty }) => (
                    <Form>
                        <Row gutter={30} justify="center">
                            <Col lg={20} xl={16}>
                                <Card className={`${isDarkTheme ? `card-dark` : ``} mb-2`}>
                                    <Row gutter={[15, 15]} align="bottom">
                                        <Col xs={24} md={15}>
                                            <h3>Full name</h3>
                                            {createTextField<InputNames>('Type your full name', 'fullName', undefined, {
                                                status: (touched.fullName && errors.fullName) && 'error',
                                                placeholder: errors.fullName
                                            })}
                                        </Col>
                                        <Col md={9}>
                                            <label className="d-flex align-items-center">
                                                <h3 className="mb-0 me-3">Looking for a job</h3>
                                                {createCheckbox<InputNames>('lookingForAJob')}
                                            </label>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className={`${isDarkTheme ? `card-dark` : ``} mb-2`}>
                                    <h3>About me</h3>
                                    {createTextAreaField<InputNames>('Write about yourself', 'aboutMe', {
                                        status: (touched.aboutMe && errors.aboutMe) && 'error',
                                        placeholder: errors.aboutMe
                                    })}
                                </Card>
                                <Card className={`${isDarkTheme ? `card-dark` : ``} mb-2`}>
                                    <h3>My skills</h3>
                                    {createTextAreaField<InputNames>('Type your skills', 'lookingForAJobDescription', {
                                        status: (touched.lookingForAJobDescription && errors.lookingForAJobDescription) && 'error',
                                        placeholder: errors.lookingForAJobDescription
                                    })}
                                </Card>
                                <Card className={`${isDarkTheme ? `card-dark` : ``} mb-2`}>
                                    <h3>My socials</h3>
                                    <Row gutter={[12, 12]}>
                                        {Object.keys(profile.contacts).map((title) => {
                                            let splitTitle

                                            if (serverError) {
                                                const serverErrorFieldTitle = serverError.split(/[( -> )]/)
                                                splitTitle = serverErrorFieldTitle[serverErrorFieldTitle.length - 2].toLowerCase()
                                            }

                                            return <Col xs={24} md={6} key={title}>
                                                <p>{title}</p>
                                                {createTextField('Type url address', `contacts.${title}`, 'url', {
                                                    status: splitTitle === title && 'error',
                                                    placeholder: errors.contacts
                                                })}
                                            </Col>
                                        })}
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <div className="text-center mt-3 mt-lg-4">
                            <SubmitButton
                                type="primary"
                                size="large"
                                disabled={!dirty || isFetching}
                            >Save profile
                            </SubmitButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
})

type InputNames = keyof ProfileType

type PropsType = {
    profile: ProfileType
    isProfileId: boolean
    isFetching: boolean
    serverError: string | null
}

export default ProfileForm