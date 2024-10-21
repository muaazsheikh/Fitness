import AxiosConfig from "../api";

export const forgetAccountApi = async (email,cellphone) => {
  try {
    const response = await AxiosConfig.post(
      `/auth/forget-account/`,{
        email,
        cellphone
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default forgetAccountApi;
