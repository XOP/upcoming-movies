import { createSlice } from "@reduxjs/toolkit";

import { STATUS } from "../global";

const initialState = {
  status: STATUS.idle,
  data: {},
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default movieSlice.reducer;
