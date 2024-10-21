import AxiosConfig from "../api";

export const getWeekDataApi = async (date) => {
  try {
    const response = await AxiosConfig.get(
      `/session/get-list?date=${date ? date : ""}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getWeekDataApi;
