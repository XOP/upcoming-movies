import { createSlice } from "@reduxjs/toolkit";

// ========================================================
// Setup
// ========================================================

const initialState = {};

// ========================================================
// Slice
// ========================================================

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const movieSelector = (state, id) => {
  const movieList = state.app.movieList;
  const movie = movieList.find(m => m.id === id);

  return movie;
};

export default movieSlice.reducer;
