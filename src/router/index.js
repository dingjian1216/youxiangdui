/* router vue路由管理 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

import Layout from '../pages/layout'
import Home from '../pages/home'
import set from '../pages/set'
import Message from '../pages/message'
const NewDetail = resolve => require(['../pages/message/newDetail.vue'], resolve)

const BankMsg = resolve => require(['../pages/home/bankMsg.vue'], resolve)
const GoodInfo = resolve => require(['../pages/home/goodInfo.vue'], resolve)
const Standard = resolve => require(['../pages/home/standard.vue'], resolve)
const Text = resolve => require(['../pages/home/text.vue'], resolve)
const Integral = resolve => require(['../pages/home/integral.vue'], resolve)
const BaoDan = resolve => require(['../pages/home/baodan.vue'], resolve)
const Success = resolve => require(['../pages/home/success.vue'], resolve)
const Sign = resolve => require(['../pages/home/sign.vue'], resolve)
const MyOrder = resolve => require(['../pages/my/myOrder.vue'], resolve)
const OrderDetails = resolve => require(['../pages/my/orderDetails.vue'], resolve)
const My = resolve => require(['../pages/my'], resolve)
const Price = resolve => require(['../pages/my/price.vue'], resolve)
const Money = resolve => require(['../pages/my/money.vue'], resolve)

Vue.use(Router)


const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: { title: '首页', keepAlive: false, isShowHead: false, isShowTab: true, isBack: true}
        },
        {
          path: '/set',
          name: 'set',
          component: set,
          meta: { title: '设置中心', keepAlive: false, isShowHead: false, isShowTab: true }
        },
        {
          path: '/message',
          name: 'message',
          component: Message,
          meta: { title: '通知消息', keepAlive: false, isShowHead: false, isShowTab: true }
        },
        {
          path: '/newDetail',
          name: 'newDetail',
          component: NewDetail,
          meta: { title: '消息详情', keepAlive: false, isShowHead: true, isShowTab: false }
        },
        {
          path: '/bankMsg',
          name: 'bankMsg',
          component: BankMsg,
          meta: { title: '积分兑换', keepAlive: true, isShowHead: false, isShowTab: false, isBack: false}
        },
        {
          path: '/goodInfo',
          name: 'goodInfo',
          component: GoodInfo,
          meta: { title: '积分兑换', keepAlive: false, isShowHead: false, isShowTab: false,}
        },
        {
          path: '/integral',
          name: 'integral',
          component: Integral,
          meta: { title: '积分兑换', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/baodan',
          name: 'baodan',
          component: BaoDan,
          meta: { title: '申请报单', keepAlive: true, isShowHead: true, isShowTab: false,isBack: false}
        },
        {
          path: '/standard',
          name: 'standard',
          component: Standard,
          meta: { title: '报单标准', keepAlive: false, isShowHead: true, isShowTab: false,isBack: false}
        },
        {
          path: '/text',
          name: 'text',
          component: Text,
          meta: { title: '查看详情教程', keepAlive: true, isShowHead: true, isShowTab: false,isBack: false}
        },
        {
          path: '/success',
          name: 'success',
          component: Success,
          meta: { title: '报单成功', keepAlive: true, isShowHead: false, isShowTab: false}
        },
        {
          path: '/sign',
          name: 'sign',
          component: Sign,
          meta: { title: '手写签名', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/myOrder',
          name: 'myOrder',
          component: MyOrder,
          meta: { title: '我的报单', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/orderDetails',
          name: 'orderDetails',
          component: OrderDetails,
          meta: { title: '报单详情', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/my',
          name: 'my',
          component: My,
          meta: { title: '个人中心', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/money',
          name: 'money',
          component: Money,
          meta: { title: '收支明细', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/price',
          name: 'price',
          component: Price,
          meta: { title: '用户表', keepAlive: false, isShowHead: true, isShowTab: false}
        },
      ]
    },
//登录和注册
  ]
})

// const whiteList = ['login','register', 'forget']
// router.beforeEach(function (to, from, next) {
//   // 登录拦截
//   if (whiteList.indexOf(to.name) < 0 && !store.state.global.token) {
//     next({
//       path: '/login'
//     })
//   } else {
//     next()
//   }
// })

export default router
