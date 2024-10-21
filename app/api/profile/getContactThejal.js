import AxiosConfig from "../api";

export const getContactThejal = async (id) => {
  try {
    const response = await AxiosConfig.get(`/thejal/info`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getContactThejal;
