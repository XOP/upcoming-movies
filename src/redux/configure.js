import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./slices/appSlice";
import movieReducer from "./slices/movieSlice";
import { api } from "./slices/movieApi";

const store = configureStore({
  reducer: {
    app: appReducer,
    movie: movieReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
});

export default store;
