<template>
  <div id="app">
    <div id="header" :style="{height: h,}"></div>
    <div class="viewBox" :style="{top: h}">
      <router-view v-if="isRouterAlive" />
    </div>
    <!-- 后台添加更新 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast1" class="updateBox">
        <!--<div class="weui-mask"></div>-->
        <div class="update">
          <img src="./assets/img/update.png" alt class="bg" />
          <div class="contentBox">
            <div class="add" v-if="version.remark">
              <p class="t">新版本特性</p>
              <p class="info">{{version.remark}}</p>
            </div>
            <div class="update_btn">
              <span @click="downWgt">立即升级</span>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>

    <!-- 下载进度 -->
    <div v-transfer-dom>
      <x-dialog
        v-model="showToast4"
        :dialog-style="{'max-width': '100%', 'background-color': 'transparent'}"
        class="progressBox"
      >
        <div class="progressBg">
          <img src="./assets/img/updateBox.png" alt />
          <span  class="prState">{{progressState}}</span>
          <x-progress :percent="percent" :show-cancel="false"></x-progress>
          <span class="title">新版本正在努力的更新中，请稍等</span>
        </div>
      </x-dialog>
    </div>

    <!-- 激活终端 -->
    <div v-transfer-dom>
      <x-dialog v-model="SnName" id="snAction">
        <div class="snUserMsg">
          <p class="title">激活机器</p>
          <div class="machineBox">
            <div class="machineList">
              <input type="number" placeholder="代理商账号" v-model="username" />
            </div>
            <div class="machineList">
              <input type="text" placeholder="代理商密码" v-model="password" />
            </div>
            <div class="machineList">
              <input type="text" placeholder="请输入终端名称" v-model="name" />
            </div>
          </div>
          <div class="machineBtn" @click="onConfirm()">确定</div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="activity" id="showActivity" hide-on-blur>
        <div class="showAction">
          <img :src="active.cover" alt class="bg" @click="gourl()" />
          <img src="./assets/img/close.png" class="close" @click="activity = false" />
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import * as utils from "./utils";
import { XDialog, Confirm,XProgress, TransferDomDirective as TransferDom } from "vux";
export default {
  components: {
    XDialog,
    Confirm,
    XProgress
  },
  directives: {
    TransferDom
  },
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      activity: false,
      active: "",
      h: "",
      sn: "",
      name: "",
      username: "",
      password: "",
      anh: 25,
      SnName: false,
      iosh: 20,
      hideTitle: ["home", "my", "sign"],
      version: "",
      progressState: '准备中',
      percent: 0,
      showToast1: false,
      showToast4: false,
      transitionName: "",
      address: ""
    };
  },
  watch: {
    $route(to, from) {
      if (window.api) {
        if (this.hideTitle.indexOf(to.name) > -1) {
          this.h = 0;
        } else {
          if (api.systemType === "android") {
            this.h = this.anh;
          } else {
            this.h = this.iosh;
          }
        }
      } else {
        this.h = this.anh;
      }

      var bdTTS = api.require("bdTTS");
      bdTTS.speakPause(function(ret) {});
      if (to.name == "home") {
        let text = "选择可兑,一切可兑";
        var bdTTS = api.require("bdTTS");
        bdTTS.speak(
          {
            text: text
          },
          function(ret) {}
        );
      }
      let systemVersion = (window.api && api.systemVersion) || "6.0";
      if (parseFloat(systemVersion) < 6.0) {
        this.colors = "#e65013";
      } else {
        this.colors = "#fff";
      }
    }
  },
  created() {
    let that = this;
    // 进入前台
    let size = document.documentElement.clientWidth / 7.5;
    if (window.api) {
      if (api.systemType === "android") {
        this.h = api.safeArea.top / size + "rem";
        this.anh = this.h;
      } else {
        this.h = api.safeArea.top / size + "rem";
        this.iosh = this.h;
      }
    }
    if (this.hideTitle.indexOf(that.$route.name) > -1) {
      this.h = 0;
    }
    window.api &&
      api.setStatusBarStyle({
        style: "white",
        color: "#e65013"
      });
    let systemVersion = (window.api && api.systemVersion) || "6.0";
    if (parseFloat(systemVersion) < 6.0) {
      that.colors = "#e65013";
    } else {
      that.colors = "#fff";
    }
    
    this.isSn();
    this.getAddress();
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    // 检查更新
    getVersion(){
     let that = this
      this.$http.post('/agent/login/checkVersion', {
        type: 2,
        version: api.appVersion,
      }, false, true).then(res => {
        if (res.code === 1) {
            if(res.data == 0){
              this.getAdvertisement();
            }else{
              this.version = res.data
              this.showToast1 = true
            }
        }
      })
    },
    downWgt() {
      let that = this;
      this.showToast1 = false;
      that.showToast4 = true;
      api.download(
        {
          url: that.version.src,
          report: true
        },
        function(ret, err) {
          if (ret && ret.state === 0) {
            that.percent = parseInt(ret.percent);
            // that.perCon = parseInt(ret.percent) + '%'
            that.progressState = "下载中" + that.percent + "%";
          }
          if (ret && ret.state === 1) {
            that.progressState = "安装中";
            let savePath = ret.savePath;
            api.installApp({
              appUri: savePath
            });
          }
        }
      );
    },

    isSn() {
      let that = this;
      let Getsn = api.require("moduleDemo");
      Getsn.getSn({}, function(ret) {
        if (ret.sn) {
          that.$store.commit("setSn", ret.sn);
          that.sn = ret.sn;
          that.checkSN(ret.sn);
        }
      });
    },
    checkSN(sn) {
      this.$http.post("/api/stock/checkSN", { sn: sn }).then(res => {
        if (res.code === 1) {
          if (res.data.status !== 2) {
            this.SnName = true;
          } else {
            this.$store.commit("setUserName", res.data);
            this.getVersion()
          }
        }
      });
    },
    getAdvertisement() {
      this.$http.post("/api/news/getAdvertisement", {}).then(res => {
        if (res.code === 1 && res.data.cover) {
          this.activity = true;
          this.active = res.data;
        }
      });
    },
    gourl() {
      if (this.active.url) {
        var browser = api.require("webBrowser");
        this.activity = false;
        browser.open({
          url: this.active.url
        });
      } else {
        this.activity = false;
      }
    },
    getAddress() {
      var bMap = api.require("bMap");
      var that = this;
      bMap.getLocation(
        {
          accuracy: "100m",
          autoStop: true,
          filter: 1
        },
        function(ret, err) {
          if (ret.status) {
            bMap.getNameFromCoords(
              {
                lon: ret.lon,
                lat: ret.lat
              },
              function(ret, err) {
                if (ret.status) {
                  that.address =
                    ret.province +
                    "-" +
                    ret.city +
                    "-" +
                    ret.district +
                    "-" +
                    ret.streetName +
                    "-" +
                    ret.streetNumber;
                }
              }
            );
          } else {
            alert(err.code);
          }
        }
      );
    },
    onConfirm(value) {
      let that = this;
      this.$http
        .post("/api/stock/transfer_active", {
          sn: this.sn,
          name: this.name,
          address: this.address,
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.code == 1) {
            this.SnName = false;
            that.$vux.toast.text(res.msg);
            that.getVersion()
            that.$store.commit("setUserName", res.data);
          } else {
            that.$vux.toast.text(res.msg);
          }
        });
    }
  },
  mounted() {
    var bdTTS = api.require("bdTTS");
    bdTTS.init(
      {
        mode: "MIX"
      },
      function(ret) {}
    );
    var bdTTS = api.require("bdTTS");
    bdTTS.speakPause(function(ret) {});
    let text = "选择可兑,一切可兑";
    var bdTTS = api.require("bdTTS");
    bdTTS.speak(
      {
        text: text
      },
      function(ret) {}
    );
  }
};
</script>
<style lang="less">
#showActivity .weui-dialog {
  background-color: transparent;
  z-index: 5010;
}
.showAction {
  .close {
    margin-top: 0.2rem;
    width: 0.5rem;
  }
}
</style>
<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "./assets/less/app.less";
@import "./assets/less/font.css";
.weui-dialog__btn_primary {
  color: #e65013;
  z-index: 100;
}
.vux-prompt {
  margin-top: 0.2rem;
}
#app {
  height: 100%;
  position: relative;
  #header {
    position: relative;
    z-index: 1000000;
    overflow: hidden;
    width: 100%;
    /*height: 25px;*/
  }
  .viewBox {
    position: absolute;
    left: 0;
    top: 25px;
    width: 100%;
    bottom: 0;
  }
}


.updateBox {
  .weui-dialog {
    max-width: 5.4rem !important;
    width: 5.4rem !important;
  }
  .weui-mask {
    background: rgba(0, 0, 0, 0.7);
  }
  .weui-dialog {
    background: none;
  }
  .update {
    position: relative;
    /*left: 50%;*/
    /*top: 50%;*/
    /*transform: translate(-50%, -50%);*/
    background: rgba(255, 255, 255, 1);
    width: 5.4rem;
    overflow: hidden;
    border-radius: 0.2rem;
    .bg {
      width: 100%;
      float: left;
    }
    .contentBox {
      width: 100%;
      float: left;
      background: #fff;
      padding: 0.2rem 0.4rem 0.4rem;
      box-sizing: border-box;
      /*border-radius:  0 0 0.2rem 0.2rem;*/
    }
    .add {
      width: 100%;
      text-align: center;
      p {
        text-align: center;
        color: #666;
      }
      .t {
        font-size: 0.36rem;
        color: #3c3c3c;
      }
      .info {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color: #666;
        padding: 0 0.3rem;
        display: flex;
        align-items: flex-start;
        p {
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-align: left;
        }
        span {
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background: linear-gradient(to right, #d479ef, #a282ed);
          transform: rotate(45deg);
          margin-right: 0.1rem;
          margin-top: 0.16rem;
        }
      }
      img {
        margin-top: 0.6rem;
        width: 0.76rem;
        height: 0.76rem;
      }
    }
    .update_btn {
      margin-top: 0.6rem;
      display: flex;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 2rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        text-align: center;
        background: #e5e5e5;
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: #999;
      }
      span:last-of-type {
        color: #fff;
        background: linear-gradient(to right, #d456ff, #7468ff);
      }
    }
    .close {
      width: 0.76rem;
      height: 0.76rem;
      position: absolute;
      bottom: -0.76rem;
      left: 50%;
      margin-left: -0.38rem;
    }
  }
}

.progressBox {
  .weui-dialog {
    border-radius: 0;
    max-width: 5.35rem !important;
    width: 5.35rem !important;
  }
  /*.title{*/
  /*display: block;*/
  /*margin-bottom: 10px;*/
  /*}*/
  .progressBg {
    position: relative;
    width: 5.35rem;
    height: 4.35rem;
    img {
      width: 100%;
      height: 100%;
    }
    .weui-progress {
      position: absolute;
      left: 6%;
      width: 88%;
      bottom: 0.7rem;
      .weui-progress__bar {
        height: 0.2rem;
        border-radius: 0.1rem;
      }
      .weui-progress__inner-bar {
        background: #ff9b84;
        border-radius: 0.1rem;
      }
    }
    .prState{
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 1rem;
      text-align: center;
      color: #999;
      font-size: 0.28rem;
    }
    .title {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0.14rem;
      text-align: center;
      color: #999;
      font-size: 0.24rem;
    }
    .update_btn {
      position: absolute;
      bottom: 0.3rem;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 2rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        text-align: center;
        background: #e5e5e5;
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: #999;
      }
      span:last-of-type {
        color: #fff;
        background: linear-gradient(to right, #d456ff, #7468ff);
      }
    }
  }
}


#snAction {
  .title {
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.34rem;
    color: #000;
  }
  .machineBox {
    margin-top: 0.2rem;
    padding: 0 0 0.2rem 0;
    .machineList {
      margin: 0.2rem 0.3rem;
      border: 1px solid #dddddd;
      height: 0.6rem;
      line-height: 0.6rem;
      border-radius: 0.15rem;
      display: flex;
      align-items: center;
      padding-left: 5%;
      input {
        width: 90%;
        height: 90%;
        box-sizing: border-box;
        line-height: 0.6rem;
      }
    }
  }
  .machineBtn {
    height: 0.8rem;
    line-height: 0.8rem;
    border-top: 1px solid #eee;
    font-size: 0.32rem;
    color: #fff;
    background: rgb(230, 80, 19);
  }
}

/*上拉加载无数据的时候图片的样式*/
.mescroll-empty {
  padding-top: 130px !important;
}
.mescroll-empty .empty-icon {
  width: 35% !important;
}

//  进入页面路由动画定义
@keyframes slideInLeft {
  from {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-left-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInLeft 0.2s linear forwards;
}
.slide-left-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInRight 0.2s linear forwards;
}
@keyframes slideOutLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1 !important;
  }
  to {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideOutRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-right-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutLeft 0.2s linear forwards;
}
.slide-right-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutRight 0.2s linear forwards;
}
</style>