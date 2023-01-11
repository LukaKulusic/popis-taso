import { takeEvery, put, call, take } from 'redux-saga/effects'
import { login_api, checkUser_api, addProduct_api, getProducts_api } from './api';
import { constants } from './constants'
import { addProduct_failure, addProduct_success, getLoggedUser_failure, getLoggedUser_success, getProducts_failure, getProducts_success, login_failure, login_success } from './rootAction';
import { AsyncStorage } from 'react-native';


export function* loginUser(action) {
    const response = yield call(login_api, action.payload)
    if(response.status == 200) {
        yield call(AsyncStorage.setItem, "token", response.data);
        return yield put(login_success(response.data))
    } 
    if(response.status == undefined) {
        return yield put(login_failure('Neuspješan login!'))
    }
    else {
        return yield put(login_failure('Neuspješan login!'))
    }
}

export function* getLoggedUser(action) {
    const response = yield call(checkUser_api, action.payload)
    // if(!response && (!response.data || !response.message)) {
    //     return yield put(getLoggedUser_failure('Internal server error for loading logged user'))
    // }
    if(!response) {
        return yield put(getLoggedUser_failure('Error for loading logged user'))
    }
    if(response.status === 200) {
        yield call(AsyncStorage.setItem, "user", JSON.stringify(action.payload));
        return yield put(getLoggedUser_success(response.data))
    } 
    else {
        return yield put(getLoggedUser_failure('Error for loading logged user'))
    }
}

export function* addProduct(action) {
    const response = yield call(addProduct_api, action.payload)
    if(!response) {
        return yield put(addProduct_failure('Error for loading logged user'))
    }
    if(response.status === 200) {
        return yield put(addProduct_success(response.data))
    } 
    else {
        console.log('saga else');
        return yield put(addProduct_failure('Error for loading logged user'))
    }
}

export function* getProducts(action) {
    const response = yield call(getProducts_api, action)
    if(!response) {
        return yield put(getProducts_failure('Error for loading items for user'))
    }
    if(response.status === 200) {
        return yield put(getProducts_success(response.data))
    } 
    else {
        return yield put(getProducts_failure('Error for loading items for user'))
    }
}


export function* rootSaga() {
    yield takeEvery(constants.LOGIN_REQUEST, loginUser)
    yield takeEvery(constants.GETLOGGEDUSER_REQUEST, getLoggedUser)
    yield takeEvery(constants.ADDPRODUCT_REQUEST, addProduct)
    yield takeEvery(constants.GETPRODUCTS_REQUEST, getProducts)
}