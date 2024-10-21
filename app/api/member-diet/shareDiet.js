import AxiosConfig from "../api";

export const shareDietApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/diet-logs/share/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default shareDietApi;
