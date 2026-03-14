import {API_INSTANCE, AUTH_INSTANCE} from "./axiosInstance.js";


export const authService = {
    login: (credentials) => AUTH_INSTANCE.post("/users/login", credentials),
    register: (payload) => AUTH_INSTANCE.post("/users/register", payload),
    refresh: async () => AUTH_INSTANCE.get("/users/refresh"),
    me: async () => API_INSTANCE.get("/users/me"),
    logout: async () => AUTH_INSTANCE.post("/users/logout")
};
