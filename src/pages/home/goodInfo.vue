<template>
  <div class="goodInfo" id="goodInfo">
    <x-header :left-options="{showBack: false}" style="background: #e65013;">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      第一步 积分兑换
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
            <div class="goExchange" @click="openApp()" v-if="type">操作指引</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" @click="goIntegral">
      <span v-if="type">兑换完成,去报单</span>
      <span v-else>去兑换</span>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showCode" id="showCode" hide-on-blur>
        <div class="showCode">
          <div class="name">扫码查看该产品的操作指引</div>
          <div class="twoCode" id="twoCodeqrcode" ref="twoCodeqrcode"></div>
          <div class="changeJiF" @click="openChange">{{changeName}}</div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { XDialog, TransferDomDirective as TransferDom } from "vux";
import store from "../../store";
import { qrcanvas } from "qrcanvas";
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
      androidPkg: this.$route.query.androidPkg,
      list: [],
      masNum: 0,
      canvas1: null,
      showCode: false,
      type: true,
      changeName: "去兑换"
    };
  },

  mounted() {
    let that = this;
    apiHttp
      .getgoodsProduct(this.goods_id, store.state.global.token)
      .then(res => {
        if (res.code === 1) {
          that.list = res.data;
          if (res.data[0].dui.type.indexOf("4") >= 0) {
            that.type = false;
            let text =
              "点击去兑换，根据图文教程，提供相应的信息给咱们平台的客服，进行兑换。兑换完成后客服会自主报单，您可在初审通过页面打印相应小票，等待结算即可";
            var bdTTS = api.require("bdTTS");
            bdTTS.speak(
              {
                text: text
              },
              function(ret) {}
            );
          } else {
            that.type = true;
            let link = this.list[0].dui.link;
            let androidPkg = this.list[0].dui.package;
            if (!link && !androidPkg) {
              this.changeName = "去报单";
            }
          }
          that.qrcode();
        }
      });
  },
  methods: {
    openApp: function() {
      
      // this.showCode = true;
      // let text =
      //   "详细教程请用手机扫描二维码，方便兑换过程中随时查看。最后报单请参考兑换流程里的报单示例图。";
      // var bdTTS = api.require("bdTTS");
      // bdTTS.speak(
      //   {
      //     text: text
      //   },
      //   function(ret) {}
      // );
      this.$router.push({
        name: "standard",
        query: {
          id: this.goods_id
        }
      });
    },
    openChange(num) {
      let type = this.list[0].dui.type;
      let link = this.list[0].dui.link;
      let androidPkg = this.list[0].dui.package;
      let id = this.list[0].dui.id;
      apiHttp.getgoodsDetail(id, store.state.global.token).then(res => {
        if (res.code === 1) {
        }
      });
      let that = this;
 
      if (type.indexOf("4") >= 0) {
        that.$router.push({
          name: "integral",
          query: {
            id: that.list[0].dui.id
          }
        });
      } else if (link) {
        var bdTTS = api.require("bdTTS");
        bdTTS.speakPause(function(ret) {});
        that.showCode = false;
        let text =
          "即将打开银行链接，按照兑换流程进行兑换操作，切记兑换过程中需要点击小浮窗上面的地址获取地址信息，兑换完成请截屏，截屏成功再点击小浮窗上面的报单按钮，回到兑换页面，点击兑换好了去报单。";
        bdTTS.speak(
          {
            text: text
          },
          function(ret) {}
        );
        api.openApp(
          {
            androidPkg: "android.intent.action.VIEW",
            mimeType: "text/html",
            uri: link
          },
          function(ret, err) {}
        );
      } else if (androidPkg) {
        var bdTTS = api.require("bdTTS");
        bdTTS.speakPause(function(ret) {});
        that.showCode = false;
        let text =
          "即将打开银行链接，按照兑换流程进行兑换操作，切记兑换过程中需要点击小浮窗上面的地址获取地址信息，兑换完成请截屏，截屏成功再点击小浮窗上面的报单按钮，回到兑换页面，点击兑换好了去报单。";
        bdTTS.speak(
          {
            text: text
          },
          function(ret) {}
        );
        let appManagerPlus = api.require("appManagerPlus");
        let Getsn = api.require("moduleDemo");
        appManagerPlus.isInstalled(
          {
            paramType: 0,
            paramStr: androidPkg
          },
          function(ret) {
            if (ret.status == true && num !== 2) {
              appManagerPlus.unInstallApp(
                {
                  pkgName: androidPkg
                },
                function(rets) {
                  setTimeout(function() {
                    that.openChange(2);
                  }, 2000);
                }
              );
            } else if (ret.status == false || num !== 2) {
              Getsn.startActivity({
                packageName: androidPkg
              });
            }
          }
        );
      } else {
        this.$router.push({
          name: "baodan",
          query: {
            id: this.list[0].did
          }
        });
      }
    },
    goIntegral: function() {
      let type = this.list[0].dui.type;
      if (type.indexOf("4") >= 0) {
        this.$router.push({
          name: "integral",
          query: {
            id: this.list[0].dui.id
          }
        });
      } else {
        this.$router.push({
          name: "baodan",
          query: {
            id: this.list[0].did
          }
        });
      }
    },
    qrcode: function() {
      let canvas1 = qrcanvas({
        data: this.list[0].content_url,
        size: 200
      });
      document.getElementById("twoCodeqrcode").appendChild(canvas1);
    }
  }
};
</script>

<style lang="less">
#showCode .weui-dialog {
  background-color: transparent;
  z-index: 5010;
}
#showCode {
  // background: rgba(0, 0, 0, 0.6);
  .name {
    padding: 0.3rem 1.3rem;
    font-size: 0.5rem;
    color: #fc3357;
    background: #fff;
  }
  .twoCode {
    padding-bottom: 0.2rem;
    background: #fff;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .changeJiF {
    margin-top: 1rem;
    color: #fff;
    background: rgb(230, 80, 19) !important;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.36rem;
    border-radius: 0.1rem;
  }
}
</style>
<style lang="less" scoped>
#goodInfo {
  height: 100%;
  background: #f2f2f2;
  position: relative;
  .integralBox {
    position: absolute;
    top: 1.2rem;
    bottom: 1.2rem;
    left: 0;
    right: 0;
    overflow: scroll;
    .good {
      padding: 0 0.3rem 0.2rem;
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
          margin-top: 0.2rem;
          .num {
            color: #000000;
          }
          .name1 {
            color: #666;
            font-size: 0.28rem;
          }
          .goExchange {
            background: rgb(230, 80, 19);
            font-size: 0.28rem;
            color: #ffffff;
            height: 0.6rem;
            line-height: 0.65rem;
            padding: 0 0.2rem;
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
    left: 0.3rem;
    right: 0.3rem;
    bottom: 0.2rem;
    height: 0.88rem;
    background: rgb(230, 80, 19);
    color: #fff;
    text-align: center;
    line-height: 0.88rem;
    font-size: 0.34rem;
  }
}
</style>