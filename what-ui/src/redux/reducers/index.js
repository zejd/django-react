import { combineReducers } from 'redux';
import authReducer from "./AuthReducer";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer
});

export default rootReducer;
