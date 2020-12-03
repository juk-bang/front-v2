import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { get_cookie } from "./cookie";

const baseApi: AxiosInstance = axios.create({
  baseURL: "https://jukbangapi.paas-ta.org/",
  timeout: 3000,
});

baseApi.interceptors.request.use(function(config :AxiosRequestConfig){
  const accessToken :string | null = get_cookie("accessToken");
  if(accessToken !== null){
    config.headers.Authorization = `Bearer ${accessToken}`;
  }else{
    delete config.headers.Authorization;
  }
  return config;
}, function(err :AxiosError){
  console.log(err);
}
);
export default baseApi;
