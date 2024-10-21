import AxiosConfig from "../api";

export const memberSummaryApi = async (search) => {
  try {
    const response = await AxiosConfig.get(
      `/workout-logs/summary?name=${search || ""}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default memberSummaryApi;
