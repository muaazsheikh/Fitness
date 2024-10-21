import AxiosConfig from "../api";

const getThejalContact = async () => {
  try {
    const response = await AxiosConfig.get(`/thejal/contact`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createThejalContactApi = async (params) => {
  try {
    const response = await AxiosConfig.post(`/thejal/contact`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createThejalDeleteApi = async (id) => {
  try {
    const response = await AxiosConfig.delete(`/thejal/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createThejalEditApi = async (id, params) => {
  try {
    const response = await AxiosConfig.put(`/thejal/contact/${id}`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getThejalContactDetailByID = async (id) => {
  try {
    const response = await AxiosConfig.get(`/thejal/contact/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addCommentOnThejalContact = async (params) => {
  try {
    const response = await AxiosConfig.post(`/thejal/contact/comment`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editContactCommentApi = async (params) => {
  try {
    const response = await AxiosConfig.post(
      `/thejal/contact/edit-comment`,
      params
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteContactApi = async (params) => {
  try {
    const response = await AxiosConfig.post(
      `/thejal/contact/delete-comment`,
      params
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getThejalContact,
  createThejalContactApi,
  createThejalDeleteApi,
  createThejalEditApi,
  getThejalContactDetailByID,
  addCommentOnThejalContact,
  editContactCommentApi,
  deleteContactApi,
};
