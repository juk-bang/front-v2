import React from "react";
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
