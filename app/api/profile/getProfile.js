import AxiosConfig from "../api";

export const getProfileApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/member/me`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getProfileApi;
