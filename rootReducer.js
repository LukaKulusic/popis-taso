import { AsyncStorage } from 'react-native';
import { constants } from './constants'

const initialState = {
    token: "",
    user: "",
    isAddedItem: false,
    error: "",
    items: [],
    errorItems: ""
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case constants.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                error: ""
            }
        case constants.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case constants.GETLOGGEDUSER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                error: ""
            }
        case constants.ADDPRODUCT_SUCCESS:
            return {
                ...state,
                isAddedItem: true,
                error: ""
            }
        case constants.ADDPRODUCT_FAILURE:
            // console.log('ADDPRODUCT_FAILURE = ', action.payload);
            return {
                ...state,
                isAddedItem: false,
                error: action.payload
            }
        case constants.SETISADDEDITEM_SUCCESS:
            // console.log('SETISADDEDITEM_SUCCESS = ', state.error);
            return {
                ...state,
                isAddedItem: false,
                error: "",
            }
        case constants.GETPRODUCTS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                errorItems: ""
            }
        case constants.GETPRODUCTS_FAILURE:
            return {
                ...state,
                errorItems: action.payload
            }
        default:
            return state
    }
}