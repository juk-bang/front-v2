import axios, { AxiosResponse, AxiosInstance, AxiosError } from "axios";
import baseApi from "./baseApi";

export const getRoomList = (univId: number) =>
  baseApi.get(`/rooms?univId=${univId}`);

export const getRoomThumbnail = (roomId: number) =>
  baseApi
    .get(`/rooms/${roomId}/images/1`)
    .then((response: AxiosResponse<string>) => {
      return response;
    })
    .catch((error: AxiosError) => {
      return "error";
    });
