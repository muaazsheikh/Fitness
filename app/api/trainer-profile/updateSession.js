import { Alert } from "react-native";
import AxiosConfig from "../api";

export const updateSessionApi = async (teachingApproach) => {
  try {
    const response = await AxiosConfig.post(`/trainer/intro`, {
      teachingApproach,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateSessionApi;
