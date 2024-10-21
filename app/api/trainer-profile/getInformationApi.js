import AxiosConfig from "../api";

export const getInformationApi = async () => {
  try {
    const response = await AxiosConfig.get(`/trainer/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getInformationApi;
