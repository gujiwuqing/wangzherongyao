import request from "../utils/request";
import qs from 'qs'
export function CagetgoryList(data) {
    return request({
        url:'category/list',
        method:'POST',
        data:qs.stringify(data)
    })
}

export function optionCategoryList(data) {
    return request({
        url:'category/optionList',
        method:'POST',
        data:qs.stringify(data)
    })
}

export function categoryAdd(data) {
    return request({
        url:'category/add',
        method:'POST',
        data:qs.stringify(data)
    })
}
export function categoryDelete(data) {
    return request({
        url:'category/delete',
        method:'POST',
        data:qs.stringify(data)
    })
}

export function categoryInfo(params) {
    return request({
        url:'category/info',
        method:'GET',
        params
    })
}

export function categoryUpdate(data) {
    return request({
        url:'category/update',
        method:'POST',
        data:qs.stringify(data)
    })
}