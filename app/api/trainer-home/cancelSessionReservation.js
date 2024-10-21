import AxiosConfig from "../api";

export const cancelSessionReservation = async (data) => {
  try {
    const response = await AxiosConfig.post(`/session/cancel-booked-session/${data?.id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default cancelSessionReservation;
