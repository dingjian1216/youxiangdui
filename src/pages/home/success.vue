<template>
  <div class="success">
     <x-header :left-options="{showBack: false}" style="background: #e65013;">
      <a slot="left" @click="goBack1()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      报单成功
    </x-header>
    <div class="info">
      <i class="iconfont icon-chenggong"></i>
      <h1>报单成功</h1>
      <p class="aui-margin-t-10 font-hui">报单已提交，我们将尽快为您处理</p>
    </div>
    <div class="successBtn" style="margin-top: 30px;">
      <div  @click="home()" class="btn one">再来一单</div>
      <div @click="see()" class="btn see">查看订单</div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    see(){
       this.$router.push({
        name: "myOrder",
        query: {
          index: 1
        }
      });
    },
    home(){
      this.$router.go(-4)
    },
    goBack1(){
      this.$router.go(-2)
    }
  }
}
</script>
<style lang="less" scoped>
.success {
  background: #f2f2f2;
  .info {
    background: #ffffff;
    text-align: center;
    padding: 30px;
    .iconfont {
      font-size: 60px;
      color: #e65013;
    }
    .font-hui {
      color: #a3a3a3 !important;
      font-size: 0.28rem;
      margin-top: 0.2rem;
    }
  }
  .successBtn {
    margin: 0.3rem;
    position: relative;
    div {
      height: 0.88rem;
      line-height: 0.88rem;
      font-size: 0.32rem;
      text-align: center;
      border-radius: 0.2rem;
    }
    .one {
      color: #ffffff !important;
      background-color: #e65013 !important;
    }
    .see {
      margin-top: 0.2rem !important;
      background: #dddddd;
      color: #212121;
    }
  }
}
</style>