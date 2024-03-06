import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: [],
  reducers: {
    setTitles: (_, action) => action.payload,
    updateTitleStatus: (state, action) => {
      const { id, newStatus } = action.payload;

      // Find the title in the library with the specified id
      const updatedLibrary = state.map((title) =>
        title.id === id ? { ...title, status: newStatus } : title
      );

      return updatedLibrary;
    },
  },
});

export const { setTitles, updateTitleStatus } = librarySlice.actions;
export default librarySlice.reducer;
