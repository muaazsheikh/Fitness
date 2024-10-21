import AxiosConfig from "../api";

export const centerSaveApi = async (name, address) => {
  try {
    const response = await AxiosConfig.post(`/thejal/save-center/`, {
      name,
      address,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default centerSaveApi;
