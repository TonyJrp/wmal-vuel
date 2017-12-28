import api from '../../fetch/api'
import * as types from '../types'

const state = {
    // 轮播图数据
    swipeData: [],
}

const actions = {
    /**
     * 获取首页轮播图
     */
    getLayoutamend({ commit }) {
        api.GetLayoutamend()
            .then(res => {
                commit(types.LAYOUT_AMEND, res.data)
            })
    },
}

const getters = {
    swipeData: state => state.swipeData
}

const mutations = {
    [types.LAYOUT_AMEND](state, res) {
        state.swipeData = res.carousel;
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}
