import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
            <article key={item.id}>
              <h2>{item.title}</h2>
              {!!item.imgSrc && (
                <img src={item.imgSrc} height="128px" alt="Movie preview" />
              )}
              <code>{item.summary}</code>
            </article>
          );
        })}

      <hr />
      <Link to="/movie/id12">Movie 12</Link>
    </section>
  );
};

export { AppView };
