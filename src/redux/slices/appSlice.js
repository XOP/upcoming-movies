import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import { STATUS, LIST_LIMIT, LIST_CAP } from "../global";
import { API_EP, API_HOST, API_KEY, API_PARAMS, DATA_KEY } from "../utils";

// import { mockFetch } from "../utils";

// ========================================================
// Setup
// ========================================================

const currentYear = new Date().getFullYear();

const movieListApi = new Map([
  [API_HOST, "data-imdb1.p.rapidapi.com"],
  [API_EP, "https://data-imdb1.p.rapidapi.com/titles/x/upcoming/"],
  [API_PARAMS, {
    titleType: "movie",
    info: "mini_info",
    limit: LIST_CAP,
    startYear: currentYear,
    endYear: currentYear,
  }],
  [API_KEY, process.env.REACT_APP_RAPIDAPI_KEY],
  [DATA_KEY, "results"],
]);

const movieDetailsApi = new Map([
  [API_HOST, "data-imdb1.p.rapidapi.com"],
  [API_EP, "https://data-imdb1.p.rapidapi.com/titles/"],
  [API_PARAMS, {
    info: "base_info",
  }],
  [API_KEY, process.env.REACT_APP_RAPIDAPI_KEY],
  [DATA_KEY, "results"],
]);

const createMovieSummary = function createMovieSummary({
  id,
  titleText,
  releaseDate: {year, month, day},
}) {
  return {
    id,
    title: titleText?.text,
    releaseDate: Date.UTC(year, month, day),
    summary: "",
    imgSrc: "",
  };
};

const createMovieDetails = function createMovieDetails(item, details) {
  const {
    primaryImage,
    plot,
  } = details;

  // taking care of some API discrepancies
  // unfortunately some proper urls still won't work
  const url = primaryImage?.url;
  const imgSrc = (url && (url.indexOf("http") === -1 ? "" : url)) || "";

  return {
    ...item,
    summary: plot?.plotText?.plainText,
    imgSrc,
    imgWidth: primaryImage?.width || -1, 
    imgHeight: primaryImage?.height || -1
  };
};

const initialState = {
  status: STATUS.init,
  error: null,
  isModal: false,
  movieList: [],
};

// const mockMovieList = () => ({
//   "results": [
//     {
//       imdb_id: "tt10838180",
//       title: "Movie 01",
//       release: "2021-11-10",
//     },
//     {
//       imdb_id: "tt1262426",
//       title: "Movie 02",
//       release: "2020-10-10",
//     },
//     {
//       imdb_id: "tt4244994",
//       title: "Movie 03",
//       release: "2021-11-20",
//     },
//   ],
// });

// const mockMovieDetails = () => {
//   const data = [
//     {
//       plot: "Landjaeger short loin ribeye beef ribs shankle, doner spare ribs shoulder ground",
//       image_url: "http://placekitten.com/200/",
//     },
//     {
//       plot: "Jowl pork rump cupim strip steak",
//       image_url: "http://placekitten.com/200/",
//     },
//     {
//       plot: "Kevin pork belly strip steak doner, turkey pork",
//       image_url: "http://placekitten.com/200/",
//     },
//     {
//       plot: "Meatball leberkas shankle cow brisket landjaeger hamburger andouille",
//       image_url: "http://placekitten.com/200/",
//     },
//     {
//       plot: "Pancetta jerky short ribs, kevin frankfurter...",
//       image_url: "http://placekitten.com/200/",
//     },
//   ][Math.round(Math.random(5))];

//   return {
//     results: data,
//   };
// };

// ========================================================
// Async
// ========================================================

export const fetchMovieList = createAsyncThunk(
  "app/fetch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(movieListApi.get(API_EP), {
        headers: {
          "x-rapidapi-host": movieListApi.get(API_HOST),
          "x-rapidapi-key": movieListApi.get(API_KEY),
        },
        params: movieListApi.get(API_PARAMS),
      });

      const data = await response.data;

      // const data = await mockFetch(mockMovieList, 500);

      const list = data[movieListApi.get(DATA_KEY)];
      const listSize = list.length;

      let movieData = list.map((item) => createMovieSummary(item));

      // sort by date, ascending order (closest date first)
      movieData.sort((a, b) => a.releaseDate - b.releaseDate);

      // limiting the output
      movieData = movieData.slice(0, Math.min(listSize, LIST_LIMIT));

      const finalMovieData = await Promise.allSettled(
        movieData.map(async (item) => {
          const response = await axios.get(
            `${movieDetailsApi.get(API_EP)}${item.id}/`,
            {
              headers: {
                "x-rapidapi-host": movieDetailsApi.get(API_HOST),
                "x-rapidapi-key": movieDetailsApi.get(API_KEY),
              },
              params: movieDetailsApi.get(API_PARAMS),
            }
          );

          const data = await response.data;

          // const data = await mockFetch(mockMovieDetails, 1000);

          const details = data[movieDetailsApi.get(DATA_KEY)];

          return createMovieDetails(item, details);
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

  reducers: {
    modalToggle(state, action) {
      state.isModal = action.payload;

      const body = document.querySelector("body");

      if (action.payload) {
        body?.classList.add("no-scroll");
      } else {
        body?.classList.remove("no-scroll");
      }
    },
  },

  extraReducers: {
    [fetchMovieList.pending]: (state) => {
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

export const { modalToggle } = appSlice.actions;

export const statusSelector = (state) => state.app.status;
export const errorSelector = (state) => state.app.error;
export const movieListSelector = (state) => state.app.movieList;

export default appSlice.reducer;
