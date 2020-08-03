import request from '../utils/request'
import qs from 'qs'
export function login(data) {
    return request({
        url: 'login',
        method: 'POST',
        data:qs.stringify(data)
    })
}

export function register(data) {
    return request({
        url: 'register',
        method: 'POST',
        data:qs.stringify(data)
    })
}