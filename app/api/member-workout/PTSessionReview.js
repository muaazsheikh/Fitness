import AxiosConfig from "../api";

export const PTSessionReview = async (data) => {
  try {
    const response = await AxiosConfig.post(`/session/review`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default PTSessionReview;
