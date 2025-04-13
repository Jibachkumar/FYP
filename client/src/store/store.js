import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import tripSlice from "./tripSlice.js";
import packageSlice from "./tripPackageSlice.js";
const store = configureStore({
  reducer: {
    auth: authSlice,
    trip: tripSlice,
    package: packageSlice,
  },
});

export default store;
