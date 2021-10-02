import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./routes/AppRouter";

import store from "./redux/configure";

const App = () => {
  return (
    <Provider store={store}>
      <Router basename={window.location.pathname || ''}>
          <AppRouter />
      </Router>
    </Provider>
  );
}

export default App;

