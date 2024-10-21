import AxiosConfig from "../api";

export const getTrainerDetailApi = async () => {
  try {
    const response = await AxiosConfig.get(`/pre-session-details`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getTrainerDetailApi;
