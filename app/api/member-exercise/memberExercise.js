import AxiosConfig from "../api";

export const memberGraphApi = async () => {
  try {
    const response = await AxiosConfig.get(`/exercise-stats`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default memberGraphApi;
