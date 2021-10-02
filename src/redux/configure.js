import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./slices/appSlice";
import movieReducer from "./slices/movieSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    movie: movieReducer,
  },
});

export default store;
