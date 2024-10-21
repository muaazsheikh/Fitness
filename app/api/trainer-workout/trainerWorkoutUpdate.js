import AxiosConfig from "../api";
export const trainerWorkoutUpdateApi = async (
  id,
  exerciseId,
  sets,
  feedback,
  workoutDate
) => {
  try {
    const response = await AxiosConfig.put(`/workout-logs/${id}`, {
      exerciseId,
      sets,
      workoutLogFeedback: feedback,
      workoutDate,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default trainerWorkoutUpdateApi;
