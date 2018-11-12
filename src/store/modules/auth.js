const state = {
    userInfo: null,
    isLogin: false,
};

const getters = {
    user: state => state.userInfo,
    isLogin: state => state.isLogin
};

const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data;
    },
    setIsLogin(state, data) {
        state.isLogin = data;
    },
};

const actions = {
    login({commit}, {username, password}) {
        return this.$AV.User.logIn(username, password).then(res => {
            commit('setUserInfo', res.toJSON());
            commit('setIsLogin', true);
        });
    },
    register({commit, state}, {username, password, gender='', profession='', grade='', phoneNumber='', qq='', signature=''}) {
        let user = new this.$AV.User();
        user.setUsername(username);
        user.setPassword(password);
        user.set('avatar', require(`../../assets/user_imgs/${Math.floor(Math.random() * 14)}.png`));
        user.set('gender', gender);
        user.set('profession', profession);
        user.set('grade', grade);
        user.set('phoneNumber', phoneNumber);
        user.set('qq', qq);
        user.set('signature', signature);
        return user.signUp().then(res => {
            commit('setUserInfo', res.toJSON());
            commit('setIsLogin', true);
        });
    },
    logout({commit}) {
        return this.$AV.User.logOut().then(() => {
            commit('setUserInfo', null);
            commit('setIsLogin', false);
        });
    },
    checkLogin({commit, state}) {
        if (state.isLogin) {
            return true;
        } else {
            let currentUser = this.$AV.User.current();
            if (currentUser) {
                commit('setUserInfo', currentUser.toJSON());
                commit('setIsLogin', true);
                return true;
            } else {
                return false;
            }
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}