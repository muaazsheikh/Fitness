import AxiosConfig from "../api";

export const sessionConfirmApi = async (paramsData) => {
  try {
    const response = await AxiosConfig.post(
      `/session/accept-reject`,
      paramsData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNotificationList = async (id) => {
  try {
    const response = await AxiosConfig.put(`/notification/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sessionConfirmApi;
