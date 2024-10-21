import AxiosConfig from "../api";

export const gymSelectApi = async (selectedRole, selectedItem) => {
  try {
    const response = await AxiosConfig.get(
      `/gym/select/${selectedItem}?role=${selectedRole}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default gymSelectApi;
