import { FC } from 'react'
import { Typography } from 'antd'
import styles from './NotFound.module.scss'

const { Title } = Typography

const NotFound: FC = () => {
    return <div className={`${styles.notFound} ant-space ant-space-align-center ant-row-center`}>
        <Title>There's nothing here!</Title>
    </div>
}

export default NotFound