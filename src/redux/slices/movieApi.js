import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const movieDataApi = new Map([
  ["host", "imdb-internet-movie-database-unofficial.p.rapidapi.com"],
  [
    "endpoint",
    "https://imdb-internet-movie-database-unofficial.p.rapidapi.com",
  ],
  ["key", process.env.REACT_APP_RAPIDAPI_KEY],
]);

const createMovieData = function createMovieData({
  length = "",
  rating = "",
  poster,
  plot,
  trailer = {},
}) {
  return {
    length,
    rating,
    imgSrc: poster,
    summary: plot,
    trailer,
  };
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: movieDataApi.get("endpoint"),
    prepareHeaders: (headers, { getState }) => {
      headers.set("x-rapidapi-host", movieDataApi.get("host"));
      headers.set("x-rapidapi-key", movieDataApi.get("key"));

      return headers;
    },
  }),
  reducerPath: "movieApi",
  endpoints: (build) => ({
    getMovie: build.query({
      query: (id) => `/film/${id}`,
      transformResponse: (response) => createMovieData(response),
    }),
  }),
});

export const { useGetMovieQuery } = api;
