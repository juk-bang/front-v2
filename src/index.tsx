import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./sass/common.sass";
//redux를 위한 모듈
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);
