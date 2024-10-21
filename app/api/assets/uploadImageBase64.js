import { Alert } from "react-native";
import axios from "axios";
import AxiosConfig from "../api";

export const uploadImageBase64Api = async (formData, id) => {
  try {
    const response = await AxiosConfig.post(
      `/workout-logs/confirm-workout/${id}`,
      {
        fileContent: formData,
      }
    );

    return response.data;
  } catch (error) {
    console.log("err::::", error);
    throw error;
  }
};

export default uploadImageBase64Api;
