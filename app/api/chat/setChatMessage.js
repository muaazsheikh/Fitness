import AxiosConfig from "../api";

export const setChatMessageApi = async (
  message,
  conversationId,
  files
) => {
  try {
    const response = await AxiosConfig.post(`/chat/v2/send-message`, {
      message,
      conversationId,
      files: [files],
      
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default setChatMessageApi;
