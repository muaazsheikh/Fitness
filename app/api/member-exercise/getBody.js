import AxiosConfig from "../api";

export const getBodyApi = async () => {
  try {
    const response = await AxiosConfig.get(`/in-body?date=`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getBodyApi;
