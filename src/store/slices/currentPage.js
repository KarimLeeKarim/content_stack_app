
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: 0,
    language: "en-us",
    languageActivator: true
}

export const pageLanguageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        pageChanger: (state, action) => {
            state.page = action.payload
        },
        changerLanguage: (state, action) => {
            state.language = action.payload
        },
        languageActivator: (state, action) => {
            state.languageActivator = action.payload
        },
    },
})

export const { pageChanger, changerLanguage, languageActivator } = pageLanguageSlice.actions

export default pageLanguageSlice.reducer