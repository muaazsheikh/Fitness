import AxiosConfig from "../api";

export const sessionCreateApi = async (sessionDates) => {
  try {
    const response = await AxiosConfig.post(`/session/create`, {
      sessionDates,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sessionCreateApi;
