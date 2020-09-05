import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./sass/common.sass";
//redux를 위한 모듈
import { Provider } from "react-redux";
import store from "./store";
//쿠키를 위한 모듈
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById("root")
);
