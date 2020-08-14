import request from "../utils/request";
import qs from 'qs'
export function roleList(data) {
    return request({
        url:'role/list',
        method:'POST',
        data:qs.stringify(data)
    })
}