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

export function changePassword(data) {
    return request({
        url: 'change/password',
        method: 'POST',
        data:qs.stringify(data)
    })
}

export function UserList(data) {
    return request({
        url: 'user/list',
        method: 'POST',
        data:qs.stringify(data)
    })
}

export function UserInfo(params) {
    return request({
        url: 'user/info',
        method: 'GET',
        params
    })
}

export function UserUpdate(data) {
    return request({
        url: 'user/update',
        method: 'POST',
        data:qs.stringify(data)
    })
}

export function UserDelete(data) {
    return request({
        url: 'user/delete',
        method: 'POST',
        data:qs.stringify(data)
    })
}