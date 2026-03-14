import {API_INSTANCE} from "./axiosInstance.js";


export const productService = {
    getProducts: (filter) => API_INSTANCE.get("/products/filter", {params: filter}),
    getAll: () => API_INSTANCE.get("/products/all")

};

