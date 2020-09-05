import React from "react";
import dotenv from "dotenv";
import GoogleMap from "comfortable-google-map-react-types";
import store from "../../../store";
import NavBar from "../../../components/NavBar";

const RoomListPresenter: React.FunctionComponent = () => {
  dotenv.config();

  return (
    <div>
      <NavBar></NavBar>
      <GoogleMap
        APIKEY={String(process.env.REACT_APP_GOOGLE_MAP_KEY)}
        width={900}
        height={500}
        lat={37.496303}
        lng={126.957266}
        zoom={16}
      ></GoogleMap>
    </div>
  );
};

export default RoomListPresenter;
