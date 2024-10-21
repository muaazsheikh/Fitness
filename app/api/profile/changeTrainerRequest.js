import AxiosConfig from "../api";

export const getAllTrainersList = async (id) => {
  try {
    const response = await AxiosConfig.get(`/trainer-list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestChangeTrainerApi = async (params) => {
  try {
    const response = await AxiosConfig.post(`/request/change-trainer`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};
