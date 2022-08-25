
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: 0,
    language: "en-us"
}

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        pageChanger: (state, action) => {
            state.page = action.payload
        },
        changerLanguage: (state, action) => {
            state.language = action.payload
        },
    },
})

export const { pageChanger, changerLanguage } = currentPageSlice.actions

export default currentPageSlice.reducer