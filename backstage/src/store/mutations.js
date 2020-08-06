import state from "./state";

const mutations ={
    changeToken(state,params){
        let {user,token}  =params
        state.token = token
        localStorage.setItem('token',token)
        state._id = user._id
    },
    logout(state){
        state.token=''
    },
    changeCollapse(state){
        state.isCollapse = !state.isCollapse
        console.log(state.isCollapse);
    }
}
export default mutations