import AxiosConfig from "../api";

export const reserveRequestApi = async (date) => {
  try {
    const response = await AxiosConfig.get(`/session/reserve-req`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default reserveRequestApi;
