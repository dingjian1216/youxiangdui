import {formatDate} from './data'
import * as utils from '../utils'
export default {
  install (Vue, options) {
    // 路由跳转
    Vue.prototype.jumpTo = function (path) {
      options.router.push(path)
    }
    // 无历史记录跳转
    Vue.prototype.noPastTo = function (path) {
      options.router.replace(path)
    }
    // 路由返回
    Vue.prototype.goBack = function (path) {
      window.history.length > 1 ? options.router.go(-1) : options.router.push('/')
    }
    // 暂未开放
    Vue.prototype.hide = function () {
      this.$vux.toast.show({type: 'cancel', text: '功能即将开放，敬请期待'})
    }
    // 时间  年月日时分秒
    Vue.prototype.timetrans = function (val) {
      let date = new Date(val * 1000)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    }
    Vue.prototype.formatDate = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
    // 复制 需要调用then函数 以完成成功回调
    Vue.prototype.copyText = function (text) {
      return new Promise((resolve, reject) => {
        let input = document.createElement('input')
        input.value = text
        document.body.appendChild(input)
        input.select()
        input.setSelectionRange(0, input.value.length)
        document.execCommand('Copy')
        document.body.removeChild(input)
        this.$vux.loading.show({ text: '复制成功', position: 'top' })
      })
    }
    // 两个浮点数求和  两数相加
    // augend 被加数
    // addend 加数
    Vue.prototype.accAdd = function (augend, addend) {
      let r1, r2, m
      try {
        r1 = augend.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = addend.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      m = Math.pow(10, Math.max(r1, r2))
      return Math.round(augend * m + addend * m) / m
    }
    // 两个浮点数相减
    // minuend 被减数
    // subtrahend 减数
    Vue.prototype.accSub = function (minuend, subtrahend) {
      let r1, r2, m
      try {
        r1 = minuend.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = subtrahend.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      m = Math.pow(10, Math.max(r1, r2))
      var n = (r1 >= r2) ? r1 : r2
      return +(Math.round(minuend * m - subtrahend * m) / m).toFixed(n)
    }
    // 两数相除
    // dividend 被除数
    // divisor 除数
    Vue.prototype.accDiv = function (dividend, divisor) {
      let t1, t2, r1, r2
      try {
        t1 = dividend.toString().split('.')[1].length
      } catch (e) {
        t1 = 0
      }
      try {
        t2 = divisor.toString().split('.')[1].length
      } catch (e) {
        t2 = 0
      }
      r1 = Number(dividend.toString().replace('.', ''))
      r2 = Number(divisor.toString().replace('.', ''))
      return (r1 / r2) * Math.pow(10, t2 - t1)
    }
    // 两数相乘
    // multiplicand 被乘数
    // multiplier 乘数
    Vue.prototype.accMul = function (multiplicand, multiplier) {
      let m = 0; let s1 = multiplicand.toString(); let s2 = multiplier.toString()
      try {
        m += s1.split('.')[1].length
      } catch (e) {
      }
      try {
        m += s2.split('.')[1].length
      } catch (e) {
      }
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    }
    Vue.prototype.jumpTos = function (item) {
      switch (item.types) {
        case 'mallHomeDetail':
          if (item.goodsId !== '0' && item.goodsId) {
            options.router.push({'name': item.types, 'query': {'title': item.goodsId}})
          }
          break
        case 'mallSeller':
          if (item.shopsId !== '0' && item.shopsId) {
            options.router.push({'name': item.types, 'query': {'spid': item.shopsId}})
          }
          break
        case 'mallProductList':
          if (item.goodsCid !== '0' && item.goodsCid) {
            options.router.push({'name': item.types, 'query': {'id': item.goodsCid}})
          }
          break
        case 'mallCategory':
          if (item.shopsCid !== '0' && item.shopsCid) {
            options.router.push({'name': item.types, 'query': {'type': item.shopsCid, 'title': item.title}})
          }
          break
        case 'mallSecthList':
          if (item.shopsCid !== '0' && item.shopsCid) {
            options.router.push({'name': item.types, 'query': {'shopCid': item.shopsCid, 'title': item.title}})
          }
          break
        case 'mallUnderdetail':
          if (item.shopsId !== '0' && item.shopsId) {
            options.router.push({'name': item.types, 'query': {'spid': item.shopsId}})
          }
          break
        case 'mallCart':
          options.router.push({name: item.types})
          break
        case 'mallShopProductList':
          options.router.push({name: item.types})
          break
        case 'httpUrl':
          let browser = api.require('webBrowser')
          browser.open({
            url: item.link,
            titleBar: {
              textColor: '#333',
              bg: '#fff'
            }
          })
          break
        default:
          options.router.push(item.types)
      }
    }
    // 指令
    Vue.directive('focus', {
      // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
      inserted: function (el) {
        el.focus()
      }
    })
  }
}
