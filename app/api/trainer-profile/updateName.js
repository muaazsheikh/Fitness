import { Alert } from "react-native";
import AxiosConfig from "../api";

export const updateNameApi = async (trainerName, imageList) => {
  try {
    const response = await AxiosConfig.post(`/trainer/intro`, {
      trainerName,
      mProfileImg: imageList,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateNameApi;
