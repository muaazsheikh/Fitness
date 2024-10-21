import AxiosConfig from "../api";

export const sessionCreateApi = async (reservations) => {
  try {
    const response = await AxiosConfig.post(`/session/create`, reservations);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sessionCreateApi;
