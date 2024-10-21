import AxiosConfig from "../api";
export const workoutNoteCreateApi = async (workoutLogId, note) => {
  try {
    const response = await AxiosConfig.post(`/workout-logs/save-note`, {
      workoutLogId,
      note,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const workoutNoteDiscardApi = async (workoutId) => {
  try {
    const response = await AxiosConfig.post(`/workout-logs/discard`, {
      workoutId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default workoutNoteCreateApi;
