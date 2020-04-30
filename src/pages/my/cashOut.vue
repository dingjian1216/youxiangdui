<template>
  <div id="cashOut">
    <div class="cash">
      <div class="list">
        <div>真实姓名</div>
        <input type="text" v-model="name" placeholder="请输入真实姓名" />
      </div>
      <div class="list">
        <div>支付宝</div>
        <input type="text" v-model="alipay" placeholder="请输入支付宝账号" />
      </div>
      <div class="list">
        <div>提现金额</div>
        <input type="number" v-model="money" placeholder="请输入提现金额" />
      </div>
    </div>
    <p class="user_money">可提现金额：<b class="info">￥{{user_money||'0.00'}}</b></p>
    <div class="cashBtn" @click="submit()">提现</div>
    <div class="explain">
        <p>1，每天提现一笔，到本人支付宝账户</p>
        <p>2，提现时间为09:00 ~ 20:00</p>
        <p>3，提现1000元以内秒到</p>
        <p>4，超过1000元，仅限工作日提现，当天18:00到账</p>
        <p>5，姓名和支付宝必须一致</p>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import store from "../../store";
export default {
  data() {
    return {
      name: "", //真实姓名
      alipay: "", //支付宝
      money: "", //提现金额
      isBind: false,
      user_money: "" //可提现金额
    };
  },
  mounted() {
    apiHttp.getUserInfo(store.state.global.token).then(res => {
      if (res.code == 1) {
        this.name = res.data.name;
        this.isBind = res.data.isBind;
        this.user_money = res.data.money;
      }
    });
  },
  methods: {
    submit(){
      if(!this.name){
        this.$vux.toast.text("请输入真实姓名");
        return;
      }
      if(!this.alipay){
        this.$vux.toast.text("请输入支付账号");
        return;
      }
      if(!this.money){
        this.$vux.toast.text("请输入提现金额");
        return;
      }
      apiHttp.getApply(store.state.global.token,this.name,this.alipay,this.money).then(res=>{
        if(res.code == 1){
          this.$vux.toast.text(res.msg)
          setTimeout(() => {
            this.$router.go(-1)
          }, 200)
        }else{
          this.$vux.toast.text(res.msg)
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
#cashOut {
  height: 100%;
  background: #f2f2f2;
  position: relative;
  .cash {
    padding-top: 0.3rem;
    background: #ffffff;
    .list {
      height: 0.88rem;
      line-height: 0.88rem;
      padding: 0 0.3rem;
      border-bottom: 1px solid #eeeeee;
      color: #212121;
      display: flex;
      font-size: 0.28rem;
      div {
        flex: 1;
      }
      input {
        border: none;
        flex: 4;
      }
    }
  }
  .user_money{
    margin: 0.3rem;
    font-size: 0.3rem;
    color: #757575;
    .info{
      color: #e65013;
      font-size: 0.36rem;
    }
  }
  .cashBtn{
    margin: 0.3rem;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background: #e65013;
    color:#fff;
    font-size: 0.3rem;
    border-radius: 0.2rem;
  }
  .explain{
    padding: 0.3rem;
    font-size: 0.28rem;
    color: #757575;
  }
}
</style>