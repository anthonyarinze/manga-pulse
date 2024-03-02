import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
  name: "title",
  initialState: {},
  reducers: {
    currentTitle: (state, action) => {
      return action.payload;
    },

    updateStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { currentTitle, clearTitle, updateStatus } = titleSlice.actions;
export default titleSlice.reducer;
