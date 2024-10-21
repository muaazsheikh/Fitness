import AxiosConfig from "../api";

export const getPreferredExerciseApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`prefer-exercises`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getPreferredExerciseApi;
