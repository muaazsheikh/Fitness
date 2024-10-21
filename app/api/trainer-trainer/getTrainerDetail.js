import AxiosConfig from "../api";

export const getTrainerDetailApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/trainer/trainee/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getTrainerDetailApi;
