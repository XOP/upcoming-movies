import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./routes/AppRouter";

import store from "./redux/configure";

import styles from './App.module.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router basename={window.location.pathname || ""}>
        <div className={styles.app}> 
          <header>
            <h2>
              <u>UPCOMING MOVIES</u>
            </h2>
          </header>
          <AppRouter />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
