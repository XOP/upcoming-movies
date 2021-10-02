import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./routes/AppRouter";

import store from "./redux/configure";

const App = () => {
  return (
    <Provider store={store}>
      <Router basename={window.location.pathname || ""}>
        <header>
          <h2>
            <u>UPCOMING MOVIES</u>
          </h2>
        </header>
        <AppRouter />
      </Router>
    </Provider>
  );
};

export default App;
