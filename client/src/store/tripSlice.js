import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  tripData: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    trip: (state, action) => {
      console.log(action.payload.tripData); // Log tripData
      state.status = true;
      state.tripData = action.payload.tripData;
    },
  },
});

export const { trip } = tripSlice.actions;
export default tripSlice.reducer;
