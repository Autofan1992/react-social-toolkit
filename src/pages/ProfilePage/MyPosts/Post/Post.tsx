import avatar from '../../../../assets/images/user.svg'
import { FC } from 'react'
import { useAppSelector } from '../../../../redux/hooks/hooks'
import { selectProfile } from '../../../../redux/selectors/profile-selectors'
import { Card, Col, Row } from 'antd'
import { DeleteTwoTone, LikeTwoTone } from '@ant-design/icons'
import styles from '../../ProfileInfo/ProfileInfo.module.scss'
import { selectIsDarkTheme } from '../../../../redux/selectors/app-selectors'

const Post: FC<PropsType> = ({ post, id, likePost, deletePost, likesCount }) => {
    const profile = useAppSelector(selectProfile)
    const isDarkTheme = useAppSelector(selectIsDarkTheme)

    return (
        <Card className={`${isDarkTheme ? `card-dark` : ``} mb-2`}>
            <div className="d-flex">
                <div className={styles.postAvatar}>
                    <img src={profile?.photos.small ?? avatar} className="w-100" alt=""/>
                </div>
                <div className="pb-3 px-3">{post}</div>
            </div>
            {likesCount > 0 && <p className="mt-2">Likes: {likesCount}</p>}
            <hr className="my-3"/>
            <Row gutter={30}>
                <Col>
                    <div className="d-flex align-items-center" onClick={() => likePost(id)}>
                        <LikeTwoTone className="fs-4 me-2"/>
                        <span>Like</span>
                    </div>
                </Col>
                <Col>
                    <div className="d-flex align-items-center" onClick={() => deletePost(id)}>
                        <DeleteTwoTone className="fs-4 me-2"/>
                        <span>Delete</span>
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

type PropsType = {
    post: string
    id: number
    deletePost: (id: number) => void
    likePost: (id: number) => void
    likesCount: number
}

export default Post