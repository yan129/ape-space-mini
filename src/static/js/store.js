import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginStatus: false,
        userInfo: null,
    },
    mutations: {
        login(state, jwtData){
            uni.setStorage({
                key: 'user_info',
                data: jwtData,
                success: function () {
                    state.loginStatus = true;
                    state.userInfo = jwtData.userInfo;
                    uni.navigateBack();
                }
            })
        },
        logout(state){
            uni.removeStorage({
                key: 'user_info',
                success: function (res) {
                    state.loginStatus = false;
                    state.userInfo = null;
                    uni.navigateBack();
                }
            })
        }
    },
    actions: {

    },
    getters: {
        getUserInfo(state){
            let jwtData = uni.getStorageSync('user_info');
            if (jwtData){
                state.userInfo = jwtData.userInfo;
            }
            return state.userInfo;
        }
    },
})