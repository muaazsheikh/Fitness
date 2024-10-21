import AxiosConfig from "../api";
export const memberWorkoutSessionCreateApi = async (
  id,
  exerciseId,
  sets,
  feedback,
  workoutDate
) => {
  try {
    const response = await AxiosConfig.post(
      `/workout-logs/member?workoutLogId=${id}`,
      {
        exerciseId,
        sets,
        workoutLogFeedback: feedback,
        workoutDate,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default memberWorkoutSessionCreateApi;
