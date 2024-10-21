import AxiosConfig from "../api";

export const getThejalNewsApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/member/news`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getThejalNewsApi;
