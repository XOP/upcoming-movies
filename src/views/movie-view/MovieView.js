import { useParams, useLocation } from "react-router-dom";

// import { useGetMovieQuery } from "../../redux/slices/movieApi";

const MovieView = () => {
  
  let { movie } = useParams();
  let { state } = useLocation();

  const {
    title,
    releaseDate
   } = state;

  return (
    <section id={movie}>
      <h1>{title}</h1>
      <div>Release date: {releaseDate}</div>
    </section>
  );
};

export { MovieView };
