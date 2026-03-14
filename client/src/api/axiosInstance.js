import axios from 'axios';
import {SERVER_API_URL, SERVER_AUTH_URL} from "../../configs/envConfig.js";

export const AUTH_INSTANCE = axios.create({
    baseURL: SERVER_AUTH_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})


export const API_INSTANCE = axios.create({
    baseURL: SERVER_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },

})
AUTH_INSTANCE.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const customError = {
            ...(error.response?.data || {message: "Network Error"}),
            statusCode: error.response?.status || 500,
            config: error.config,
        };
        return Promise.reject(customError);
    }
);

API_INSTANCE.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const customError = {
            ...(error.response?.data || {message: "Network Error"}),
            statusCode: error.response?.status || 500,
            config: error.config,
        };
        return Promise.reject(customError);
    }
);