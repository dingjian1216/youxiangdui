<template>
  <div id="cashList">
    <tab
      :line-width="2"
      custom-bar-width=".4rem"
      default-color="#333"
      active-color="#e65013"
      v-model="statusTabIndex"
    >
      <tab-item @on-item-click="resetStatus('all')">全部</tab-item>
      <tab-item @on-item-click="resetStatus(1)">审核中</tab-item>
      <tab-item @on-item-click="resetStatus(2)">未通过</tab-item>
      <tab-item @on-item-click="resetStatus(3)">已完成</tab-item>
    </tab>
    <div class="cashListBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div id="empty"></div>
        <div class="list" v-for="(item,index) in list" :key="index" @click="orderDetails(item.id)">
          <div class="left">
            <img :src="item.bank_img" alt />
          </div>
          <div class="right">
            <div class="name">
              <span class="bank">{{item.bankname}}</span>
              <span v-if="item['status'] == 1" class="warning">审核中</span>
              <span v-if="item['status'] == 2" class="danger">已驳回</span>
              <span v-if="item['status'] == 3" class="success">已完成</span>
            </div>
            <div class="money">
              <span>尾号{{item.card_jh}}</span>
              <span>￥{{item.money}}</span>
            </div>
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
        .getApplyList(store.state.global.token, this.statusTabIndex, page.num)
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
        name: "cashDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#cashList {
  height: 100%;
  background: #f2f2f2;
  position: relative;
  .cashListBox {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    padding-bottom: 0.2rem;
    .list {
      margin: 0.2rem 0.3rem 0;
      background: #ffffff;
      border-radius: 0.2rem;
      padding: 0.3rem;
      display: flex;
      .left {
        flex: 1;
        margin-right: 0.2rem;
        img {
          width: 100%;
        }
      }
      .right {
        padding-right: 0.3rem;
        flex: 5;
        position: relative;
        .name {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .bank {
            font-size: 0.32rem;
            font-weight: 500;
            color: #212121;
          }
          .success {
            color: #ffc107 !important;
          }
          .danger {
            color: #e51c23 !important;
          }
          .success {
            color: #009688 !important;
          }
        }
        .money {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #757575;
          font-size: 0.28rem;
        }
      }
      .right::before {
        content: "";
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        top: 50%;
        right: 0rem;
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
}
</style>