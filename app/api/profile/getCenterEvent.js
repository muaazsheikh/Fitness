import AxiosConfig from "../api";

export const getCenterEventApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/member/events`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getCenterEventApi;
