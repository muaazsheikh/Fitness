import AxiosConfig from "../api";

const getPTClassNotiSetting = async (data) => {
  try {
    const response = await AxiosConfig.post(`/notification/alert-setting`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getPTClassNotiSetting;
