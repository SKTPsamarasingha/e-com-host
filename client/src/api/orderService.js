import { API_INSTANCE } from "./axiosInstance.js";

export const orderService = {
  checkout: (data) => API_INSTANCE.post("/order/checkout", data),
};
