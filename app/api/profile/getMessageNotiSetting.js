import AxiosConfig from "../api";

export const getMessageNotiSetting = async () => {
  try {
    const response = await AxiosConfig.get(`/notification/settings`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const setMessageNotiSetting = async (data) => {
  try {
    const response = await AxiosConfig.post(`/notification/settings`,data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getMessageNotiSetting;
