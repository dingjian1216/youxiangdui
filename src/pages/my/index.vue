<template>
  <div class="my" :style="{paddingTop: statusH + 'rem'}">
    <div class="head">
      <div class="myHead">
        <div class="myMsg">
          <img :src="info.picture" @click="jumpTo('/info')" alt />
          <div class="name">
            <span v-if="info.name">{{info.name}}</span>
            <span v-else>{{info.nickname}}</span>
            <span class="realName" @click="jumpTo('/realName')" v-if="info.is_auth == 0">去实名</span>
          </div>
        </div>
        <div class="profit">
          <div class="all" @click="jumpTo('/profit')">
            <div class="name">累计收入</div>
            <div class="num" v-if="showMoney == 1">{{info.sum_money}}</div>
            <div class="num" v-else>*****</div>
          </div>
          <div class="all">
            <div class="name" @click="jumpTo('/profit')">可用收入</div>
            <div class="num" v-if="showMoney == 1">{{info.money}}</div>
            <div class="num" v-else>*****</div>
          </div>
          <div class="all">
            <span
              class="iconfont icon-zhaoshangxiaochengxu-mimakejian"
              v-if="showMoney == 1"
              @click="showM"
            ></span>
            <span class="iconfont icon-tubiaolunkuo-1" v-else @click="showM"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="orderBox">
      <div class="title">
        <span>我的订单</span>
        <span class="right" @click="jumpTo('/myOrder')">查看全部订单</span>
      </div>
      <div class="box">
        <div class="orderList" @click="order(1)">
          <span class="iconfont icon-dkw_shenhezhong"></span>
          <div class="name">审核中</div>
        </div>
        <div class="orderList" @click="order(2)">
          <span class="iconfont icon-dkw_shenheweitongguo"></span>
          <div class="name">未通过</div>
        </div>
        <div class="orderList" @click="order(3)">
          <span class="iconfont icon-dkw_shenhetongguo"></span>
          <div class="name">已完成</div>
        </div>
      </div>
    </div>
    <div class="tool">
      <div class="title">
        <div>常用功能</div>
      </div>
      <div class="toolBox">
        <div class="toolList" @click="jumpTo('/profit')">
          <i class="iconfont icon-wodezijin" style="color:#E8541E"></i>
          <div class="aui-gird-lable aui-font-size-12">我的资产</div>
        </div>
        <div class="toolList" v-if="ifIos" @click="jumpTo('/achievement')">
          <i class="iconfont icon-wodechengjiu" style="color:#108EE9"></i>
          <div class="aui-gird-lable aui-font-size-12">我的成就</div>
        </div>
        <!-- <div class="toolList">
          <i class="iconfont icon-tuandui" style="color:#F49C2E" @click="jumpTo('/team')"></i>
          <div class="aui-gird-lable aui-font-size-12">我的团队</div>
        </div> -->
        <div class="toolList">
          <i class="iconfont icon-guanyuwomen" style="color:#0BA194" @click="jumpTo('/about')"></i>
          <div class="aui-gird-lable aui-font-size-12">关于我们</div>
        </div>
        <div class="toolList ">
          <i class="iconfont icon-jiagebiao" style="color:#fc7506" @click="seePrice(1)"></i>
          <div class="aui-gird-lable aui-font-size-12">用户表</div>
        </div>
        <div class="toolList">
          <i class="iconfont icon-jifen11" style="color:#e65013" @click="seePrice(2)"></i>
          <div class="aui-gird-lable aui-font-size-12">积分价格表</div>
        </div>
        <div class="toolList">
          <i class="iconfont icon-huabanfuben" style="color:#E8541E" @click="getwx()"></i>
          <div class="aui-gird-lable aui-font-size-12">联系客服</div>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showToast2" class="wxServer" hide-on-blur>
        <div class="update">
          <div class="name">扫码二维码添加微信</div>
          <div class="twoCode" id="twoCodeqrcode" ref="twoCodeqrcode"></div>
          <div class="addwx" @click="goWx()">关闭</div>
        </div>
        <i class="iconfont icon-close2 text-white" style="font-size: 1.8rem" onclick="closeFrm()"></i>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import * as apiHttp from "../../api/index";
import { qrcanvas } from "qrcanvas";
import { XDialog, Confirm, TransferDomDirective as TransferDom } from "vux";
import store from "../../store";
export default {
  components: {
    XDialog,
    Confirm
  },
  directives: {
    TransferDom
  },
  name: "my",
  data() {
    return {
      info: "",
      showMoney: 1,
      ifIos: true,
      wx_num: "",
      showToast2: false,
      show: false,
      statusH: ""
    };
  },
   beforeRouteLeave(to, from, next) {
    let that = this;
    if(to.name == 'success'){
      that.$router.push("/home");
    }
    next();
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
    if (!store.state.global.moneyShow) {
      this.$store.commit("setMoneyShow", this.showMoney);
    } else {
      this.showMoney = store.state.global.moneyShow;
    }
  },
  mounted() {
    apiHttp.myIndex(store.state.global.token).then(res => {
      if (res.code == 1) {
        this.info = res.data;
      }
    });
  },

  methods: {
    order(index) {
      this.$router.push({
        name: "myOrder",
        query: {
          index: index
        }
      });
    },
    seePrice(index) {
      this.$router.push({
        name: "price",
        query: {
          index: index
        }
      });
    },
    showM() {
      if (store.state.global.moneyShow == 1) {
        this.showMoney = 2;
        this.$store.commit("setMoneyShow", 2);
      } else {
        this.showMoney = 1;
        this.$store.commit("setMoneyShow", 1);
      }
    },
    getwx() {
      if (this.wx_num) {
        this.showToast2 = true;
        var bdTTS = api.require("bdTTS");
        bdTTS.speak(
          {
            text: text
          },
          function(ret) {}
        );
      } else {
        apiHttp.getWxNum().then(res => {
          if (res.code == 1) {
            this.wx_num = res.data.wx_num;
            this.showToast2 = true;
            let canvas1 = qrcanvas({
              data: res.data.wx_num,
              size: 200
            });
            document.getElementById("twoCodeqrcode").appendChild(canvas1);
            let text =
              "有任何机器使用或不明白的地方可扫码添加积分机客服微信，一对一指导操作即可。";
            var bdTTS = api.require("bdTTS");
            bdTTS.speak(
              {
                text: text
              },
              function(ret) {}
            );
          }
        });
      }
    },
    goWx() {
      this.showToast2 = false;
    },
    confirm() {
      api.openApp({
        iosUrl: "weixin://",
        androidPkg: "com.tencent.mm"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.wxServer {
  .name {
    height: 0.88rem;
    text-align: center;
    line-height: 0.88rem;
    font-size: 0.32rem;
  }
  .addwx {
    height: 0.8rem;
    width: 4rem;
    margin: 0.2rem auto;
    background: #e65013;
    color: #fff;
    line-height: 0.8rem;
    border-radius: 0.5rem;
  }
}
</style>

<style lang="less" scope>
.my {
  height: 100%;
  position: relative;
  overflow-y: scroll;
  background: #f2f2f2;
  box-sizing: border-box;
  .head {
    background: #e65013;
    padding: 1rem 0.3rem 0.3rem;
    .myHead {
      background: #ffffff;
      border-radius: 0.2rem;
      .myMsg {
        text-align: center;
        img {
          width: 1.2rem;
          border-radius: 50%;
          margin-top: -0.6rem;
        }
        .name {
          font-size: 0.32rem;
          color: #000;
        }
        .realName {
          font-size: 0.24rem;
          margin-left: 0.2rem;
          color: #212121;
        }
      }
      .profit {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0;
        .all {
          flex: 1;
          text-align: center;
          .name {
            font-size: 0.32rem;
            color: #757575;
          }

          .num {
            font-size: 0.32rem;
            color: #000;
          }
          .iconfont {
            font-size: 0.45rem;
            color: #333;
          }
        }
      }
    }
  }
  .orderBox {
    border-radius: 0.2rem;
    margin: 0.2rem 0.3rem;
    background: #ffffff;
    .title {
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.8rem;
      line-height: 0.8rem;
      border-bottom: 1px solid #eeeeee;
      .right {
        color: #757575;
        font-size: 0.26rem;
      }
    }
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0;
      .orderList {
        flex: 1;
        text-align: center;
        .iconfont {
          font-size: 0.4rem;
        }
      }
    }
  }
  .tool {
    border-radius: 0.2rem;
    margin: 0.2rem 0.3rem;
    background: #ffffff;
    .title {
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.8rem;
      line-height: 0.8rem;
      border-bottom: 1px solid #eeeeee;
    }
    .toolBox {
      overflow: hidden;
      .toolList {
        float: left;
        width: 33.3%;
        text-align: center;
        padding: 0.2rem 0;
        .iconfont {
          font-size: 0.5rem;
        }
      }
    }
  }
}
</style>
