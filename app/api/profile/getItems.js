import AxiosConfig from "../api";

export const getItemInfoApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`member/items`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getItemInfoApi;
