import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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

  return (
    <section>
      {(appStatus === STATUS.loading || appStatus === STATUS.init) && (
        <div>LOADING...</div>
      )}
      {appStatus === STATUS.idle &&
        !!movieList.length &&
        movieList.map((item) => {
          return (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title}
              imgSrc={item.imgSrc}
              summary={item.summary}
              releaseDate={item.releaseDate}
              linkTo={{
                pathname: createRoute(routeNames.ITEM, item.id),
                state: {
                  id: item.id,
                  title: item.title,
                  releaseDate: item.releaseDate,
                },
              }}
              onClick={() => dispatch(modalToggle(true))}
            />
          );
        })}
    </section>
  );
};

export { AppView };
