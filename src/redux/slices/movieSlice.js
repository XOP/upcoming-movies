import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import { STATUS } from "../global";

import { movieDataLoaded } from "./movieApi";
import { modalToggle } from "./appSlice";

// ========================================================
// Setup
// ========================================================

const initialState = {
  status: STATUS.init,
  error: null,
  movie: null,
  isCached: true,
};

// ========================================================
// Async
// ========================================================

export const fetchCache = createAsyncThunk(
  "movie/fetch",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/getTitle?id=${movieId}`);
      const data = await response.data;

      return data;
    } catch (err) {
      let error = err;

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

// ========================================================
// Slice
// ========================================================

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCache.pending]: (state) => {
      state.status = STATUS.loading;
      state.error = null;
      state.movie = null;
      state.isCached = true;
    },

    [fetchCache.rejected]: (state, action) => {
      state.status = STATUS.error;
      state.isCached = false;

      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    },

    [fetchCache.fulfilled]: (state, action) => {
      state.status = STATUS.idle;

      const data = action.payload;
      const item = data[0] || null;

      if (item) {
        // console.log("Movie is present in cache", item);

        state.movie = item;
        state.status = STATUS.done;
      } else {
        // console.log("Movie is NOT present in cache");

        state.isCached = false;
      }
    },

    [movieDataLoaded]: (state, action) => {
      const { id: movieId } = action.payload;

      if (!movieId) return;

      try {
        cacheMovieData(action.payload);
      } catch (err) {
        return err;
      }

      async function cacheMovieData(data) {
        try {
          const response = await axios.post(`/api/postTitle`, data);
          const report = await response.data;

          return report;
        } catch (err) {
          throw err;
        }
      }
    },

    [modalToggle]: (state, action) => {
      if (action.payload === false) {
        state.status = STATUS.init;
        state.error = null;
        state.movie = null;
        state.isCached = true;
      }
    }
  },
});

export const { movieCachedOn, movieCachedOff } = movieSlice.actions;

export const movieSelector = (state, id) => {
  const movieList = state.app.movieList;
  const movie = movieList.find((m) => m.id === id);

  return movie;
};

export const movieCacheSelector = (state) => state.movie.movie;
export const cacheStatusSelector = (state) => state.movie.status;
export const movieTokenSelector = (state) => state.movie.isCached;

export default movieSlice.reducer;
