import React from "react";
import RoomListPresenter from "./roomListPresenter";
import { getRoomList, getFavoriteRooms } from "../../../API/room";
import { RouteComponentProps, withRouter } from "react-router-dom";
import queryString from "query-string";
import { IRoom } from "../interface";
import { IMarker } from "comfortable-google-map-react-types";

interface IProps extends RouteComponentProps {}

interface IState {
  rooms: Array<IRoom>;
  markers: Array<IMarker>;
  favorties:any;
  error: boolean;
}

class RoomListContainer extends React.Component<IProps, IState> {
  state = {
    rooms: [],
    markers: [],
    favorties: false,
    error:false
  };

  componentDidMount = async () => {
    const { univId } = queryString.parse(this.props.location.search);
    if (univId) {
      const { data } = await getRoomList(parseInt(univId.toString()));
      if(!data._embedded){
        this.setState({
          ...this.state,
          error:true
        })
        return;
      }
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
    const getFavoriteRoomData = async () =>{
      const { data } = await getFavoriteRooms();
      this.setState({
        ...this.state,
        rooms: data.data,
      });
      if(data){
        data.map((room: IRoom) => {
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
    }

    const hanldeClickUserFavorites = (e:any) => {
      if(this.state.favorties){
        this.setState({
          ...this.state,
          favorties:false
        })
        this.componentDidMount();
      } else {
        this.setState({
          ...this.state,
          favorties:true
        })
        getFavoriteRoomData();
      }

    }

    return (
      <RoomListPresenter
        rooms={this.state.rooms}
        markers={this.state.markers}
        hanldeClickUserFavorites={hanldeClickUserFavorites}
        error={this.state.error}
      />
    );
  };
}

export default withRouter(RoomListContainer);
