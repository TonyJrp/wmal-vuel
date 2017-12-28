// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import { Toast } from 'mint-ui';
import './assets/css/common.scss' //公用css设置
import 'mint-ui/lib/style.css' //mint ui css

import store from './vuex/store'
import * as filters from './util/filter'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器
//注册插件
Vue.use(Mint);

//注册全局组件
/*Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);*/

//创建Vue根实例
new Vue({
    el: '#app',
    router,
    store,
    ...App
})
