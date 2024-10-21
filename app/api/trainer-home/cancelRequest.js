import AxiosConfig from "../api";

export const cancelRequestApi = async (date) => {
  try {
    const response = await AxiosConfig.get(`/session/cancel-req`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default cancelRequestApi;
