import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import titleReducer from "./titleSlice";
import libraryReducer from "./librarySlice";
import modalReducer from "./modalSlice";
import historyReducer from "./historySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    title: titleReducer,
    library: libraryReducer,
    modal: modalReducer,
    history: historyReducer,
  },
});

export default store;
