import AxiosConfig from "../api";

export const createDietApi = async (
  dietLogDate,
  meal,
  notes,
  dietLogs,
  sharedToTrainer,
  images
) => {
  try {
    const response = await AxiosConfig.post("/diet-logs", {
      dietLogDate,
      meal,
      notes,
      dietLogs,
      sharedToTrainer,
      images,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createDietApi;
