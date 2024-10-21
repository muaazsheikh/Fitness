import AxiosConfig from "../api";

export const getExerciseListApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/exercise`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getExerciseListApi;
