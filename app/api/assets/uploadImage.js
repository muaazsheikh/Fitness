import { Alert } from "react-native";
import AxiosConfig from "../api";

export const uploadImageApi = async (formData) => {
  try {
    const response = await AxiosConfig.post(`/assets/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("err::::", error);
    throw error;
  }
};

export default uploadImageApi;
