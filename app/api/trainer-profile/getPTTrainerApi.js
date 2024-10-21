import AxiosConfig from "../api";

export const getPTTrainerApi = async (id) => {
  try {
    const response = await AxiosConfig.get(`/pt-trainer-intro/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getPTTrainerApi;
