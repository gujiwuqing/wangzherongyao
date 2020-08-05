import request from "../utils/request";
import qs from 'qs'
export function articleAdd(data) {
    return request({
        url:'article/add',
        method:'POST',
        data:qs.stringify(data)
    })
}

export function articleList(data) {
    return request({
        url:'article/list',
        method:'POST',
        data:qs.stringify(data)
    })
}

export function articleDelete(data) {
    return request({
        url:'article/delete',
        method:'POST',
        data:qs.stringify(data)
    })
}

export function articleInfo(params) {
    return request({
        url:'article/info',
        method:'GET',
        params
    })
}

export function articleUpdate(data) {
    return request({
        url:'article/update',
        method:'POST',
        data:qs.stringify(data)
    })
}