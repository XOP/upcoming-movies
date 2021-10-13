import React from "react";
import ReactDOM from "react-dom";

import "@csstools/normalize.css";
import "choom/lib/theme/theme.module.css";
import "./index.css";

import App from "./app/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
