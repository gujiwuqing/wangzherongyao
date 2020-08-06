import axios from 'axios'
import store from '../store'
import router from "../router";
import Message from "element-ui/packages/message/src/main";
const request = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    timeout: 15000,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});


// Add a request interceptor
request.interceptors.request.use(function (config) {
    if (store.state.token||localStorage.getItem('token')){
        config.headers.authorization=store.state.token||localStorage.getItem('token')
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(res=> {
    // Do something with response data
    const {status,msg}  = res.data
    switch (String(status)) {
        case '200':
            break;
        case '403':
            router.push('/login')
            break;
        case '402':
            router.push('/login')
            break;
        default:
            Message({
                message:msg,
                type:'error'
            })
            break;
    }
    return res.data;
}, error =>  {
    // Do something with response error
    return Promise.reject(error);
});

export default request