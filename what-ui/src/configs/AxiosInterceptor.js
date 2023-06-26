import axios from 'axios';
import {JWT_TOKEN_KEY} from "../constants/APIConstants";

const authService = axios.create({
    timeout: 60 * 1000, // 60 seconds
});

const AUTHORIZATION_HEADER_KEY = 'Authorization';

authService.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem(JWT_TOKEN_KEY);
        if (config.headers) {
            config.headers[AUTHORIZATION_HEADER_KEY] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

authService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const response = error.response;
            if (response.status === 403) {
                localStorage.removeItem(JWT_TOKEN_KEY);
            }
        }
        return Promise.reject(error);
    }
);

export default authService;
