import AxiosConfig from "../api";
export const trainerWorkoutRequestApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/workout-logs/req-confirm/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default trainerWorkoutRequestApi;
