import AxiosConfig from "../api";

export const updateBodyApi = async (
  abdominalFatPercentage,
  bmi,
  fatMass,
  fatPercentage,
  muscleMass,
  physicalDevelopmentScore,
  weight,
  id
) => {
  try {
    const response = await AxiosConfig.put(`/in-body/${id}`, {
      abdominalFatPercentage,
      bmi,
      fatMass,
      fatPercentage,
      muscleMass,
      physicalDevelopmentScore,
      weight,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateBodyApi;
