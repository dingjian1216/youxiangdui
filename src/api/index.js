import http from './http'

// let bizId = 1
// let biz = {biz_id: bizId}




// 登录
export const getLogin = function ( mobile, password,sn) {
  return http.post('User/login', {mobile: mobile, password: password,sn:sn}, true)
}

// 获取验证码

export const getSetCode = function ( mobile,) {
  return http.post('User/setCode', {mobile: mobile,}, true)
}

// 检查当前sn是否注册

export const getCheckSn = function (sn) {
  return http.post('user/check_sn', {sn: sn}, true)
}

// 注册
export const register = function (mobile,password,code,sn) {
  return http.post('User/register', {mobile:mobile,password:password,code:code,sn: sn}, true)
}
//认证

export const getAuth = function (name,ids,alipay,token) {
  return http.post('User/is_auth', {name:name,ids:ids,alipay:alipay,token: token}, true)
}


// 首页
export const getHomeNew = function () {
  return http.post('index/index_new', {})
}

// 获取银行信息
export const getGoodInfo = function (bankId,token) {
  return http.post('index/goods', {bank_id: bankId,token:token})
}

// 银行类型
export const getNewList = function (type,token,page) {
  return http.post('/News/news_list', {type: type,token:token,page:page})
}

// 类型下可选择的产品

export const getgoodsProduct = function (bank_id,token) {
  return http.post('/index/product_list', {bank_id: bank_id,token:token})
}
// 积分兑现介绍
export const getgoodsDetail = function (goods_id,token) {
  return http.post('/index/goods_detail', {goods_id: goods_id,token:token})
}

// 上传图片
export const getUpload = function (file) {
  return http.post('index/upload', {files: file})
}

// 报单列表
export const getOrderList = function (page,status,token) {
  return http.post('My/order_list', {page: page,status:status,token:token})
}

// 报单详情
export const getOrderDetail = function (order_id,token) {
  return http.post('My/order_detail', {order_id:order_id,token:token})
}
// 申请报单
export const setOrder = function (token,pro_id,sms,img,orderSn,sign,name,mobile,address) {
  return http.post('index/setOrder', {token:token,pro_id:pro_id,sms:sms,img:img,orderSn:orderSn,sign:sign,name:name,mobile:mobile,address:address})
}

// 个人中心
export const myIndex = function (token) {
  return http.post('User/myIndex', {token:token})
}


// 价格表
export const gradeIndex = function (token) {
  return http.post('Grade/index', {token:token})
}

// 总收益
export const getUserMoneyInfo = function (token) {
  return http.post('User/getUserMoneyInfo', {token:token})
}

// 收支明细

export const getMoneyList = function (page,type,token) {
  return http.post('My/money_list', {token:token,type:type,page:page})
}

// 收支详情
export const getMoneyDetail = function (token,id) {
  return http.post('my/money_detail', {token:token,id:id})
}

// 可提现数据

export const getUserInfo = function (token) {
  return http.post('Cash/getUserInfo', {token:token})
}

// 提现

export const getApply = function (token,name,alipay,money) {
  return http.post('Cash/apply', {token:token,name:name,alipay:alipay,money:money})
}
// 提现记录

export const getApplyList = function (token,status,page) {
  return http.post('Cash/apply_list', {token:token,status:status,page:page})
}
// 提现详情
export const getCashDetail = function (token,id) {
  return http.post('cash/getCashDetail', {token:token,id:id})
}


// 成就
export const getIntegral = function (token) {
  return http.post('User/getChengjiu', {token:token})
}
// 我的团队
export const getTeamList = function (token,page,limit,group) {
  return http.post('my/team_list_new', {token:token,page:page,limit:limit,group:group})
}
// 团队详情
export const getUserDetail = function (uid) {
  return http.post('my/getUserDetail', {uid:uid})
}

// 关于我们

export const getAbout= function (token,id) {
  return http.post('my/about', {token:token,id:id})
}

// 微信客服

export const getWxNum= function () {
  return http.post('my/getWxNum', {})
}

export const getNewDetails= function (news_id,token) {
  return http.post('News/detail', {news_id:news_id,token:token})
}


// 检查用户
export const getUserToken= function (token) {
  return http.post('User/getUserInfo', {token:token})
}







