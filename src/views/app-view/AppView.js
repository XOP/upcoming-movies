import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { MovieCard } from "../../components/features/movie-card/MovieCard";

import { STATUS } from "../../redux/global";

import {
  fetchMovieList,
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
              title={item.title}
              imgSrc={item.imgSrc}
              summary={item.summary}
            />
          );
        })}

      <hr />
      <Link to="/movie/id12">Movie 12</Link>
    </section>
  );
};

export { AppView };