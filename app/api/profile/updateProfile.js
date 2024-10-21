import AxiosConfig from "../api";

export const updateProfileApi = async ({
  dietLogDate,
  meal,
  notes,
  dietLogs,
  profileImages,
  email,
  name,
  phone,
}) => {
  try {
    const response = await AxiosConfig.put(`/member/me`, {
      email,
      name,
      phone,
      mProfileImg: profileImages,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateProfileApi;
