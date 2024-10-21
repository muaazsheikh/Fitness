import { Alert } from "react-native";
import AxiosConfig from "../api";

export const updateGoalApi = async (goals) => {
  try {
    const response = await AxiosConfig.post(`/goals`, {
      goals,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateGoalApi;
