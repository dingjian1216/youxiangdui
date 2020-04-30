<template >
  <div class="realName">
    <div class="infoBox">
      <group>
        <x-input title="真实姓名：" placeholder="请输入真实姓名" v-model="realname"></x-input>
        <x-input title="身份证号:" placeholder="请输入身份证号" v-model="card"></x-input>
        <x-input title="支付宝账号:" placeholder="请输入支付宝账号" v-model="alipay"></x-input>
      </group>
    </div>
    <div class="realBtn" @click="real">实名认证</div>
  </div>
</template>
<script>
import { Group, Cell, XInput } from "vux";
import * as apiHttp from "../../api/index";
import store from "../../store";
export default {
  components: {
    Group,
    Cell,
    XInput
  },
  data() {
    return {
      realname: "",
      card: "",
      alipay: ""
    };
  },
  methods:{
    real(){
      var re = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      var re1 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
      if(!re.test(this.card) && !re1.test(this.card)){
        this.$vux.toast.text("身份证号码不正确");
        return;
      }
      apiHttp.getAuth(this.realname, this.card,this.alipay,store.state.global.token).then(res => {
        if (res.code === 1) {
         this.$vux.toast.text(res.msg);
         this.$router.go(-1)
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
.realName .weui-cells {
  font-size: 0.3rem;
}

.realName .weui-cell__hd {
  width: 2rem;
}
.realName .realBtn{
    margin: 1.5rem 0.3rem;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background: #e65013;
    color: #fff;
    font-size: 0.3rem;
    border-radius: 0.2rem;
}
</style>