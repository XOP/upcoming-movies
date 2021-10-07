import { useParams, useLocation } from "react-router-dom";

import { MovieModal } from "../../components/features/movie-modal/MovieModal";

import { useGetMovieQuery } from "../../redux/slices/movieApi";

const MovieView = () => {
  let { movie } = useParams();
  let { state } = useLocation();

  const { title, releaseDate } = state;

  const { data = {}, isLoading, isError } = useGetMovieQuery(movie);
  const { length, contentRating, imgSrc, summary, castStars, trailer } = data;

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
    />
  );
};

export { MovieView };
