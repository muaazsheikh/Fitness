import AxiosConfig from "../api";
export const trainerRequestWriteApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/workout-logs/req-write-log/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default trainerRequestWriteApi;
