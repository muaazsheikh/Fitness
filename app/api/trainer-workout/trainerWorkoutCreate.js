import AxiosConfig from "../api";
export const trainerWorkoutCreateApi = async (
  id,
  exerciseId,
  sets,
  feedback,
  workoutDate,
  sessionId
) => {
  try {
    const response = await AxiosConfig.post(
      `/workout-logs/trainer?workoutLogId=${id}`,
      {
        exerciseId,
        sets,
        workoutLogFeedback: feedback,
        workoutDate,
        sessionId,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default trainerWorkoutCreateApi;
