import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: [],
  reducers: {
    // similar to spread operator, for principles of immutability.
    setTitles: (_, action) => action.payload,
  },
});

export const { setTitles } = librarySlice.actions;
export default librarySlice.reducer;
