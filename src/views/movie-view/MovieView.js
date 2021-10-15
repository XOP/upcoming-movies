import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { routeNames } from "../../routes/routes";
import { modalToggle, statusSelector } from "../../redux/slices/appSlice";
import { useGetMovieQuery } from "../../redux/slices/movieApi";
import { movieSelector } from "../../redux/slices/movieSlice";
import { STATUS } from "../../redux/global";

import { MovieModal } from "../../components/features/movie-modal/MovieModal";

import { parseDate } from "../../utils/date";

const MovieView = () => {
  let { movie } = useParams();

  const appStatus = useSelector(statusSelector);
  const movieData = useSelector((state) => movieSelector(state, movie));

  const isAppLoading = appStatus === STATUS.loading || appStatus === STATUS.init;
  const isAppError = appStatus === STATUS.error;

  let title = '...';
  let releaseDate = '...';

  if (movieData) {
    title = movieData.title;
    releaseDate = parseDate(movieData.releaseDate);
  }

  const { data = {}, isLoading, isError } = useGetMovieQuery(movie);
  const { length, contentRating, imgSrc, summary, castStars, trailer } = data;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleModalClose = () => {
    dispatch(modalToggle(false));
    history.replace(routeNames.LIST);
  }

  return (
    <MovieModal
      id={movie}
      title={title}
      releaseDate={releaseDate}
      imgSrc={imgSrc}
      length={length}
      contentRating={contentRating}
      summary={summary}
      castStars={castStars}
      trailer={trailer}
      isLoading={isLoading || isAppLoading}
      isError={isError || isAppError}
      isOpen={true}
      onClose={handleModalClose}
    />
  );
};

export { MovieView };
