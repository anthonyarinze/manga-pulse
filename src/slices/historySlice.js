import { createSlice } from "@reduxjs/toolkit";

const storedHistory = JSON.parse(localStorage.getItem("history")) || [];

const historySlice = createSlice({
  name: "history",
  initialState: storedHistory,
  reducers: {
    addToHistory: (state, action) => {
      // ensure title not in history
      if (!state.some((title) => title.id === action.payload.id)) {
        // add title to the beginning of history page
        state.unshift(action.payload);
      }
    },
  },
  clearHistory: (state) => {
    state.length = 0;
    localStorage.removeItem("history");
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;

export default historySlice.reducer;
