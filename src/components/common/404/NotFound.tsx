import { FC } from 'react'
import { Typography } from 'antd'

const { Title } = Typography

const NotFound: FC = () => {
    return <div className="ant-space ant-space-align-center ant-row-center" style={{
        width: '100%',
        height: '100%'
    }}>
        <Title>There's nothing here!</Title>
    </div>
}

export default NotFound