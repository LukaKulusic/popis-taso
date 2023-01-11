import axios from 'axios'
import { AsyncStorage } from 'react-native';

// var apiUrl = window.location.href.indexOf('admin.popis2020.me') >= 0 ? 'https://laravel.popis2020.me' : 'http://api.popis2020.test';

// axios.interceptors.request.use(function (config) {
//     // config.headers.Authorization =  'Bearer ' + token;
//    config.headers.Accept = 'application/json';
//     // config.headers = { 
//     //     "Access-Control-Allow-Origin": "*",
//     //     "Content-Type": "application/json"
//     //   }

//     return config;
// });

export function login_api(details) {
    return axios.post("http://popis1.mils.me/api/sanctum/token", {
        email: details.email,
        password: details.password,
        device_name: "phone"
    }).catch((error) => {
        return error.response.data;
    })
}

export function checkUser_api(token) {
    return axios.post("http://popis1.mils.me/api/check",{}, {
        headers: {'Authorization': 'Bearer ' + token }
    }).catch((error) => {
        console.log('error in api ', error);
    })
}

export async function addProduct_api(details) {
    let token = await AsyncStorage.getItem('token')
    return axios.post("http://popis1.mils.me/addItem",details).catch((error) => {
        console.log('error in api ', error);
    })
}

export function getProducts_api(details) {
    return axios.get("http://popis1.mils.me/getItems/" + details.payload.company_id + "/" + details.payload.user_id).catch((error) => {
        console.log('error in api', error);
    })
}
// , {
//     headers: {'Authorization': 'Bearer ' + token }
// }