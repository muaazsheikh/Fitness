import AxiosConfig from "../api";

export const getChatApi = async (id,page) => {
  try {
    // const response = await AxiosConfig.get(`/chat/${id}?type=${type}&pageSize=${10}&page=${page}`);
    const response = await AxiosConfig.get(`/chat/${id}?type=${4}&pageSize=${1000}&page=${page}`);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getChatApi;
