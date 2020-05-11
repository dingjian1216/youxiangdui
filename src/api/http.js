import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router/index'
import qs from 'qs'

axios.defaults.timeout = 5000
let baseApiUrl = window.location.host
if (baseApiUrl.indexOf('192.168') !== -1 || baseApiUrl.indexOf('localhost') !== -1) {
  baseApiUrl = '/api/'
} else {
  baseApiUrl = 'http://uat.xingciji.com/api/'
}
axios.defaults.baseURL = baseApiUrl

// 设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-type': 'application/x-www-form-urlencoded'
}
// 序列化参数
axios.defaults.transformRequest = (data) => {
  data = qs.stringify(data)
  return data
}
let cancel = {}
let promiseArr = {}
const CancelToken = axios.CancelToken

// http request 拦截器1
axios.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    Vue.$vux.loading.show({
      text: '数据加载中……'
    })
    let sn = store.state.global.sn;
    if(sn){
      config.data.sn  = sn
    }
    promiseArr[config.url] = cancel
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    Vue.$vux.loading.hide();
    response = response.data
    if (response.code === -2) {
      // Vue.$vux.toast.text(response.msg, 'top')
      store.commit('logout')
      // 只有在当前路由不是登录页面才跳转
      router.currentRoute.name !== 'home' && router.replace({
        path: 'home'
      })
    }else if (response.code === 404) {
      // Vue.$vux.toast.text(response.msg, 'top')
      store.commit('logout')
    } else {
      return response
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          // 403 清除token信息并跳转到登录页面
          store.commit('logout')
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.name !== 'home' && router.replace({
            path: 'home'
          })
          break
        default:
          error.message = `连接错误：${error.response.status}`
      }
    }
    return Promise.reject(error)
  }
)

export default {
  // get请求
  get(url, param, loading) {
    return new Promise((resolve, reject) => {
      if (loading) {
        store.commit('show')
      }
      if (!param) {
        param = {}
      }
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        if (loading) {
          store.commit('hide')
        }
        if (res.code === 1) {
          resolve(res)
        } else {
          Vue.$vux.toast.text(res.msg)
        }
      }).catch(error => {
        if (Vue.$vux.loading) {
          Vue.$vux.loading.hide()
        }
      })
    })
  },
  // post请求
  post(url, param, loading, show) {
    return new Promise((resolve, reject) => {
      if (loading) {
        store.commit('show')
      }
      if (!param) {
        param = {}
      }
      axios({
        method: 'post',
        url,
        data: param,

      }).then(res => {
        if (loading) {
          store.commit('hide')
          // activity.closeKeyFrame()
          // store.commit('hide')
        }
        if (!res) {
          return
        }
        if (res.code === 1) {
          resolve(res)
        } else {
          resolve(res)
        }
      }).catch(error => {
        if (loading) {
          store.commit('hide')
        }
        if (Vue.$vux.loading) {
          // Vue.$vux.loading.hide()
        }
        if (error.message !== '操作取消') {
          resolve(error)
        }
        console.log(error)
        
      })
    })
  }
}
