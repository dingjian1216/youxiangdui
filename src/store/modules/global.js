// import * as api from '../../api'
import * as utils from '../../utils'

const state = {
  sign: utils.storage.get('sign'),
  bank: utils.storage.get('bank'),
  sn: utils.storage.get('sn'),
  userName: utils.storage.get('userName'),
  loading: false,
  moneyShow: utils.storage.get('moneyShow'),
}

const getters = {}

const actions = {
  login (context, mobile, password) {
    return new Promise((resolve, reject) => {
      api.login(mobile, password).then(response => {
        if (response.code === 0) {
          context.commit('setToken', response.data.token)
          context.commit('setUserInfo', response.data.userInfo)
        }
        resolve(response)
      }).catch(error => { reject(error) })
    })
  }
}

const mutations = {
  logout (state) {
    utils.storage.remove('token')
    utils.storage.remove('userInfo')
    state.token = null
    state.userInfo = null
  },
  setMoneyShow: (state, data) => {
    utils.storage.set('moneyShow', data)
    state.moneyShow = data
  },
  setSn: (state, data) => {
    utils.storage.set('sn', data)
    state.sn = data
  },

  setSign: (state, data) => {
    utils.storage.set('sign', data)
    state.sign = data
  },
  setBank: (state, data) => {
    utils.storage.set('bank', data)
    state.bank = data
  },

  setUserName: (state, data) => {
    console.log(data)
    utils.storage.set('userName', data)
    state.userName = data
  },
  
  show (state) {
    state.loading = true
  },
  hide (state) {
    state.loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
