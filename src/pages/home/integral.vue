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

    service() {
     var browser = api.require("webBrowser");
      browser.open({
        url: 'http://mam.jiweilianmeng.com/Web/im.aspx?_=t&accountid=119041&visitorname='+this.userInfo.stock_name+''
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