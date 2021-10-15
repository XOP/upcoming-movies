import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { Header } from '../components/features/header/Header';
import { Footer } from '../components/features/footer/Footer';

import AppRouter from "../routes/AppRouter";
import store from "../redux/configure";

import styles from "./App.module.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.app}>
          <Header />
          <AppRouter />
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
