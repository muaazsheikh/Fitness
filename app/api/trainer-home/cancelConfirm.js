import AxiosConfig from "../api";

export const cancelConfirmApi = async (paramsData) => {
  try {
    const response = await AxiosConfig.post(
      `/session/cancel-request`,
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

export default cancelConfirmApi;
