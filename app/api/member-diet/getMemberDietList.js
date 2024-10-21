import AxiosConfig from "../api";

export const getMemberDietListApi = async (date) => {
  try {
    const response = await AxiosConfig.get(
      `/diet-logs?date=${date}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getMemberDietListApi;
