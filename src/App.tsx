import React from "react";
import Routes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";
import Context from "./components/Context";

function App() {
  return (
    <BrowserRouter>
      <Context></Context>
    </BrowserRouter>
  );
}

export default App;
