import authService from "../../configs/AxiosInterceptor";
import {API_BASE_URL} from "../../configs/AppConfig";
import {APP, LOGIN} from "../../constants/RoutePathConstants";
import jwtDecode from 'jwt-decode';
import {JWT_TOKEN_KEY} from "../../constants/APIConstants";

const RESOURCE_BASE = `${API_BASE_URL}api/`;

export const login = (email, password, navigate) => {
    return (dispatch) => {
        authService
            .post(RESOURCE_BASE + 'token', { email, password })
            .then((response) => {
                const token = response.data.access;
                localStorage.setItem(JWT_TOKEN_KEY, token);
                const decodedToken = jwtDecode(token);
                const userId = decodedToken ? decodedToken.user_id : null;
                dispatch(loginSuccess(response.access, userId));
                if (userId) {
                    getUserById(userId);
                }
                navigate(APP);
            })
            .catch((error) => {
                console.log(error)
                dispatch(loginFailure(error.message));
            });
    };
};

export const register = (firstName, lastName, email, password, navigate) => {
    return (dispatch) => {
        authService
            .post(RESOURCE_BASE + 'register', { first_name: firstName, last_name: lastName, email, password })
            .then((response) => {
                dispatch(registerSuccess());
                navigate(LOGIN);
            })
            .catch((error) => {
                console.log(error)
            });
    };
};

export const loginFailure = (error) => {
    return {
        type: 'LOGIN_FAILURE',
        payload: {
            error,
        },
    };
};

export const loginSuccess = (token, userId) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            token,
            userId
        },
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};

export const getUserById = (userId) => {
    return (dispatch) => {
        authService.get(RESOURCE_BASE + 'users/' + userId).then((user) => {
            dispatch(getUserByIdSuccess(user));
        });
    }
}

export const getUserByIdSuccess = (user) => {
    return {
        type: 'GET_USER_BY_ID_SUCCESS',
        payload: {
            user
        },
    };
};

export const registerSuccess = () => {
    return {
        type: 'REGISTER_SUCCESS',
    };
};
