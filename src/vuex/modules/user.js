import api from '../../fetch/api'
import * as types from '../types'

const state = {
    // 用户登录状态
    loginStatus: "",
    // 用户登录信息
    userInfo: "",
    // 用户数据信息
    userData: []
}

const actions = {
    /**
     * 用户登录
     */
    setUserInfo({ commit }, res) {

    },

    /**
     * 退出登录
     */
    setSignOut({ commit }) {

    },

    /**
     * 请求用户信息
     */
    getUserData({ commit }, id) {}
}

const getters = {

}

const mutations = {

}

export default {
    state,
    actions,
    getters,
    mutations
}
