import http from './http'

// let bizId = 1
// let biz = {biz_id: bizId}








// 首页
export const getHomeNew = function () {
  return http.post('index/index_new', {})
}

// 获取银行信息
export const getGoodInfo = function (bankId,) {
  return http.post('index/goods', {bank_id: bankId})
}

// 银行类型
export const getNewList = function (type,page) {
  return http.post('/News/news_list', {type: type,page:page})
}

// 类型下可选择的产品

export const getgoodsProduct = function (bank_id,) {
  return http.post('/index/product_list', {bank_id: bank_id,})
}
// 积分兑现介绍
export const getgoodsDetail2 = function (goods_id,bank_id) {
  return http.post('/index/goods_detail2', {goods_id: goods_id,bank_id:bank_id})
}

export const getgoodsDetail = function (goods_id) {
  return http.post('/index/goods_detail', {goods_id: goods_id})
}

// 上传图片
export const getUpload = function (file) {
  return http.post('index/upload', {files: file})
}

// 报单列表
export const getOrderList = function (page,status,) {
  return http.post('My/order_list', {page: page,status:status,})
}

// 报单详情
export const getOrderDetail = function (order_id,) {
  return http.post('My/order_detail', {order_id:order_id,})
}
// 申请报单
export const setOrder = function (pro_id,sms,img,orderSn,sign,name,mobile,address,fwf,num) {
  return http.post('index/setOrder', {pro_id:pro_id,sms:sms,img:img,orderSn:orderSn,sign:sign,name:name,mobile:mobile,address:address,fwf:fwf,num:num})
}


// 价格表
export const gradeIndex = function () {
  return http.post('Grade/index', {})
}



// 收支明细

export const getMoneyList = function (page,type,) {
  return http.post('My/money_list', {type:type,page:page})
}

// 收支详情
export const getMoneyDetail = function (id) {
  return http.post('my/money_detail', {id:id})
}

// 可提现数据

export const getUserInfo = function () {
  return http.post('Cash/getUserInfo', {})
}

// 提现

export const getApply = function (name,alipay,money) {
  return http.post('Cash/apply', {name:name,alipay:alipay,money:money})
}
// 提现记录

export const getApplyList = function (status,page) {
  return http.post('Cash/apply_list', {status:status,page:page})
}
// 提现详情
export const getCashDetail = function (id) {
  return http.post('cash/getCashDetail', {id:id})
}

// 我的团队
export const getTeamList = function (page,limit,group) {
  return http.post('my/team_list_new', {page:page,limit:limit,group:group})
}
// 团队详情
export const getUserDetail = function (uid) {
  return http.post('my/getUserDetail', {uid:uid})
}

// 关于我们

export const getAbout= function (id) {
  return http.post('my/about', {id:id})
}

// 微信客服

export const getWxNum= function () {
  return http.post('my/getWxNum', {})
}

export const getNewDetails= function (news_id) {
  return http.post('News/detail', {news_id:news_id})
}



// 激活
export const getStockActive = function (name) {
  return http.post('/stock/active', {name})
}

// 个人中心
export const myIndex = function (token) {
  return http.post('stock/myIndex', {token:token})
}






