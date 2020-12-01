import React, { useEffect, useState } from "react";
import { IRoom } from "../../interface";
import { getRoomThumbnail } from "../../../../API/room";
import { AxiosPromise, AxiosResponse } from "axios";
import defaultThumbnail from "../../../../img/defaultThumbnail.jpg";
import "../../../../sass/tailwind.output.css";

interface IProps {
  room: IRoom;
}

const RoomCard: React.FunctionComponent<IProps> = (props) => {
  const [thumbnail, setThumbnail] = useState<AxiosResponse | string | null>(
    null
  );

  const roomThumbnail = async (roomId: number) => {
    const thumbnail = await getRoomThumbnail(roomId);
    setThumbnail(thumbnail);
  };

  useEffect(() => {
    roomThumbnail(props.room.roomId);
  }, []);

  return (
    <div>
      <img
        src={thumbnail === "error" ? defaultThumbnail : "정상url"}
        alt="thumbnail"
        className="w-full"
      ></img>
      <div className="bg-gray-500">{props.room.roomInfo.layout}</div>
      <div className="bg-gray-500">{props.room.grade}점</div>
      <div className="bg-gray-500">{Math.round(props.room.distance)}m</div>
      <div className="bg-gray-500">{props.room.location.address}</div>
      <div className="bg-gray-500">{props.room.roomInfo.floor}층</div>
      <div className="bg-gray-500">보증금 : {props.room.price.deposit}원</div>
      <div className="bg-gray-500">{props.room.roomInfo.scale} 평</div>
    </div>
  );
};

export default RoomCard;
