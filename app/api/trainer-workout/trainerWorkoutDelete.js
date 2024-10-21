import AxiosConfig from "../api";
export const trainerWorkoutDeleteApi = async (id) => {
  try {
    const response = await AxiosConfig.delete(`/workout-logs/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default trainerWorkoutDeleteApi;
