<template>
  <div class="teamDetail">
    <div class="head">
      <img src="../../assets/img/bj0003.png" class="bj" alt />
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="teamMsg">
        <img :src="info.picture" class="avatar" />
        <h2 class="nickname">{{info.nickname}}</h2>
        <div class="level"> 等级： <div class="level_name">{{info.level_name}}</div></div>
      </div>
    </div>
    <div class="detailBox">
      <div class="detailList">
        <div class="left">
          <span class="iconfont icon-leijishouyi "></span>
          累计收益
        </div>
        <div class="right"> {{info.sum_sy}} 元</div>
      </div>
      <div class="detailList">
        <div class="left">
          <span class="iconfont  icon-dingdanbishu"></span>
          兑换笔数
        </div>
        <div class="right"> {{info.sum_bs}} 笔</div>
      </div>
      <div class="detailList">
        <div class="left">
          <span class="iconfont icon-tuandui"></span>
          团队人数
        </div>
        <div class="right">  {{info.sum_tdrs}} 人</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import store from "../../store";
export default {
  data() {
    return {
      info: "",
      uid: this.$route.query.uid
    };
  },
  mounted() {
    apiHttp.getUserDetail(this.uid).then(res => {
      if (res.code == 1) {
        this.info = res.data;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.teamDetail{
  height: 100%;
  position: relative;
  background: #f2f2f2;
  .head{
    position: relative;
    height: 4.8rem;
    overflow: hidden;
    .backBox{
      position: absolute;
      left: 0.3rem;
      top: 0.4rem;
      color: #fff;
    }
    .teamMsg{
      position: absolute;
      top: 1.5rem;
      left: 0;
      right: 0;
      text-align: center;
      color: #fff;
      .avatar{
        width: 1rem;
        border-radius: 0.5rem;
      }
      .nickname{
        font-size: 0.36rem;
      }
      .level{
        display: flex;
        justify-content:center;
        align-items: center;
        .level_name{
          padding: 0.04rem 0.15rem;
          background: #108ee9;
          color:#fff;
          border-radius: 0.06rem;
          font-size: 0.24rem;
        }
      }
    }
  }
  .detailBox{
    margin-top: 0.2rem;
    background: #ffffff;
    .detailList{
      height: 1rem;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .left{
        font-size: 0.32rem;
        color: #212121;
        .iconfont{
          font-size: 0.46rem;
          margin-right: 0.2rem;
          vertical-align: middle;
        }
        .icon-leijishouyi{
          color: #ef5656;
        }
        .icon-dingdanbishu{
          color: #7453f6;
        }
        .icon-tuandui{
          color:#2DC6F6
        }
      }
      .right{
        color: #757575;
        font-size: 0.28rem;
      }
    }
  }
}
</style>