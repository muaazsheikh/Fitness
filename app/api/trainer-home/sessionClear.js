import AxiosConfig from "../api";

export const sessionClearApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/session/seen/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sessionClearApi;
