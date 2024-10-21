import AxiosConfig from "../api";

export const getSessionWorkoutCountApi = async (month, year) => {
  try {
    const response = await AxiosConfig.get(
      `session/calender?month=${month}&year=${year}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getSessionWorkoutCountApi;
