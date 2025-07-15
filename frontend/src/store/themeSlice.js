import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: true, 
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
    setTheme: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;