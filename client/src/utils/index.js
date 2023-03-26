import axios from "axios";
import jwt_decode from "jwt-decode";

const APIurl = "http://localhost:5000/api/v1"; //"https://server-social-network-jvbg.onrender.com/api/"; // "http://localhost:5000/api/";

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
    if (!!accessToken && accessToken !== "undefined") {
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const res = await axiosPublic.post("auth/refreshToken", {
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
    } else {
      localStorage.removeItem("AT");
      localStorage.removeItem("RT");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
