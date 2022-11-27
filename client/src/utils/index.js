import axios from "axios";
import jwt_decode from "jwt-decode";
// import { refreshToken } from "../components/User/userSlice";
// import { store } from "../redux/store";

const APIurl = "http://localhost:5000/api/";

export const axiosPublic = axios.create({
  baseURL: APIurl,
});
export const axiosPrivate = axios.create({
  baseURL: APIurl,
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage["AT"];
    let currentDate = new Date();
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const res = await axiosPublic.post("refreshToken", {
          refreshToken: localStorage["RT"],
        });
        localStorage.setItem("AT", res.data.accessToken);
        localStorage.setItem("RT", res.data.refreshToken);
        if (config?.headers) {
          config.headers["Authorization"] = `Bearer ${localStorage["AT"]}`;
        }
      } else {
        if (config?.headers) {
          config.headers["Authorization"] = `Bearer ${localStorage["AT"]}`;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
