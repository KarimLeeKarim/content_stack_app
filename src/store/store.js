import { configureStore } from '@reduxjs/toolkit';
import pageLanguageSlice from './slices/currentPage.js';
import listOfBookSlice from './slices/listOfBookSlice.js';

export const store = configureStore({
  reducer: {
    currentPage: pageLanguageSlice,
    allBooks: listOfBookSlice
  },
})