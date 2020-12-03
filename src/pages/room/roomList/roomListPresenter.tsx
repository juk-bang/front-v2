import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import GoogleMap, { IMarker } from "comfortable-google-map-react-types";
import NavBar from "../../../components/NavBar";
import "../../../sass/tailwind.output.css";
import RoomCard from "./components/RoomCard";
import { IRoom } from "../interface";
import { roomUrl } from "../../../components/urls";
import Filter from "./components/Filter";
import { Link } from "react-router-dom";

interface IProps {
  rooms: Array<IRoom>;
  markers: Array<IMarker>;
  hanldeClickUserFavorites:any;
  error:boolean;
}

const RoomListPresenter: React.FunctionComponent<IProps> = (props) => {
  dotenv.config();
  if(props.error === true){
    return <div className="h-screen w-screen">
    <NavBar></NavBar>
    <div className="w-full h-full bg-green-200 flex justify-center items-center text-3xl">
      방 로딩중 오류가 발생했습니다. (방이 하나도 없음)
    </div>
    </div>
  }
  else
    return (
    <>
      <div className="h-screen w-screen">
        <NavBar></NavBar>
        <div className="w-full h-full flex pt-16">
          <div className="w-full h-full">
            {props.markers ? props.rooms ? props.markers.length == props.rooms.length ? (
              <GoogleMap
                APIKEY={String(process.env.REACT_APP_GOOGLE_MAP_KEY)}
                width={"100%"}
                height={"100%"}
                lat={37.496303}
                lng={126.957266}
                zoom={16}
                marker_list={props.markers}
              ></GoogleMap>
            ) : (
              "error"
            ) : <GoogleMap
            APIKEY={String(process.env.REACT_APP_GOOGLE_MAP_KEY)}
            width={"100%"}
            height={"100%"}
            lat={37.496303}
            lng={126.957266}
            zoom={16}
          ></GoogleMap> : <GoogleMap
          APIKEY={String(process.env.REACT_APP_GOOGLE_MAP_KEY)}
          width={"100%"}
          height={"100%"}
          lat={37.496303}
          lng={126.957266}
          zoom={16}
        ></GoogleMap>}
          </div>
          <div className="container bg-green-200 max-w-3xl h-full relative">
            <div className="w-full absolute">
              <Filter hanldeClickUserFavorites={props.hanldeClickUserFavorites}/>
            </div>
            <div className="flex flex-wrap mt-16">
              {props.rooms ? props.rooms.map((room) => {
                return (
                  <div className="w-1/3" key={room.roomId}>
                      <RoomCard room={room} />
                  </div>
                );
              }): ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomListPresenter;
