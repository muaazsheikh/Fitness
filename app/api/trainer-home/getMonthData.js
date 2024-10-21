import AxiosConfig from "../api";

export const getMonthDataApi = async ({month,year}) => {
  try {
    const response = await AxiosConfig.get(`/session/trainer?month=${month}&year=${year}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getMonthDataApi;
