import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAction } from "@reduxjs/toolkit";

import { API_EP, API_KEY } from "../utils";

export const movieDataLoaded = createAction("movie/data");

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
      query: ({id}) => {
        // console.log('Fetching from IMDB api', id);

        return {
          url: `/${id}`,
          method: "GET",
          redirect: "follow",
        };
      },
      transformResponse: (response) => createMovieData(response),

      // requested item goes to DB
      async onCacheEntryAdded({ id, releaseDate }, { dispatch, cacheDataLoaded }) {
        const response = await cacheDataLoaded;
        const data = response.data;

        dispatch(
          movieDataLoaded({
            id,
            releaseDate,
            ...data,
          })
        );
      },
    }),
  }),
});

export const { useGetMovieQuery } = api;
