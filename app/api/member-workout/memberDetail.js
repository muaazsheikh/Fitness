import AxiosConfig from "../api";

export const memberDetailApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/workout-logs/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default memberDetailApi;
