import { Route, Switch, Link, useParams } from "react-router-dom";
import { routeNames } from "./routes";

const MovieItem = () => {
  let { movie } = useParams();

  return <div>Movie Item: {movie}</div>;
};

const MovieList = () => {
  return (
    <section>
      <div>Movie List</div>

      <Link to={routeNames.LIST}>Back to List</Link>
      <br />
      <br />
      <Link to='/movie/id12'>Movie 12</Link>
      <br />
      <Link to='/movie/id13'>Movie 13</Link>
      
      <hr />

      <Switch>
        <Route path={routeNames.ITEM} exact>
          <MovieItem />
        </Route>
      </Switch>
    </section>
  );
};

const AppRouter = () => {
  return (
    <Switch>
      <Route path={routeNames.LIST}>
        <MovieList />
      </Route>
    </Switch>
  );
};

export default AppRouter;
