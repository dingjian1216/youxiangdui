<template>
  <div class="integral">
    <x-header :left-options="{showBack: false}" style="background: #e65013;">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      图文详情
    </x-header>
    <div class="integralBox">
      <div class="good">
        <div class="goodList" v-for="(item,index) in list" :key="index">
          <div class="name">
            <span>{{item.productname}}</span>
          </div>
          <div class="listBox">
            <div class="integralNum">
              <div class="num">{{item.jfnum}}</div>
              <div class="name1">兑换积分数</div>
            </div>
            <div class="second">
              <div class="num">{{item.dhnum}}</div>
              <div class="name1">兑换积次数</div>
            </div>
            <!-- <div class="goExchange" @click="openApp()">去兑换</div> -->
          </div>
        </div>
      </div>
      <div class="textBox">
        <div v-show="bankInfo.video_url">
          <div class="my-title aui-border-b">视频教程</div>
          <div class="aui-card-list-content-padded">
            <img src="../../assets/img/vid.png" tapmode @click="openVideo()" />
          </div>
        </div>
        <div class="my-title aui-border-b">图文教程</div>
        <div class="aui-card-list-content-padded">
          <div v-html="bankInfo.content"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left" @click="shibie()">
        <p>复制短信</p>
      </div>
      <div class="right">
        <div v-if="bankInfo.add_type == 1" @click="goIntegral()">报单</div>
        <div v-if="bankInfo.add_type == 2" @click="service()">联系客服报单</div>
        <div v-if="bankInfo.add_type == 3">暂停报单</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { XDialog, TransferDomDirective as TransferDom } from "vux";
import store from "../../store";
export default {
  components: {
    XDialog
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      goods_id: this.$route.query.id,
      bankInfo: [], //列表
      userInfo: [], //列表
      list: [],
      masNum: 0
    };
  },

  mounted() {
    let that = this;
    var baiduAd = api.require("baiduIdentifyOCR");
    baiduAd.init(function(ret, err) {});
    apiHttp
      .getgoodsDetail(this.goods_id, store.state.global.token)
      .then(res => {
        if (res.code === 1) {
          that.bankInfo = res.data.bankInfo;
          that.userInfo = res.data.userInfo;
          that.list = res.data.list;
          that.initMeiQia();
        }
      });
    let text =
      "点击联系客服报单，提供相应的信息给咱们平台的客服，进行兑换,如需短信信息,请点击复制短信,扫描短信,短信信息会自动到剪切板上发送给咱们平台客服。兑换完成后客服会自主报单，您可在初审通过页面打印相应小票，等待结算即可";
    var bdTTS = api.require("bdTTS");
    bdTTS.speak(
      {
        text: text
      },
      function(ret) {}
    );
  },
  methods: {
    openApp: function() {
      var ksrk_url = this.bankInfo.ksrk_url; //网页地址
      var iosUrl = this.bankInfo.iosUrl; //ios应用名
      var androidPkg = this.bankInfo.androidPkg; //应用包名
      var openurl = this.bankInfo.andro_d_url; //安卓下载地址
      var appBundle = androidPkg;
      if (api.systemType == "ios") {
        openurl = this.bankInfo.ios_d_url; //IOS下载地址
        appBundle = iosUrl;
      }
      if (this.bankInfo.app_switch == 1) {
        api.appInstalled(
          {
            appBundle: appBundle
          },
          function(ret, err) {
            if (ret.installed) {
              //应用已安装
              api.openApp({
                iosUrl: iosUrl,
                androidPkg: androidPkg,
                mimeType: "text/html"
              });
            } else {
              //应用未安装
              api.openApp(
                {
                  iosUrl: openurl,
                  androidPkg: androidPkg,
                  mimeType: "text/html",
                  uri: openurl
                },
                function(ret, err) {
                  alert(JSON.stringify(err));
                }
              );
            }
          }
        );
      } else if (ksrk_url) {
        api.openApp(
          {
            iosUrl: ksrk_url,
            androidPkg: "android.intent.action.VIEW",
            mimeType: "text/html",
            uri: ksrk_url
          },
          function(ret, err) {}
        );
      }
    },
    service() {
      this.masNum = 0;
      var mq = api.require("meiQia");
      mq.show();
    },
    initMeiQia() {
      let that = this;
      var mq = api.require("meiQia");
      var param = {
        appkey: "2ef5f225ccadc3240e5c8b64780102ad"
      };
      mq.initMeiQia(param, function(ret, err) {
        if (ret) {
          //初始化成功
          var titleColor = {
            color: "#000"
          };
          mq.setTitleColor(titleColor);
          //设置ID
          var customizedIdParam = {
            id: 'ID' + that.userInfo.mobile
          };
          console.log('ID' + that.userInfo.mobile)
          mq.setLoginCustomizedId(customizedIdParam);
          //设置自定义信息
          var infoParam = {
            name: that.userInfo.name,
            tel: that.userInfo.mobile,
            comment: that.bankInfo.name
          };
          mq.setClientInfo(infoParam);
          mq.addMessageListener(function(ret, err) {
            if (ret) {
              mq.getUnreadMessageCount(function(ret) {
                that.masNum = ret.count;
              });
            }
          });
          mq.getUnreadMessageCount(function(ret) {
            that.masNum = ret.count;
          });
        } else {
        }
      });
    },
    shibie() {
      let that = this;
      var baiduAd = api.require("baiduIdentifyOCR");
      var clipBoard = api.require("clipBoard");
      baiduAd.generalBasicOCR(function(ret) {
        console.log(JSON.stringify(ret));
        if (ret.status) {
          var text = "";
          console.log(typeof ret.result);
          var word = JSON.parse(ret.result).words_result;
          console.log(word);
          for (let i = 0; i < word.length; i++) {
            text = text + word[i].words;
          }
          clipBoard.set(
            {
              value: text
            },
            function(ret, err) {
              if (ret) {
                that.$vux.toast.text("复制成功");
              } else {
                that.$vux.toast.text("请重试");
              }
            }
          );
        }
      });
    },
    goIntegral: function() {
      this.$router.push({
        name: "baodan",
        query: {
          id: this.goods_id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.integral {
  height: 100%;
  background: #f2f2f2;
  position: relative;
  .integralBox {
    position: absolute;
    top: 0.88rem;
    bottom: 1rem;
    left: 0;
    right: 0;
    overflow: scroll;
    background: #ffffff;
    .good {
      padding: 0.4rem 0.3rem 0.2rem;
      background: #f2f2f2;
      .goodList {
        border-radius: 0.2rem;
        background: #ffffff;
        padding: 0.2rem;
        margin-bottom: 0.2rem;
        .name {
          position: relative;
          padding-left: 0.3rem;
        }
        .name::before {
          content: "";
          position: absolute;
          top: 0.1rem;
          left: 0rem;
          width: 3px;
          height: 0.3rem;
          background: #fc3357;
        }
        .listBox {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 0.1rem;
          .num {
            color: #000000;
          }
          .name1 {
            color: #666;
            font-size: 0.28rem;
          }
          .goExchange {
            padding: 0.1rem 0.2rem 0.05rem;
            background: #fc3357;
            font-size: 0.28rem;
            color: #ffffff;
            line-height: 1;
            border-radius: 0.1rem;
            // vertical-align: middle;
          }
        }
      }
    }
    .aui-border-b {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.3rem;
      font-size: 0.32rem;
      color: #000;
      font-weight: 600;
    }
    .aui-card-list-content-padded {
      position: relative;
      margin: 0.2rem 0.3rem;
      word-break: break-all;
      font-size: 0.28rem;
      color: #212121;
    }
  }
  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1rem;
    display: flex;
    align-items: center;
    background: #ffffff;
    .left {
      flex: 1;
      text-align: center;
      line-height: 1.1;
      color: #fc3357;
      .iconfont {
        font-size: 0.4rem;
      }
    }
    .right {
      flex: 3;
      text-align: center;
      background: #108ee9;
      height: 100%;
      line-height: 1rem;
      color: #fff;
    }
  }
}
</style>