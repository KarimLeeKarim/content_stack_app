
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
}

export const listOfBookSlice = createSlice({
    name: 'listOfBooks',
    initialState,
    reducers: {
        setNewListOfBooks: (state, action) => {
            state.data = action.payload
        }
    },
})

export const { setNewListOfBooks } = listOfBookSlice.actions

export default listOfBookSlice.reducer