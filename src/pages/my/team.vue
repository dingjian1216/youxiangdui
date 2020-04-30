<template>
  <div id="team">
    <tab
      :line-width="2"
      custom-bar-width=".4rem"
      default-color="#333"
      active-color="#e65013"
      v-model="statusTabIndex"
    >
      <tab-item @on-item-click="resetStatus('all')">全部</tab-item>
      <tab-item @on-item-click="resetStatus(1)">会员</tab-item>
      <!-- <tab-item @on-item-click="resetStatus(2)">黄金会员</tab-item> -->
      <tab-item @on-item-click="resetStatus(3)">代理</tab-item>
    </tab>
    <div class="teamBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div id="empty"></div>
        <div class="teamList" v-for="(vo,index) in list" :key="index" @click="orderDetails(vo.id)">
            <div class="teamLeft">
              <img :src="vo.picture"/>
            </div>
            <div class="teamRight">
               <div class="userMsg">
                 <span class="name">{{vo.nickname}}</span>
                 <span class="level">{{vo.level_name}}</span>
               </div>
               <div class="mobile">{{vo.mobile}}</div>
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
          size: 10
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
  created() {
    if (this.$route.query.index) {
      this.statusTabIndex = this.$route.query.index;
    }
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
      apiHttp.getTeamList(store.state.global.token,page.num,page.size,this.statusTabIndex,)
        .then(res => {
          if (res.code === 1) {
            let arr = res.data.data;
            if (page.num === 1) this.list = [];
            this.list = this.list.concat(arr);
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
        name: "teamDetail",
        query: {
          uid: id
        }
      });
    }
  }
};
</script>
<style lang="less">
#team {
  height: 100%;
  .teamBox {
    position: relative;
    background: #f5f5f5;
    height: calc(100% - 44px);
    .teamList {
      background: #ffffff;
      padding: 0.2rem 0.3rem;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      align-items: center;
      .teamLeft {
        width: 1rem;
        margin-right: 0.2rem;
        img {
          width: 1rem;
          border-radius: 50%;
        }
      }
      .teamRight{
        position: relative;
        width: 5.7rem;
        .userMsg{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.3rem;
          padding-right: 0.35rem;
          .name{
            color: #212121
          }
          .level{
            color: #757575;
          }
        }
      }
      .teamRight::before {
        content: "";
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        top: 50%;
        right: 0.1rem;
        margin-top: -0.1rem;
        background: transparent;
        border: 1px solid #666666;
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