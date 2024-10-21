import AxiosConfig from "../api";

export const workoutListCountSaveApi = async (exerciseIds) => {
  try {
    const response = await AxiosConfig.post("member/save-exercise", {
      exerciseIds,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const workoutListCountUnsaveApi = async (exerciseIds) => {
  try {
    const response = await AxiosConfig.post("member/unsave-exercise", {
      exerciseIds,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  workoutListCountSaveApi,
  workoutListCountUnsaveApi,
};
