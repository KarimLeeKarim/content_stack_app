import { configureStore } from '@reduxjs/toolkit';
import currentPageSlice from './slices/currentPage.js';
import listOfBookSlice from './slices/listOfBookSlice.js';

export const store = configureStore({
  reducer: {
    currentPage: currentPageSlice,
    allBooks: listOfBookSlice
  },
})