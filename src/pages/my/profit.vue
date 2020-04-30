<template>
  <div id="profit">
    <div class="profitHead">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      <div style="opacity: 0.65">总收益</div>
      <div class="sum-money">{{user.sum_money|e}}</div>
      <div class="lj-money">当前余额 {{user.money|e}} 元</div>
      <div class="listBox">
        <div class="list" >
          <div class="name">兑换收益（元）</div>
          <div class="my-money">{{user.dh_money|e}}</div>
        </div>
        <div class="list" >
          <div class="name">推广奖励（元）</div>
          <div class="my-money">{{user.tg_money|e}}</div>
        </div>
        <div class="list" >
          <div class="name">充值返现（元）</div>
          <div class="my-money">{{user.fx_money|e}}</div>
        </div>
      </div>
    </div>
    <ul class="nav">
      <li @click="jumpTo('/money')">
        <span class="iconfont icon-jifen1"></span>
        收支明细
      </li>
    </ul>
    <ul class="nav">
      <li @click="jumpTo('/cashOut')">
        <span class="iconfont icon-tixian ti"></span>
        提现
      </li>
      <li @click="jumpTo('/cashList')">
        <span class="iconfont icon-tixian tilv"></span>
        提现记录
      </li>
    </ul>
    <!-- <div id="myChart" :style="{width: '7.5rem', height: '300px'}"></div> -->
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import store from "../../store";
export default {
  data() {
    return {
      user: " "
    };
  },
  filters: {
    e: function(value) {
      return value || "0.00";
    }
  },
  mounted() {
    apiHttp.getUserMoneyInfo(store.state.global.token).then(res => {
      if (res.code == 1) {
        this.user = res.data.userInfo;
        var data = res.data.userInfo;
        var series_data = [
          data.dh_money,
          data.tong_ji_money,
          data.ji_cha_money,
          data.tuan_dui_money,
          data.fx_money,
          data.tgjl_money
        ];
        this.drawLine(series_data);
      }
    });
    
  },
  methods: {
    drawLine(series_data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          data: [
            "兑换奖励",
            "同级奖励",
            "级差奖励",
            "团队奖励",
            "充值返现",
            "推广充值"
          ]
        },
        yAxis: {},
        series: [{
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "top"
                }
              }
            },
            data: series_data
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
#profit {
  height: 100%;
  position: relative;
  background: #f2f2f2;
  .profitHead {
    text-align: center;
    color: #fff;
    padding-top: 1rem;
    background: #e65013 url(../../assets/img/touming.png) no-repeat center;
    background-size: 100% 100%;
    // position: relative;
    .iconfont {
      position: absolute;
      top: 0.4rem;
      left: 0.3rem;
    }
    .sum-money {
      font-size: 0.8rem;
      font-weight: bold;
    }
    .lj-money {
      margin-bottom: 0.3rem;
    }
    .listBox {
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: 0.2rem 0;
      background-color: rgba(0, 0, 0, 0.1);
      .list {
        flex: 1;
        text-align: center;
        .name {
          font-size: 0.24rem;
        }
        .my-money {
          margin-top: 0.1rem;
        }
      }
    }
  }
  .nav {
    margin-top: 0.2rem;
    background: #ffffff;
    li {
      border-bottom: 1px solid #eeeeee;
      padding: 0 0.3rem;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #212121;
      position: relative;
      .iconfont {
        font-size: 0.4rem;
        margin-right: 0.1rem;
      }
      .icon-jifen1 {
        color: #fdaf04;
      }
      .ti {
        color: #1296db;
      }
      .tilv {
        color: #0ba194;
      }
    }
    li::before {
      content: "";
      width: 0.2rem;
      height: 0.2rem;
      position: absolute;
      top: 50%;
      right: 0.3rem;
      margin-top: -0.1rem;
      background: transparent;
      border: 1px solid #dddddd;
      border-top: none;
      border-right: none;
      z-index: 2;
      -webkit-border-radius: 0;
      border-radius: 0;
      -webkit-transform: rotate(-135deg);
      transform: rotate(-135deg);
    }
    li:last-child {
      border-bottom: none;
    }
  }
}
</style>