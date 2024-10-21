import AxiosConfig from "../api";
export const trainerWorkoutShowApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/session/no-show/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default trainerWorkoutShowApi;
