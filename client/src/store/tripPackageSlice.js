import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tripData: null,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    trip: (state, action) => {
      state.tripData = action.payload;
      console.log(state.tripData);
    },
  },
});

export const { trip } = packageSlice.actions;
export default packageSlice.reducer;
