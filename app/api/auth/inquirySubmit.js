import AxiosConfig from "../api";

export const inquirySubmitApi = async (name,cellphone,email,question,content) => {
  try {
    const response = await AxiosConfig.post(
      `/auth/forget-account/`,{
        name,
        cellphone,
        email,
        question,
        content
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default inquirySubmitApi;
