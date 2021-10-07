import { createSlice } from "@reduxjs/toolkit";

import { STATUS } from "../global";

// ========================================================
// Setup
// ========================================================

const initialState = {
  status: STATUS.idle,
  error: null,
};

// ========================================================
// Slice
// ========================================================

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default movieSlice.reducer;
