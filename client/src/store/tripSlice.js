import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  tripData: null,
  trips: null,
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
    getTrip: (state, action) => {
      console.log(action.payload);
      state.trips = action.payload;
    },
  },
});

export const { trip, getTrip } = tripSlice.actions;
export default tripSlice.reducer;
