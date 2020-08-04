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