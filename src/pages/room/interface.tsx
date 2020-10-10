export interface IRoom {
  distance: number;
  grade: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  price: {
    adminExpenses: number;
    deposit: number;
    monthlyLease: number;
  };
  roomId: number;
  roomInfo: {
    floor: number;
    layout: number;
    roomName: string;
    scale: number;
  };
}
