import AxiosConfig from "../api";

export const trainerShareMemberApi = async (id) => {
  try {
    const response = await AxiosConfig.get(
      `/workout-logs/share-to-member/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default trainerShareMemberApi;
