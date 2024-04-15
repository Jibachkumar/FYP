import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import tripSlice from "./tripSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    trip: tripSlice,
  },
});

export default store;
