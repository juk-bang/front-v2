import React from "react";
import RoomListPresenter from "./roomListPresenter";
import { getRoomList } from "../../../API/room";
import { RouteComponentProps, withRouter } from "react-router-dom";
import queryString from "query-string";
import { IRoom } from "../interface";
import GoogleMap, { IMarker } from "comfortable-google-map-react-types";

interface IProps extends RouteComponentProps {}

interface IState {
  rooms: Array<IRoom>;
  markers: Array<IMarker>;
}

class RoomListContainer extends React.Component<IProps, IState> {
  state = {
    rooms: [],
    markers: [],
  };

  componentDidMount = async () => {
    const { univId } = queryString.parse(this.props.location.search);
    if (univId) {
      const { data } = await getRoomList(parseInt(univId.toString()));
      this.setState({
        ...this.state,
        rooms: data._embedded.rooms,
      });
      data._embedded.rooms.map((room: IRoom) => {
        this.setState({
          ...this.state,
          markers: [
            ...this.state.markers,
            {
              lat: room.location.lat,
              lng: room.location.lng,
            },
          ],
        });
      });
    }
  };

  render = () => {
    return (
      <RoomListPresenter
        rooms={this.state.rooms}
        markers={this.state.markers}
      />
    );
  };
}

export default withRouter(RoomListContainer);
