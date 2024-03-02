import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import titleReducer from "./titleSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    title: titleReducer,
  },
});

export default store;
