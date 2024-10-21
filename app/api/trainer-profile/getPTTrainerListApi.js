import AxiosConfig from "../api";

export const getPTTrainerListApi = async () => {
  try {
    const response = await AxiosConfig.get(`/member/pt-trainers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getPTTrainerListApi;
