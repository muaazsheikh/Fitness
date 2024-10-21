import AxiosConfig from "../api";

const getBoardApis = async (type) => {
  try {
    const response = await AxiosConfig.get(`/board?type=${type}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createBoardApi = async (params) => {
  try {
    const response = await AxiosConfig.post(`/board`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteBoardApi = async (id,type) => {
  try {
    const response = await AxiosConfig.delete(`/board/${id}?type=${type}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editBoardApi = async (id, params) => {
  try {
    const response = await AxiosConfig.put(`/board/${id}`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getBoardDetailApis = async (id, type) => {
  try {
    const response = await AxiosConfig.get(`/board/${id}?type=${type}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addCommentOnBoard = async (params) => {
  try {
    const response = await AxiosConfig.post(`/board/comment`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editBoardCommentApi = async (params) => {
  try {
    const response = await AxiosConfig.put(`/board/comment`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteBoardCommentApi = async (boardId, commentId, type) => {
  try {
    const response = await AxiosConfig.delete(
      `/board/comment/${boardId}/${commentId}?type=${type}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addReplyOnComment = async (params) => {
  try {
    const response = await AxiosConfig.post(`/board/comment-replay`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export {
  getBoardApis,
  addCommentOnBoard,
  editBoardCommentApi,
  deleteBoardCommentApi,
  getBoardDetailApis,
  createBoardApi,
  deleteBoardApi,
  editBoardApi,
  addReplyOnComment

};
