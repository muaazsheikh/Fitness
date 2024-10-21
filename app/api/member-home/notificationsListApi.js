import AxiosConfig from "../api";

export const notificationsListApi = async (date) => {
  try {
    const response = await AxiosConfig.get(`/notification`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default notificationsListApi;
