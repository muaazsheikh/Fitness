import AxiosConfig from "../api";

export const getTraineeDataApi = async (search) => {
  try {
    const response = await AxiosConfig.get(`/trainer/trainee?name=${search||''}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getTraineeDataApi;
