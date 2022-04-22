import { FC } from 'react'
import { Pagination } from 'antd'

const Paginator: FC<PropsType> = ({ onPageChange, currentPage, totalItemsCount, pageSize, disabled }) =>
    <Pagination
        defaultPageSize={pageSize}
        current={currentPage}
        total={totalItemsCount}
        onChange={onPageChange}
        disabled={disabled}
        pageSizeOptions={[5, 10, 15, 20]}
        style={{
            textAlign: 'center',
            margin: '50px 0 0'
        }}
    />

export default Paginator

type PropsType = {
    pageSize: number
    currentPage: number
    disabled: boolean
    totalItemsCount: number
    onPageChange: (pageNum: number, pageSize: number) => void
}