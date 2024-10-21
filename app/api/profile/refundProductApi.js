import AxiosConfig from "../api";

export const getRefundProductList = async (type) => {
  try {
    const response = await AxiosConfig.get(`/refund-product-list?type=${type}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestRefundApi = async (params) => {
  try {
    const response = await AxiosConfig.post(`/request/refund`, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};
