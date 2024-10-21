import AxiosConfig from "../api";
export const workoutCommentCreateApi = async (workoutLogId, comment) => {
  try {
    const response = await AxiosConfig.post(`/workout-logs/comment/${workoutLogId} `, {
      comment,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default workoutCommentCreateApi;
