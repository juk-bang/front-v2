import React from "react";
import dotenv from "dotenv";
import GoogleMap from "comfortable-google-map-react-types";

const RoomListPresenter: React.FunctionComponent = () => {
  dotenv.config();
  return (
    <div>
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
