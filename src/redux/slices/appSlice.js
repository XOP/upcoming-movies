import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { STATUS } from "../global";

const movieListApi = new Map([
  ["host", "data-imdb1.p.rapidapi.com"],
  ["endpoint", "https://data-imdb1.p.rapidapi.com/movie/order/upcoming/"],
  ["key", process.env.REACT_APP_RAPIDAPI_KEY],
  ["dataKey", "Movies Upcoming"],
]);

const movieDetailsApi = new Map([
  ["host", "data-imdb1.p.rapidapi.com"],
  ["endpoint", "https://data-imdb1.p.rapidapi.com/movie/id/"],
  ["key", process.env.REACT_APP_RAPIDAPI_KEY],
  ["dataKey", "Data"],
]);

const createMovie = function createMovie({ imdb_id, title, release }) {
  return {
    id: imdb_id,
    title,
    releaseDate: release,
    summary: "",
    imgSrc: "",
  };
};

const initialState = {
  status: STATUS.init,
  error: null,
  isModal: false,
  movieList: [],
};

const mockData = {
  "Movies Upcoming": [
    {
      imdb_id: "tt10838180",
      title: "Movie 01",
      release: new Date().toLocaleString(),
    },
    {
      imdb_id: "tt1262426",
      title: "Movie 02",
      release: new Date().toLocaleString(),
    },
    {
      imdb_id: "tt4244994",
      title: "Movie 03",
      release: new Date().toLocaleString(),
    },
  ],
};

export const fetchMovieList = createAsyncThunk(
  "app/fetch",
  async (data, { rejectWithValue }) => {
    try {
      // const response = await fetch(movieListApi.get("endpoint"), {
      //   method: "GET",
      //   headers: {
      //     "x-rapidapi-host": movieListApi.get("host"),
      //     "x-rapidapi-key": movieListApi.get("key"),
      //   },
      // });

      // const data = await response.json();

      const mock = new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 1000);
      });

      const data = await mock;
      const list = data[movieListApi.get("dataKey")];

      const movieData = list.map((item) => createMovie(item));

      return Promise.allSettled(
        movieData.map(async (item) => {
          const response = await fetch(movieDetailsApi.get("endpoint") + item.id + '/', {
            method: "GET",
            headers: {
              "x-rapidapi-host": movieDetailsApi.get("host"),
              "x-rapidapi-key": movieDetailsApi.get("key"),
            },
          });

          const data = await response.json();
          const details = data[movieDetailsApi.get("dataKey")];

          const imgSrc = details.image_url.indexOf('https://') === -1 ? '' : details.image_url;

          return {
            ...item,
            summary: details.plot,
            imgSrc: imgSrc
          }
        })
      );
    } catch (err) {
      let error = err;

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {},

  extraReducers: {
    [fetchMovieList.pending]: (state, action) => {
      state.status = STATUS.loading;
    },

    [fetchMovieList.rejected]: (state, action) => {
      state.status = STATUS.error;

      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    },

    [fetchMovieList.fulfilled]: (state, action) => {
      state.status = STATUS.idle;
      state.movieList = action.payload.map(item => item.value);
    },
  },
});

export const statusSelector = (state) => state.app.status;
export const errorSelector = (state) => state.app.error;
export const isModalSelector = (state) => state.app.isModal;
export const movieListSelector = (state) => state.app.movieList;

export default appSlice.reducer;
