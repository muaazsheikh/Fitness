import AxiosConfig from "../api";

export const getDietApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/diet-logs/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getDietApi;
