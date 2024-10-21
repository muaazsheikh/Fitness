import AxiosConfig from "../api";

export const getServiceIntroApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/terms`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getServiceIntroApi;
