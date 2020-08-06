import {login} from "../api/user";
import state from "./state";
import mutations from "./mutations";
const actions = {
    userLogin({commit}, params) {
        return new Promise(((resolve, reject) => {
            login(params).then(res=>{
                if (res.status===200){
                    commit('changeToken',res)
                }
                resolve(res)
            }).catch(error=>{
                reject(error)
            })
        }))
    },
    userLogout({commit}){
        return new Promise(((resolve, reject) => {
            localStorage.removeItem('token')
            commit('logout')
            resolve()
        }))
    }
}
export default actions