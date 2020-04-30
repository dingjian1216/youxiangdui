/* router vue路由管理 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

import Layout from '../pages/layout'
import Home from '../pages/home'
import set from '../pages/set'
import Message from '../pages/message'
const NewDetail = resolve => require(['../pages/message/newDetail.vue'], resolve)
const Login = resolve => require(['../pages/auth/login.vue'], resolve)
const Register = resolve => require(['../pages/auth/register.vue'], resolve)
const BankMsg = resolve => require(['../pages/home/bankMsg.vue'], resolve)
const GoodInfo = resolve => require(['../pages/home/goodInfo.vue'], resolve)
const Integral = resolve => require(['../pages/home/integral.vue'], resolve)
const BaoDan = resolve => require(['../pages/home/baodan.vue'], resolve)
const Success = resolve => require(['../pages/home/success.vue'], resolve)
const Sign = resolve => require(['../pages/home/sign.vue'], resolve)
const MyOrder = resolve => require(['../pages/my/myOrder.vue'], resolve)
const OrderDetails = resolve => require(['../pages/my/orderDetails.vue'], resolve)
const My = resolve => require(['../pages/my'], resolve)
const Info = resolve => require(['../pages/my/info.vue'], resolve)
const Price = resolve => require(['../pages/my/price.vue'], resolve)
const RealName = resolve => require(['../pages/my/realName.vue'], resolve)
const Profit = resolve => require(['../pages/my/profit.vue'], resolve)
const Money = resolve => require(['../pages/my/money.vue'], resolve)
const MoneyDetail = resolve => require(['../pages/my/moneyDetail.vue'], resolve)
const CashOut = resolve => require(['../pages/my/cashOut.vue'], resolve)
const CashList = resolve => require(['../pages/my/cashList.vue'], resolve)
const CashDetail = resolve => require(['../pages/my/cashDetail.vue'], resolve)
const Achievement = resolve => require(['../pages/my/achievement.vue'], resolve)
const Team = resolve => require(['../pages/my/team.vue'], resolve)
const TeamDetail = resolve => require(['../pages/my/teamDetail.vue'], resolve)
const About = resolve => require(['../pages/my/About.vue'], resolve)
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
          path: '/login',
          name: 'login',
          component: Login,
          meta: { title: '登录', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
          meta: { title: '注册', keepAlive: false, isShowHead: false, isShowTab: false}
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
          path: '/info',
          name: 'info',
          component: Info,
          meta: { title: '个人信息', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/price',
          name: 'price',
          component: Price,
          meta: { title: '用户表', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/realName',
          name: 'realName',
          component: RealName,
          meta: { title: '实名认证', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/profit',
          name: 'profit',
          component: Profit,
          meta: { title: '总收益', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/money',
          name: 'money',
          component: Money,
          meta: { title: '收支明细', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/moneyDetail',
          name: 'moneyDetail',
          component: MoneyDetail,
          meta: { title: '收支详情', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/cashOut',
          name: 'cashOut',
          component: CashOut,
          meta: { title: '提现', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/cashList',
          name: 'cashList',
          component: CashList,
          meta: { title: '提现记录', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/cashDetail',
          name: 'cashDetail',
          component: CashDetail,
          meta: { title: '提现详情', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/achievement',
          name: 'achievement',
          component: Achievement,
          meta: { title: '我的成就', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/team',
          name: 'team',
          component: Team,
          meta: { title: '我的团队', keepAlive: false, isShowHead: true, isShowTab: false}
        },
        {
          path: '/teamDetail',
          name: 'teamDetail',
          component: TeamDetail,
          meta: { title: '团队详情', keepAlive: false, isShowHead: false, isShowTab: false}
        },
        {
          path: '/about',
          name: 'about',
          component: About,
          meta: { title: '关于我们', keepAlive: false, isShowHead: true, isShowTab: false}
        }
        
      ]
    },
//登录和注册
  ]
})

const whiteList = ['login','register', 'forget']
router.beforeEach(function (to, from, next) {
  // 登录拦截
  if (whiteList.indexOf(to.name) < 0 && !store.state.global.token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
