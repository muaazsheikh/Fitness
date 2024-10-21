import AxiosConfig from "../api";

export const getTrainerCountApi = async (selectedDate) => {
  try {
    const response = await AxiosConfig.get(`session/count?date=${selectedDate?selectedDate:''}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getTrainerCountApi;
