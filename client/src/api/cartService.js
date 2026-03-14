import {API_INSTANCE} from "./axiosInstance.js";

export const cartService = {
    getCart: () => API_INSTANCE.get("/cart/get"),
    addCart: (data) => API_INSTANCE.post("/cart/add", data),
    updateCart: (itemID, data) => API_INSTANCE.put(`/cart/update/item/${itemID}`, data),
    deleteCartItem: (itemID) => API_INSTANCE.delete(`/cart/delete/item/${itemID}`),
    clearCart: () => API_INSTANCE.delete(`/cart/clear`),
    checkout: () => API_INSTANCE.delete(`/cart/clear`),

};
