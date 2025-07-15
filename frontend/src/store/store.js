import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import projectsReducer from './projectsSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects : projectsReducer,
  },
});