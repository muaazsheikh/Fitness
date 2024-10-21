import AxiosConfig from "../api";

export const updateDietApi = async (dietLogDate, meal, notes, dietLogs, id,images) => {
  try {
    const response = await AxiosConfig.put(`/diet-logs/${id}`, {
      dietLogDate,
      meal,
      notes,
      dietLogs,
      images
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateDietApi;
