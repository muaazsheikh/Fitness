import AxiosConfig from "../api";

export const getDietListApi = async (id, search,date) => {
  try {
    const response = await AxiosConfig.get(
      `/diet-logs?memberId=${id}&name=${search}&date=${date||''}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getDietListApi;
