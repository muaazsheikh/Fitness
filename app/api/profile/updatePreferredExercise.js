import AxiosConfig from "../api";

export const updatePreferredExerciseApi = async (preferExercises) => {
  try {
    const response = await AxiosConfig.post(`/prefer-exercises`, {
      preferExercises,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default updatePreferredExerciseApi;
