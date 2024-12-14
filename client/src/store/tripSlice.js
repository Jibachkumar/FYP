import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  tripData: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    trip: (state, action) => {
      console.log(action.payload); // Log tripData
      state.status = true;
      state.tripData = action.payload;
    },
  },
});

export const { trip } = tripSlice.actions;
export default tripSlice.reducer;
