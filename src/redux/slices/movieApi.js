import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_EP, API_KEY } from "../utils";

const movieDataApi = new Map([
  [API_EP, "https://imdb-api.com/en/API/Title"],
  [API_KEY, process.env.REACT_APP_IMDBAPI_KEY],
]);

const createMovieData = function createMovieData({
  image,
  runtimeStr,
  plot,
  contentRating,
  stars,
  trailer,
}) {
  return {
    length: runtimeStr,
    contentRating,
    imgSrc: image,
    summary: plot,
    castStars: stars,
    trailer,
  };
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${movieDataApi.get(API_EP)}/${movieDataApi.get(API_KEY)}`,
  }),
  reducerPath: "movieApi",
  endpoints: (build) => ({
    getMovie: build.query({
      query: (id) => `/${id}`,
      transformResponse: (response) => createMovieData(response),
    }),
  }),
});

export const { useGetMovieQuery } = api;
