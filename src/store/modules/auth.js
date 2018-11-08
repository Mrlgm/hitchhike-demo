const state = {
    userInfo:null,
    isLogin:false,
};

const getters = {};

const mutations = {
    setUserInfo(state,data){
        state.userInfo = data;
    },
    setIsLogin(state,data){
        state.isLogin = data;
    },
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions
}