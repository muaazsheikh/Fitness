import AxiosConfig from "../api";

export const memberShareTrainerApi = async (id) => {
  try {
    const response = await AxiosConfig.get(
      `/workout-logs/share-to-trainer/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default memberShareTrainerApi;
