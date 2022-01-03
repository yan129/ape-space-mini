import Vue from "vue";
import Vuex from 'vuex';
import styles from '../../uni.scss';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginStatus: false,
        userInfo: null,
    },
    mutations: {
        login(state, jwtData){
            // 设置登录类型，用于账号与安全的账号判断显示
            jwtData.userInfo.loginType = 'wx';
            uni.setStorage({
                key: 'user_info',
                data: jwtData,
                success: function () {
                    state.loginStatus = true;
                    state.userInfo = jwtData.userInfo;
                    // 设置登录用户的主题颜色
                    styles.themeColor = jwtData.userInfo.themeColor;
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
        },
        updateUserInfo(state, userInfo){
            let jwtData = uni.getStorageSync('user_info');
            if (jwtData){
                jwtData.userInfo = userInfo;
                uni.setStorage({
                    key: 'user_info',
                    data: jwtData,
                    success: function () {
                        state.userInfo = jwtData.userInfo;
                    }
                })
            }
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