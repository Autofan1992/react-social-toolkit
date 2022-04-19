import { DialogType } from '../../../types/types'
import { FC } from 'react'
import { List } from 'antd'
import { NavLink } from 'react-router-dom'

const DialogItem: FC<DialogType> = ({ id, name }) => {
    return (
        <List.Item>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </List.Item>
    )
}

export default DialogItem