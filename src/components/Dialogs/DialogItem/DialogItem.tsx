import { FC } from 'react'
import { List } from 'antd'
import { NavLink } from 'react-router-dom'
import { DialogType } from '../../../types/dialogs-types'

const DialogItem: FC<DialogType> = ({ id, name }) => {
    return (
        <List.Item>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </List.Item>
    )
}

export default DialogItem