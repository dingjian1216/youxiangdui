<template>
  <div id="message">
    <x-header :left-options="{showBack: false}" style="background: #e65013;">通知消息</x-header>
    <tab
      :line-width="2"
      custom-bar-width="2rem"
      default-color="#333"
      active-color="#e65013"
      v-model="statusTabIndex"
    >
      <tab-item @on-item-click="resetStatus(1)">公告</tab-item>
      <tab-item @on-item-click="resetStatus(2)">私信</tab-item>
    </tab>
    <div class="box">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div
          class="messageList"
          v-for="(item,index) in messageBox"
          :key="index"
          @click="getDetail(item.id)"
        >
          <div class="time">{{item.time}}</div>
          <div class="content">
            <img src="../../assets/img/laba.png" alt />
            <div>{{item.title}}</div>
          </div>
        </div>
        <div id="d7"></div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import * as apiHttp from "../../api/index";
import store from "../../store";
import { Tab, TabItem } from "vux";
export default {
  name: "message",
  components: {
    MescrollVue,
    Tab,
    TabItem
  },
  data() {
    return {
      selectedStatus: "1",
      statusTabIndex: 0,
      messageBox: [],
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        use: true,
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5,
        toTop: {
          src: "./static/img/auth/back_top.png",
          offset: 1000
        },
        empty: {
          warpId: "d7",
          icon: "./static/img/auth/kong.png",
          tip: "暂无相关数据"
        }
      }
    };
  },
  methods: {
    refresh: function() {
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    resetStatus(data) {
      this.selectedStatus = data;
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      apiHttp
        .getNewList(this.selectedStatus, store.state.global.token, page.num)
        .then(ret => {
          if (ret.code == 1) {
            console.log(ret);
            var list = ret.data;
            if (page.num === 1) this.messageBox = [];
            this.messageBox = this.messageBox.concat(list);
            this.$nextTick(() => {
              this.mescroll.endSuccess(list.length, true);
            });
          }
        })
        .catch(e => {
          mescroll.endErr();
        });
    },
    getDetail(id) {
      this.$router.push({
        name: "newDetail",
        query: {
          id: id,
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
#message {
  height: 100%;
  font-size: 0.3rem;
  background: #f5f5f5;
  position: relative;
  .box {
    position: absolute;
    top: calc(44px + 0.88rem);
    left: 0;
    right: 0;
    bottom: 0;
  }
  .messageList {
    margin: 0 0.3rem;
    padding: 0.1rem 0.15rem;
    border-radius: 0.1rem;
    background: #ffffff;
    margin-top: 0.2rem;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    .content {
      display: flex;
      align-items: center;
      text-align: left;
      font-size: 0.28rem;
      columns: #999999;
      img {
        width: 0.6rem;
        margin-right: 0.2rem;
      }
    }
  }
}
</style>