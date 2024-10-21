import AxiosConfig from "../api";

export const removeTrainerNotesApi = async (memberID,id) => {
  try {
    const response = await AxiosConfig.delete(`/trainer-notes/${memberID}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default removeTrainerNotesApi;
