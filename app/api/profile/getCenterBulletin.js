import AxiosConfig from "../api";

export const getCenterBulletinApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/member/board-info`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getCenterBulletinApi;
