import AxiosConfig from "../api";

export const verifyOtpApi = async (email, otp) => {
  try {
    const response = await AxiosConfig.post(`/auth/verify-otp/`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default verifyOtpApi;
