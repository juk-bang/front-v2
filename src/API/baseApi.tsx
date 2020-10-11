import axios, { AxiosResponse, AxiosInstance } from "axios";

const baseApi: AxiosInstance = axios.create({
  baseURL: "https://jukbang.herokuapp.com/",
  timeout: 3000,
});

export default baseApi;
