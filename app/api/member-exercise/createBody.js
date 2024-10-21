import AxiosConfig from "../api";

export const createBodyApi = async (
  abdominalFatPercentage,
  bmi,
  fatMass,
  fatPercentage,
  muscleMass,
  physicalDevelopmentScore,
  weight,
  selectedDate
) => {
  try {
    const response = await AxiosConfig.post(`/in-body`, {
      abdominalFatPercentage,
      bmi,
      fatMass,
      fatPercentage,
      muscleMass,
      physicalDevelopmentScore,
      weight,
      regDate:selectedDate
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default createBodyApi;
