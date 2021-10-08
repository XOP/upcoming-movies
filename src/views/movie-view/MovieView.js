import { useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";

import { routeNames } from "../../routes/routes";
import { MovieModal } from "../../components/features/movie-modal/MovieModal";
import { modalToggle } from "../../redux/slices/appSlice";

import { useGetMovieQuery } from "../../redux/slices/movieApi";

const MovieView = () => {
  let { movie } = useParams();
  let { state } = useLocation();

  const { title, releaseDate } = state;

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
      isLoading={isLoading}
      isError={isError}
      isOpen={true}
      onClose={handleModalClose}
    />
  );
};

export { MovieView };
