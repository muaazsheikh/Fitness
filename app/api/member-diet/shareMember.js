import AxiosConfig from "../api";

export const shareMemberApi = async (notes, dietLogs, id) => {
  try {
    const response = await AxiosConfig.post(`/diet-logs/rate/${id}`, {
      notes,
      dietLogs,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default shareMemberApi;
