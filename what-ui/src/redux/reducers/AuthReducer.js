import {JWT_TOKEN_KEY} from "../../constants/APIConstants";

const initialState = {
    token: null,
    userEmail: null,
    userId: null,
    loggedIn: false,
    error: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                loggedIn: true,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loggedIn: false,
                error: action.payload.error,
            };
        case 'LOGOUT':
            localStorage.removeItem(JWT_TOKEN_KEY);
            return {
                ...state,
                token: null,
                loggedIn: false,
                userId: null,
                userEmail: null
            };
        case 'GET_USER_BY_ID_SUCCESS':
            return {
                ...state,
                userEmail: action.payload.user.data.email
            };
        case 'REGISTER':
            // Handle register logic, such as setting user data
            return state;
        default:
            return state;
    }
};

export default authReducer;
