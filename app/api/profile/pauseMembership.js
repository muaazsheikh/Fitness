import AxiosConfig from "../api";

export const getPauseMembershipDetail = async (id) => {
  try {
    const response = await AxiosConfig.get(`/my-holdings?productId=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const pauseMembershipApi = async (params) => {
  try {
    const response = await AxiosConfig.post(`/request/pause`,params);
    return response.data;
  } catch (error) {
    throw error;
  }
};
