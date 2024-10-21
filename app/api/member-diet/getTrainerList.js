import AxiosConfig from "../api";

export const getTrainerListApi = async (selectedDate) => {
  try {
    const response = await AxiosConfig.get(`/diet-logs/summary?date=${selectedDate||new Date()}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getTrainerListApi;
