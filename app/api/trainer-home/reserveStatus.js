import AxiosConfig from "../api";

export const reserveStatusApi = async (date) => {
  try {
    const response = await AxiosConfig.get(`/session/status?date=${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default reserveStatusApi;
