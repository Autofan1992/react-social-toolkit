import { FC, memo } from 'react'
import { Pagination } from 'antd'
import styles from './Paginator.module.scss'

const Paginator: FC<PropsType> = memo(({ onPageChange, currentPage, totalItemsCount, pageSize, disabled }) => {
    return <Pagination
        className={styles.paginator}
        defaultPageSize={pageSize}
        current={currentPage}
        total={totalItemsCount}
        onChange={onPageChange}
        disabled={disabled}
        pageSizeOptions={[5, 10, 15, 20]}
    />
})

type PropsType = {
    pageSize: number
    currentPage: number
    term?: string | undefined
    disabled: boolean
    totalItemsCount: number
    onPageChange: (pageNum: number, pageSize: number) => void
}

export default Paginator