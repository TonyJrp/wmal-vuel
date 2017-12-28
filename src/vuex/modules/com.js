import * as types from '../types'
import * as common from '../../assets/js/common'
/**
 * App通用配置
 */
const state = {
    showTabBar: false, //是否显示底部导航
    currTabId: Lockr.get('currTabId')?Lockr.get('currTabId'):'home', //当前Tab Id
    userToken: common.getUserToken(),
}

const actions = {
    userToken({ commit }, status){
        commit(types.COM_USERTOKEN,status)
    },
    showTabBar({ commit }, status) {
        commit(types.COM_SHOW_TABBAR, status)
    },
    changeCurrTabId({ commit }, status) {
        commit(types.COM_CURR_TABID, status)
    },
}

const getters = {
    userToken: state => state.userToken,
    showTabBar: state => state.showTabBar,
    currTabId: state => state.currTabId,
}

const mutations = {
    [types.COM_USERTOKEN](state, status) {
        state.userToken = status
    },
    [types.COM_SHOW_TABBAR](state, status) {
        state.showTabBar = status
    },
    [types.COM_CURR_TABID](state, status) {
        Lockr.set('currTabId',status);
        state.currTabId = status
    },
}


export default {
    state,
    actions,
    getters,
    mutations
}
