import axios from "axios";
import StorageService from "../services/storage";

const AxiosConfig = axios.create({
  baseURL: "http://44.215.62.250:5000",
  // baseURL: "http://18.232.101.40:5000/",
});

AxiosConfig.interceptors.request.use(
  async (res) => {
    const data = await StorageService.getUser();
    const result = JSON.parse(data);
    // console.log(result.token);
    if (result) {
      res.headers.Authorization = "Bearer " + result.token;
    }
    return res;
  },

  (error) => {
    Promise.reject(error);
  }
);

export default AxiosConfig;
