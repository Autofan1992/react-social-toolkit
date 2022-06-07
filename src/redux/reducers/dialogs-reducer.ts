import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DialogType, MessageType } from '../../types/dialogs-types'

const initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>,
    isFetching: false,
    error: null as string | null
}

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addMessage: (state, { payload }: PayloadAction<string>) => {}
    }
})

export const { addMessage } = dialogsSlice.actions
export default dialogsSlice.reducer