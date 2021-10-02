import { useParams } from "react-router-dom";

const MovieView = () => {
  let { movie } = useParams();

  return <section>Movie: {movie}</section>;
};

export { MovieView };
