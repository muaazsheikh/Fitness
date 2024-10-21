import AxiosConfig from "../api";

export const sessionHistoryRequest = async (id) => {
  try {
    const response = await AxiosConfig.get(`/session/req-confirm/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sessionHistoryRequest;
