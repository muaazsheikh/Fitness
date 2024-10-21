import AxiosConfig from "../api";

export const loginApi = async (email, provider,token) => {
  try {
    const response = await AxiosConfig.post("/auth/login", { email, provider,token });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default loginApi;
