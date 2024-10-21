import AxiosConfig from "../api";

export const memberStatisticsApi = async (type) => {
  try {
    const url = `/in-body/graph?type=${type}`;
    const response = await AxiosConfig.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default memberStatisticsApi;
