import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { Heading } from 'wombat';

import AppRouter from "../routes/AppRouter";
import store from "../redux/configure";

import styles from './App.module.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router basename={window.location.pathname || ""}>
        <div className={styles.app}> 
          <header>
            <Heading level='2'>
              UPCOMING MOVIES
            </Heading>
          </header>
          <AppRouter />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
