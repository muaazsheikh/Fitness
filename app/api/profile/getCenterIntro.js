import AxiosConfig from "../api";

export const getCenterIntroApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/member/center-introduction`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getCenterIntroApi;
