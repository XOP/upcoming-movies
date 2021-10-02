import { Route, Switch } from "react-router-dom";

import { AppView } from "../views/app-view/AppView";
import { MovieView } from "../views/movie-view/MovieView";

import { routeNames } from "./routes";

const AppRouter = () => {
  return (
    <Route path={routeNames.LIST}>
      <AppView />

      <Switch>
        <Route path={routeNames.ITEM} exact>
          <MovieView />
        </Route>
      </Switch>
    </Route>
  );
};

export default AppRouter;
