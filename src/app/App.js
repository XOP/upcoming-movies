import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Heading from "wombat/dist/components/heading/Heading";

import AppRouter from "../routes/AppRouter";
import store from "../redux/configure";

import styles from "./App.module.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router basename={window.location.pathname || ""}>
        <div className={styles.app}>
          <header>
            <Heading level="2" as="h1" mt="1" mb="1">
              Coming up...
            </Heading>
          </header>
          <AppRouter />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
