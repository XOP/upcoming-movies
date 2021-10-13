import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Heading from "choom/lib/components/heading/Heading";
import Hold from "choom/lib/components/layout/Hold";
import Loader from "choom/lib/components/loader/Loader";

import { routeNames, createRoute } from "../../routes/routes";

import { MovieCard } from "../../components/features/movie-card/MovieCard";

import { STATUS } from "../../redux/global";

import {
  fetchMovieList,
  modalToggle,
  movieListSelector,
  statusSelector,
} from "../../redux/slices/appSlice";

const AppView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieList());
  }, [dispatch]);

  const movieList = useSelector(movieListSelector);
  const appStatus = useSelector(statusSelector);

  let prevMonth = 0;

  return (
    <Hold>
      {(appStatus === STATUS.loading || appStatus === STATUS.init) && (
        <Loader />
      )}
      {appStatus === STATUS.idle &&
        !!movieList.length &&
        movieList.map((item) => {
          const date = new Date(item.releaseDate);
          const parsedReleaseDate = date.toLocaleString("en-GB", {
            weekday: undefined,
            month: "long",
            day: "2-digit",
            year: "numeric",
          });

          const releaseMonth = date.toLocaleString("en-GB", {
            month: "long",
          });

          let month = null;

          if (releaseMonth !== prevMonth) {
            prevMonth = releaseMonth;
            month = (
              <Heading as="div" level="3" align="right" mt="2" mb="1">
                {releaseMonth}
              </Heading>
            );
          }

          return (
            <React.Fragment key={item.id}>
              {month}
              <MovieCard
                id={item.id}
                title={item.title}
                imgSrc={item.imgSrc}
                summary={item.summary}
                releaseDate={parsedReleaseDate}
                linkTo={{
                  pathname: createRoute(routeNames.ITEM, item.id),
                  state: {
                    id: item.id,
                    title: item.title,
                    releaseDate: parsedReleaseDate,
                  },
                }}
                onClick={() => dispatch(modalToggle(true))}
              />
            </React.Fragment>
          );
        })}
    </Hold>
  );
};

export { AppView };
