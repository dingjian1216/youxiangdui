<template>
  <div id="achievement">
    <x-header :left-options="{showBack: false}" style="background: #e65013;border-bottom:none">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      积分兑换
    </x-header>
    <div class="head">
      <div class="title">兑换积分汇总</div>
      <div class="integral">
        <div class="list">
          <div class="my-num">
            {{user.sum_integral||'0'}}
            <span>积分</span>
          </div>
          <div class="name">累计兑换</div>
        </div>
        <div class="list">
          <div class="my-num">
            {{user.dh_money||'0.00'}}
            <span>元</span>
          </div>
          <div class="name">总价值</div>
        </div>
      </div>
    </div>
    <div class="applyBox">
      <div class="title">达标返现</div>
      <div class="applyContent">
        <table class="table" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th class="top">达标条件</th>
              <th>达标金额</th>
              <th class="topright">是否发放</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vo, index) in user['dabiao']" :key="index">
              <td>{{vo.jifen | result}}万</td>
              <td>{{vo.money}}</td>
              <td v-if="vo.done == 1">已发放</td>
              <td v-else>暂未达标</td>
            </tr>
          </tbody>
        </table>
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
      user: ""
    };
  },
  filters: {
    result: function(val) {
      return val / 10000
    }
  },
  mounted() {
    apiHttp.getIntegral(store.state.global.token).then(res => {
      if (res.code == 1) {
        this.user = res.data;
      }
    });
  }
};
</script>
<style lang="less" scoped>
#achievement {
  height: 100%;
  position: relative;
  overflow-y: scroll;
  background: #f2f2f2;
  .head {
    color: #fff;
    background: #e65013 url(../../assets/img/touming.png) no-repeat center;
    background-size: 100% 100%;
    padding: 0.4rem 0.3rem;
    .title {
      font-size: 0.32rem;
    }
    .integral {
      margin-top: 0.3rem;
      display: flex;
      align-items: center;
      .list {
        flex: 1;
        .my-num {
          font-size: 0.52rem;
          font-weight: 100;
          span {
            font-size: 0.28rem;
          }
        }
        .name {
          font-size: 0.28rem;
          opacity: 0.6;
        }
      }
    }
  }
  .applyBox {
    margin: 0.3rem;
    position: relative;
    word-break: break-all;
    background: #ffffff;
    .title {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.3rem;
      font-size: 0.32rem;
      color: #000;
      font-weight: 600;
      border-radius: 0.2rem;
    }
    .applyContent {
      padding: 0.2rem 0;
    }
    .table {
      width: 6.5rem;
      margin: 0.2rem;
      border: 1px solid #ddd;
      // border-collapse: collapse;
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      .top {
        border-top-left-radius: 0.2rem;
      }
      .topright {
        border-top-right-radius: 0.2rem;
      }
      th,
      td {
        font-size: 0.34rem;
        padding: 0.2rem 0;
        color: #888888;
        border: 1px solid #ddd;
        border-collapse: collapse;
        text-align: center;
      }
    }
  }
  .explain {
    margin: 0 0.3rem;
    padding: 0 0.3rem;
    background: #ffffff;
    border-radius: 0.2rem;
    .title {
      padding: 0.2rem 0.3rem;
      font-size: 0.32rem;
      color: #000;
      font-weight: 600;
      border-radius: 0.2rem;
      border-bottom: 1px solid #eeeeee;
    }
    .explainBox {
      padding-bottom: 0.2rem;
      font-size: 0.28rem;
      color: #757575;
    }
  }
}
</style>