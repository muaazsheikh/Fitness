import { Alert } from "react-native";
import AxiosConfig from "../api";

export const updateInformationApi = async (trainerIntroduction) => {
  try {
    const response = await AxiosConfig.post(`/trainer/intro`, {
      trainerIntroduction,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateInformationApi;
