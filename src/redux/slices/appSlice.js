import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { STATUS, LIST_LIMIT } from "../global";
import { mockFetch } from "../utils";

// ========================================================
// Setup
// ========================================================

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
    releaseDate: Date.parse(release),
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

const mockMovieList = () => ({
  "Movies Upcoming": [
    {
      imdb_id: "tt10838180",
      title: "Movie 01",
      release: "2021-11-10",
    },
    {
      imdb_id: "tt1262426",
      title: "Movie 02",
      release: "2020-10-10",
    },
    {
      imdb_id: "tt4244994",
      title: "Movie 03",
      release: "2021-11-20",
    },
  ],
});

const mockMovieDetails = () => {
  const data = [
    {
      plot: "Landjaeger short loin ribeye beef ribs shankle, doner spare ribs shoulder ground",
      image_url: "http://placekitten.com/200/",
    },
    {
      plot: "Jowl pork rump cupim strip steak",
      image_url: "http://placekitten.com/200/",
    },
    {
      plot: "Kevin pork belly strip steak doner, turkey pork",
      image_url: "http://placekitten.com/200/",
    },
    {
      plot: "Meatball leberkas shankle cow brisket landjaeger hamburger andouille",
      image_url: "http://placekitten.com/200/",
    },
    {
      plot: "Pancetta jerky short ribs, kevin frankfurter...",
      image_url: "http://placekitten.com/200/",
    },
  ][Math.round(Math.random(5))];

  return {
    Data: data,
  };
};

// ========================================================
// Async
// ========================================================

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

      const data = await mockFetch(mockMovieList, 500);
      
      const list = data[movieListApi.get("dataKey")];
      const listSize = list.length;

      let movieData = list.map((item) => createMovie(item));

      // sort by date, ascending order (closest date first)
      movieData.sort((a, b) => a.releaseDate - b.releaseDate);

      // limiting the output
      movieData = movieData.slice(0, Math.min(listSize, LIST_LIMIT));

      const finalMovieData = await Promise.allSettled(
        movieData.map(async (item) => {
          // const response = await fetch(`${movieDetailsApi.get("endpoint")}${item.id}/`, {
          //   method: "GET",
          //   headers: {
          //     "x-rapidapi-host": movieDetailsApi.get("host"),
          //     "x-rapidapi-key": movieDetailsApi.get("key"),
          //   },
          // });

          // const data = await response.json();

          const data = await mockFetch(mockMovieDetails, 1000);

          const details = data[movieDetailsApi.get("dataKey")];

          // taking care of some API discrepancies
          const imgSrc =
            details.image_url.indexOf("http") === -1
              ? ""
              : details.image_url;

          return {
            ...item,
            summary: details.plot,
            imgSrc: imgSrc,
          };
        })
      );

      // TODO: handle rejected values
      return finalMovieData;
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
      state.movieList = action.payload.map((item) => item.value);
    },
  },
});

export const statusSelector = (state) => state.app.status;
export const errorSelector = (state) => state.app.error;
export const isModalSelector = (state) => state.app.isModal;
export const movieListSelector = (state) => state.app.movieList;

export default appSlice.reducer;
