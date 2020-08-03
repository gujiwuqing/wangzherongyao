import state from "./state";

const mutations ={
    changeToken(state,params){
        state.token = params
        localStorage.setItem('token',params)
    },
    logout(state){
        state.token=''
    }
}
export default mutations