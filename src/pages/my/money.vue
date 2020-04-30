<template>
  <div id="money">
    <tab
      :line-width="2"
      custom-bar-width=".4rem"
      default-color="#333"
      active-color="#e65013"
      v-model="statusTabIndex"
    >
      <tab-item @on-item-click="resetStatus('all')">全部</tab-item>
      <tab-item @on-item-click="resetStatus(1)">收入</tab-item>
      <tab-item @on-item-click="resetStatus(2)">支出</tab-item>
    </tab>
    <div class="moneyBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div id="empty"></div>
        <div class="moneyList" v-for="(item,index) in list" :key="index" @click="orderDetails(item.id)">
          <div class="type">
            <span class="left">{{item.type_name}}</span>
            <span v-if="item['money_type'] == 1" class="right1">- {{item.money}}</span>
            <span v-if="item['money_type'] == 2" class="right2">+ {{item.money}}</span>
          </div>
          <div class="time">
            <span>{{item.create_time}}</span>
            <span>剩余￥{{item.surplus}}</span>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { Tab, TabItem } from "vux";
import MescrollVue from "mescroll.js/mescroll.vue";
import store from "../../store";
export default {
  components: {
    Tab,
    TabItem,
    MescrollVue
  },
  data() {
    return {
      selectedStatus: "all",
      statusTabIndex: 0,
      list: [],
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: true
      },
      mescrollUp: {
        use: true,
        callback: this.upCallback,
        page: {
          num: 0,
          size: 1
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: "",
        noMoreSize: 5,
        toTop: {
          // src: "./static/img/auth/back_top.png",
          // offset: 1000
        },
        empty: {
          warpId: "empty",
          icon: "./static/img/auth/kong.png",
          tip: "暂无相关数据~"
        }
      },
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    };
  },
  beforeRouteLeave(to, from, next) {
    let that = this;
    if (that.mescroll) {
      that.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
    }
    next();
  },
  methods: {
    resetStatus(data) {
      this.selectedStatus = data;
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      this.mescrollUp.htmlLoading =
        '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>';
      apiHttp
        .getMoneyList(page.num, this.statusTabIndex, store.state.global.token)
        .then(res => {
          if (res.code === 1) {
            let arr = res.data;
            if (page.num === 1) this.list = [];
            this.list = this.list.concat(arr);
            console.log(this.list);
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length);
            });
          } else {
            mescroll.endErr();
          }
        })
        .catch(e => {
          mescroll.endErr();
        });
    },
    orderDetails(id) {
      this.$router.push({
        name: "moneyDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#money {
  background: #f2f2f2;
  height: 100%;
  position: relative;
  .moneyBox {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    .moneyList {
      margin: 0.2rem 0.3rem;
      border-radius: 0.2rem;
      background: #fff;
      padding: 0.2rem 0.6rem 0.2rem 0.2rem;
      position: relative;
      .type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          color: #212121;
          font-size: 0.32rem;
        }
        .right1 {
          font-size: 0.4rem;
          font-weight: 500;
          color:#757575
        }
        .right2{
          font-size: 0.4rem;
          font-weight: 500;
          color: #e51c23
        }
      }
      .time{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.24rem;
        color: #b2b2b2;
      }
    }
   .moneyList::before{
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
  }
}
</style>