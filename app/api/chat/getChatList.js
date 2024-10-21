import AxiosConfig from "../api";

export const getChatListApi = async () => {
  try {
    const response = await AxiosConfig.get(`/chat`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getChatListApi;
