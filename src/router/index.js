import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/home'
import Classify from '../pages/classify/classify'
import Cart from '../pages/cart/cart'
import Personal from '../pages/personal/personal' /*个人中心*/
import Recharge from '../pages/recharge/recharge' /*充值*/
/*import PaySucc from '../pages/recharge/paySucc'*/ /*充值成功（卡充值）*/
import AccountDetail from '../pages/recharge/accountDetail'  /*账号明细*/
import AccountDetails from '../pages/recharge/children/accountDetail'  /*账号明细*/

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    mode:"history",
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/classify',
        name: 'classify',
        component: Classify
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/personal',
        name: 'personal',
        component: Personal
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: Recharge,
        children:[{
            path: 'details',
            component: AccountDetails
        }]
    },{
        path: '/recharge/detail',
        name: 'accountDetail',
        component: AccountDetail
    },{
      path: '/home',
      redirect: '/'
    },
    {
      path: '*',
      redirect: '/'
    }]
})
