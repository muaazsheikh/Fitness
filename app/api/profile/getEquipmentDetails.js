import AxiosConfig from "../api";

export const getEquipmentDetails = async (id) => {
  try {
    const response = await AxiosConfig.get(`/equipment`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getEquipmentDetails;
