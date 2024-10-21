import AxiosConfig from "../api";

export const getTrainerApi = async (search) => {
  try {
    const response = await AxiosConfig.get(
      `/trainer/trainee-summary?name=${search || ""}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getTrainerApi;
