import React from "react";
import { setting_info } from "./API/auth";
import Routes from "./components/routes";

const App = () => {
  setting_info();
  return <Routes></Routes>;
};

export default App;
