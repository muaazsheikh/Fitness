import AxiosConfig from "../api";

export const getNoticeBoardApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/member/notice`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getNoticeBoardApi;
