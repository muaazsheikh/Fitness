import AxiosConfig from "../api";

export const notificationsClearListApi = async (date) => {
  try {
    const response = await AxiosConfig.put(`/notification`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default notificationsClearListApi;
