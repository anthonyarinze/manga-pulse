import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import titleReducer from "./titleSlice";
import libraryReducer from "./librarySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    title: titleReducer,
    library: libraryReducer,
  },
});

export default store;
