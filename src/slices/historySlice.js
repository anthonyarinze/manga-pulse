import { createSlice } from "@reduxjs/toolkit";

const storedHistory = JSON.parse(localStorage.getItem("history")) || [];

const historySlice = createSlice({
  name: "history",
  initialState: storedHistory,
  reducers: {
    addToHistory: (state, action) => {
      // // Check if the title with the same id already exists
      // const existingTitle = state.find((title) => title.id === id);

      // // If not, add it to the history
      // if (!existingTitle) {
      //   state.unshift({ id, titleName });
      //   localStorage.setItem("history", JSON.stringify(state));

      if (!state.some((title) => title.id === action.payload)) {
        state.unshift(action.payload);
        localStorage.setItem("history", JSON.stringify(state));
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
