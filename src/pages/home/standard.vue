<template>
  <div class="standard">
    <div class="nav">
      <div class="navList" @click="getText()">
        <img src="../../assets/img/picText.png" alt />
        <p>本机查看图文详情</p>
      </div>
      <div class="navList" @click="openApp()">
        <div class="twoCode" id="twoCodeqrcode" ref="twoCodeqrcode"></div>
        <p>手机查看图文详情</p>
      </div>
    </div>
    <div class="footer" @click="openChange">
      <span>已知晓, 下一步</span>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { qrcanvas } from "qrcanvas";
import store from "../../store";
export default {
  data() {
    return {
      list: [],
      goods_id: this.$route.query.id,
      showCode: false,
      showOne: false
    };
  },

  mounted() {
    let that = this;
    apiHttp
      .getgoodsProduct(this.goods_id, store.state.global.token)
      .then(res => {
        if (res.code === 1) {
          that.list = res.data;
          that.qrcode();
        }
      });
  },
  methods: {
    getText() {
      var browser = api.require("webBrowser");
      browser.open({
        url: this.list[0].content_url
      });
    },
    qrcode: function() {
      let canvas1 = qrcanvas({
        data: this.list[0].content_url,
        size: 100
      });
      document.getElementById("twoCodeqrcode").appendChild(canvas1);
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
  .close {
    margin-top: 1rem;
    width: 0.5rem;
  }
}
</style>

<style lang="less" scoped>
.standard {
  height: 100%;
  background: #f2f2f2;
  padding-top: 0.5rem;
  box-sizing: border-box;
  .nav {
    margin: 0 0.3rem;
    border-radius: 0.2rem;
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-around;
    background: #ffffff;
    .navList {
      text-align: center;
      font-size: 0.28rem;
      img {
        width: 100px;
      }
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