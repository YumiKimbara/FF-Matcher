import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./Router/App";
import store from "./store/index";

ReactDOM.render(
  //set Provider and pass store inside of that to enable using store in the components
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
