import AxiosConfig from "../api";

export const getGoalsApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`goals`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getGoalsApi;
