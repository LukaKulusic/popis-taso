import { constants } from "./constants"

export function login_request(details) {
    return {
        type: constants.LOGIN_REQUEST,
        payload: details
    }
}

export function login_success(details) {
    return {
        type: constants.LOGIN_SUCCESS,
        payload: details
    }
}

export function login_failure(error) {
    return {
        type: constants.LOGIN_FAILURE,
        payload: error
    }
}

//get logged user
export function getLoggedUser_request(user) {
    return {
        type: constants.GETLOGGEDUSER_REQUEST,
        payload: user
    }
}
export function getLoggedUser_success(user) {
    return {
        type: constants.GETLOGGEDUSER_SUCCESS,
        payload: user
    }
}
export function getLoggedUser_failure(error) {
    return {
        type: constants.GETLOGGEDUSER_FAILURE,
        payload: error
    }
}

//add item in DB
export function addProduct_request(product) {
    return {
        type: constants.ADDPRODUCT_REQUEST,
        payload: product
    }
}

export function addProduct_success(product) {
    return {
        type: constants.ADDPRODUCT_SUCCESS,
        payload: product
    }
}

export function addProduct_failure(error) {
    return {
        type: constants.ADDPRODUCT_FAILURE,
        payload: error
    }
}

//set is added item localy to false
export function setAddedItem_success(item) {
    return {
        type: constants.SETISADDEDITEM_SUCCESS,
        payload: item
    }
}

//get products for user
export function getProducts_request(details) {
    return {
        type: constants.GETPRODUCTS_REQUEST,
        payload: details
    }
}

export function getProducts_success(details) {
    return {
        type: constants.GETPRODUCTS_SUCCESS,
        payload: details
    }
}
export function getProducts_failure(error) {
    return {
        type: constants.GETPRODUCTS_FAILURE,
        payload: error
    }
}