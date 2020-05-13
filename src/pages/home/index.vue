<template>
  <div class="home" v-cloak>
    <header :style="{paddingTop: statusH + 'rem'}">
      <div class="aui-bar">
        <div class="left" @click="service()">
          <span class="iconfont icon-icon_kefu"></span>
          <p>客服</p>
        </div>
        <span class="name">可兑智能机</span>
        <div class="right" v-if="play" @click="isPlay()">
          <span class="iconfont icon-laba"></span>
          <p>播放</p>
        </div>
        <div class="right" v-else @click="isPlay()">
          <span class="iconfont icon-jingyin"></span>
          <p>静音</p>
        </div>
      </div>
      <div class="homeNav">
        <div class="navList" @click="jumpTo('/myOrder')">
          <span class="iconfont icon-tianchongxing-"></span>
          报单管理
        </div>
        <div class="navList" @click="jumpTo('/my')">
          <span class="iconfont icon-gerenzhongxin"></span>
          终端详情
        </div>
      </div>
    </header>
    <div class="box" :style="{marginTop: statusH + 'rem'}">
      <div class="bankBox" id="bankBox">
        <div
          class="bankList"
          v-for="(item,index) in bankBox"
          :key="index"
          @click="jumpGood(item.id)"
        >
          <img :src="item.logo" alt />
          <div class="ico" v-show="item.settlement == '全天秒结'">秒审</div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import * as apiHttp from "../../api/index";
import "swiper/dist/css/swiper.css";
import MescrollVue from "mescroll.js/mescroll.vue";
import EditSlide from "../../components/EditSlide";
import store from "../../store";
export default {
  name: "home",
  components: {
    swiper,
    swiperSlide,
    MescrollVue,
    EditSlide
  },

  data() {
    return {
      play: true,
      bankBox: [],
      userInfo: "",
      statusH: ""
    };
  },
  inject: ["reload"],
  beforeRouteEnter(to, from, next) {
    if (from.name == "bankMsg") {
      to.meta.isBack = true;
    }
    next();
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  mounted: function() {
    apiHttp.getHomeNew().then(res => {
      if (res.code === 1) {
        this.bankBox = res.data.list;
      }
    });
  },

  methods: {
    isPlay: function() {
      if (this.play) {
        this.play = false;
        var bdTTS = api.require("bdTTS");
        bdTTS.release(function(ret) {});
      } else {
        this.play = true;
        var bdTTS = api.require("bdTTS");
        bdTTS.init(
          {
            mode: "MIX"
          },
          function(ret) {}
        );
      }
    },
    jumpGood: function(id) {
      this.$router.push({
        name: "bankMsg",
        query: {
          id: id
        }
      });
    },
    service() {
      var browser = api.require("webBrowser");
      browser.open({
        url: 'http://mam.jiweilianmeng.com/Web/im.aspx?_=t&accountid=119041&visitorname='+this.userInfo.name+'&visitorid='+this.userInfo.mobile+''
      });
    }
  }
};
</script>

<style scoped lang="less">
.home {
  font-size: 0.3rem;
  height: 100%;
  header {
    background: #e65013;
    color: #ffffff;
    padding: 0 0.3rem;
    .aui-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.2rem;
      font-size: 0.28rem;
      text-align: center;
      .iconfont {
        font-size: 0.4rem;
      }
      .name {
        font-weight: 500;
        font-size: 0.32rem;
      }
    }
    .homeNav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.15rem 0;
      .navList {
        width: 3.3rem;
        height: 0.8rem;
        border-radius: 0.1rem;
        border: 1px solid #ffffff;
        line-height: 0.8rem;
        text-align: center;
        font-weight: 500;
        .iconfont {
          font-size: 0.45rem;
          margin-right: 0.15rem;
          vertical-align: middle;
        }
      }
    }
  }
  .box {
    position: absolute;
    top: 2.3rem;
    left: 0rem;
    right: 0rem;
    bottom: 1rem;
    height: auto;
    overflow-y: scroll;
    background: #eeeeee;
  }
  .bankBox {
    height: 100%;
    padding: 0 0.3rem 2rem;
    .bankList {
      width: 1.55rem;
      height: 2rem;
      background: #ffffff;
      border-radius: 0.1rem;
      margin-left: 0.2rem;
      float: left;
      margin-top: 0.2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        width: 0.8rem;
        height: 0.8rem;
      }
      .name {
        margin-top: 0.2rem;
        font-size: 0.24rem;
      }
      .ico {
        position: absolute;
        top: 0.1rem;
        right: 0.15rem;
        font-size: 0.18rem;
        padding: 0 2px 0 3px;
        border-radius: 0.3rem 0.3rem 0.3rem 0;
        background: #ff6659;
        color: #fff;
        border: 3px solid #fff;
      }
    }
    .bankList:nth-child(4n + 1) {
      margin-left: 0;
    }
  }
}
</style>
