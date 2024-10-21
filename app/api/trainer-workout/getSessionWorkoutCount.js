import AxiosConfig from "../api";

export const getSessionWorkoutCountApi = async (id,month,year) => {
  try {
    const response = await AxiosConfig.get(`session/calender/${id}?month=${month}&year=${year}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getSessionWorkoutCountApi;
