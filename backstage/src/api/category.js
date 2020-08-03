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