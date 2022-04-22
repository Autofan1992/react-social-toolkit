import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DialogType, MessageType } from '../../types/types'

const initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>,
    isFetching: false,
    error: null as string | null
}

const dialogsSlice = createSlice({
    name: 'dialogsReducer',
    initialState,
    reducers: {
        addMessage: (state, { payload }: PayloadAction<string>) => {
            state.messages.push({message: payload, id: state.messages.length + 1})
        }
    }
})

export const { addMessage } = dialogsSlice.actions
export default dialogsSlice.reducer