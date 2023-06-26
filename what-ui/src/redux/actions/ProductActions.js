import {API_BASE_URL} from "../../configs/AppConfig";
import authService from "../../configs/AxiosInterceptor";

const RESOURCE_BASE = `${API_BASE_URL}api/`;

export const getProducts = (searchValue) => {
    return (dispatch) => {
        authService
            .get(RESOURCE_BASE + 'products?search=' + searchValue)
            .then((response) => {
                dispatch(getProductsSuccess(response.data));
            })
            .catch((error) => {
                console.log(error)
            });
    };
};

export const updateProduct = (product) => {
    return (dispatch) => {
        authService
            .put(RESOURCE_BASE + 'products/' + product.id, {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                selected: product.selected
            })
            .then((response) => {
                dispatch(updateProductSuccess());
            })
            .catch((error) => {
                console.log(error)
            });
    };
};

export const getProductsSuccess = (products) => {
    return {
        type: 'GET_PRODUCTS_SUCCESS',
        payload: {
            products
        },
    };
};

export const updateProductSuccess = () => {
    return {
        type: 'UPDATE_PRODUCT_SUCCESS'
    };
};
