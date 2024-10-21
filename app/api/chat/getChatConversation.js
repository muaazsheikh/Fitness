import AxiosConfig from "../api";

export const getChatConversationApi = async (receiverId,receiverType) => {
  try {
    const response = await AxiosConfig.post(`/chat/get-conversation`,{
         receiverId,
        receiverType,
        type: 4
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getChatConversationApi;
