<template>
  <div class="bankmsg">
    <x-header :left-options="{showBack: false}" style="background: #e65013;">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      积分兑换
      <span class="save" slot="right" @click="showToast2 = true" style="color:#fff">查询</span>
    </x-header>
    <div class="bankBox">
      <div class="bankIntegral">
        <div class="bankList">
          <div class="left">
            <img :src="shop.logo" alt />
            <span>{{shop.name}}</span>
          </div>
          <!-- <div class="right">
            审核周期
            <span class="cycle">{{state}}</span>
          </div>-->
        </div>
        <div class="goodList">
          <span class="name">类型</span>
          <span class="zhi">{{goodType.name}}</span>
        </div>
        <!-- <div class="goodList">
          <span class="name">起兑积分</span>
          <span class="zhi">32000</span>
        </div>-->
        <div class="available">
          <div class="name">
            <span class="">兑换积分</span>
            <span class="rise">最低起兑{{goodType.rise}}</span>
          </div>
          <p>
            <span class="iconfont icon-xia"></span>
            {{unit}}
          </p>
          <div class="exchangeNumber">
            <input type="number" placeholder="请输入兑换积分数量" v-model="integral" @input="limitOrder" />
            <span class="iconfont icon-close-b" @click="clear()"></span>
          </div>
        </div>
      </div>
      <div class="integralDetails">
        <!-- <div class="integralList">
          <span class="name">可兑换积分</span>
          <div class="integralNum">
            <span>0.00</span>分
          </div>
        </div> -->
        <div class="integralList">
          <span class="name">现金总价值</span>
          <div class="integralNum">
            <span>{{result}}</span>元
          </div>
        </div>
        <div class="integralList">
          <span class="name">客户收益</span>
          <div class="integralNum">
            <span>{{profit}}</span>元
          </div>
        </div>
        <div class="integralList">
          <span class="name">服务费</span>
          <div class="integralNum">
            <span>{{server}}</span>元
          </div>
        </div>
        <!-- <div class="integralList">
          <span class="name">平台费用</span>
          <div class="integralNum">
            <span>{{platform}}</span>元
          </div>
        </div> -->
      </div>
    </div>
    <div class="exchangeBtn" @click="goIntegral()">开始兑换</div>
    <div v-transfer-dom>
      <x-dialog v-model="showToast1" class="updateBox">
        <div class="update">
          <div class="name">银行卡类型</div>
          <div class="bankType">
            <div
              class="goodType"
              v-for="(item,index) in goods_type"
              :key="index"
              @click="getGoodId(item)"
            >
              <span class="goodname">{{item.name}}</span>
              <span class="rise">起兑积分{{item.rise}}</span>
            </div>
            <!-- <img
              :src="item.img"
              v-for="(item,index) in list"
              :key="index"
              alt
              @click="getGoodId(item)"
            />-->
          </div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showToast2" class="updateBox" hide-on-blur>
        <div class="update">
          <div class="name">积分查询</div>
          <div class="text" v-html="shop.beizhu"></div>
        </div>
      </x-dialog>
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
      goodId: "",
      shop: "",
      showToast1: false,
      showToast2: false,
      goods_type: "",
      goodType: { id: "" },
      integral: "",//输入的积分
      rise: ''
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "goodInfo") {
      to.meta.isBack = false;
    } else {
      to.meta.isBack = true;
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "home") {
      this.showToast1 = false;
      this.showToast2 = false;
      this.integral = ''
    }
    next();
  },
  activated() {
    if (this.$route.meta.isBack) {
      this.goodId = this.$route.query.id;
      this.getGoodInfo();
    }
  },
  computed: {
    //计算总价,用于显示
    result: function() {
      return ((this.integral * this.goodType.hy_money) / 10000).toFixed(2);
    },
    profit: function() {
      return ((this.integral * this.goodType.hy_money) * 0.9 / 10000).toFixed(2);
    },
    server: function() {
      return ((this.integral * this.goodType.hy_money) * 0.1 / 10000).toFixed(2);
    },

    unit: function() {
      if (this.integral >= 10000000) {
        return "千万";
      } else if (this.integral >= 1000000) {
        return "百万";
      } else if (this.integral >= 100000) {
        return "十万";
      } else if (this.integral >= 10000) {
        return "万";
      } else if (this.integral >= 1000) {
        return "千";
      } else if (this.integral >= 100) {
        return "百";
      }
    }
  },
  mounted() {
    let that = this;
  },
  methods: {
    getGoodInfo() {
      let that = this;
      apiHttp.getGoodInfo(this.goodId, store.state.global.token).then(res => {
        if (res.code === 1) {
          that.shop = res.data.bankInfo;
          if (res.data.goods_type.length > 0) {
            that.showToast1 = true;
            that.goods_type = res.data.goods_type;
            let text = "请选择兑换通道和卡种";
            var bdTTS = api.require("bdTTS");
            bdTTS.speak(
              {
                text: text
              },
              function(ret) {}
            );
          } else {
            that.goodType = res.data.bankInfo;
            let text =
              "请输入需要兑换的积分数，右上角可查询积分。请按照积分数量自主选择相应的卡种，及兑换份数";
            var bdTTS = api.require("bdTTS");
            bdTTS.speak(
              {
                text: text
              },
              function(ret) {}
            );
          }
        }
      });
    },
    getGoodId: function(type) {
      let that = this;
      that.showToast1 = false;
      that.goodType = type;
      let text =
        "请输入需要兑换的积分数，右上角可查询积分。请按照积分数量自主选择相应的卡种，及兑换份数";
      var bdTTS = api.require("bdTTS");
      bdTTS.speak(
        {
          text: text
        },
        function(ret) {}
      );
    },
    clear: function() {
      this.integral = "";
    },
    limitOrder() {
      // 要做长度判断
      if (this.integral.length > 8) {
        this.integral = this.integral.slice(0, 8);
      }
    },
    goIntegral: function() {
      let that = this;
      if(that.integral < that.goodType.rise){
        this.$vux.toast.text("输入积分小于最小起兑数量,请重新输入");
        return;
      }
      that.$store.commit("setBank", this.goodType.id);
      that.$router.push({
        name: "goodInfo",
        query: {
          id: this.goodType.id,
          androidPkg: this.shop.androidPkg
        }
      });
    }
  }
};
</script>
<style  lang='less'>
.updateBox {
  .weui-mask {
    background: rgba(0, 0, 0, 0.7);
  }
  .weui-dialog {
    background: none;
  }
  .update {
    position: relative;
    background: rgba(255, 255, 255, 1);
    width: 6rem;
    max-height: 6.5rem;
    overflow: hidden;
    border-radius: 0.2rem;
    overflow-y: scroll;
    text-align: left;
    
    .name {
      font-size: 0.34rem;
      line-height: 0.8rem;
      color: #333;
      padding: 0 0.3rem;
      background: #e65013;
      color: #fff;
    }
    .bankType {
      padding: 0.2rem 0.3rem;
      display: flex;
      flex-direction: column;
      .goodType {
        font-size: 0.32rem;
        line-height: 0.8rem;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .goodType:last-child {
        border-bottom: none;
      }
    }
    .text {
      font-size: 0.34rem;
      text-indent: 0.4rem;
      padding: 0.2rem 0.3rem;
      text-align: left;
      color: #000000;
    }
  }
}
</style>
<style lang="less" scoped>
.bankmsg {
  height: 100%;
  background: #f2f2f2;
  overflow-y: scroll;
  .bankBox {
    padding-top: 0.2rem;
    position: absolute;
    top: 0.88rem;
    bottom: 2rem;
    width: 100%;
    .bankIntegral {
      background: #ffffff;
      border-radius: 0.2rem;
      margin: 0 0.3rem;
      font-size: 0.3rem;
      .bankList {
        height: 1rem;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        .left {
          display: flex;
          align-items: center;
          font-weight: 500;
          img {
            width: 0.6rem;
            margin-right: 0.2rem;
          }
        }
        .right {
          width: 2.5rem;
          line-height: 1.2;
          font-size: 0.28rem;
          .cycle {
            color: #fc3357;
          }
        }
      }
      .goodList {
        height: 0.88rem;
        margin: 0 0.3rem;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .zhi {
          color: #757575;
        }
      }
      .available {
        padding: 0 0.2rem 0.2rem;
        display: flex;
        flex-direction: column;
        .name {
          line-height: 0.8rem;
          .rise{
            margin-left: 0.2rem;
            color: #757575;
            font-size: 0.26rem;
          }
        }
        p {
          font-size: 0.24rem;
          line-height: 0.24rem;
          color: #999999;
          .iconfont {
            margin: 0 0.1rem;
          }
        }
        .exchangeNumber {
          padding: 0 0.2rem;
          width: 100%;
          margin-top: 0.2rem;
          position: relative;
          box-sizing: border-box;
          input {
            color: #fc3357;
            width: 100%;
            height: 0.8rem;
          }
          input::-webkit-input-placeholder {
            color: #fc3357;
            font-size: 0.3rem;
          }
          .icon-close-b {
            position: absolute;
            right: 0.3rem;
            top: 0;
            color: #cccccc;
          }
        }
      }
    }
    .integralDetails {
      background: #ffffff;
      margin: 0.2rem 0.3rem;
      border-radius: 0.2rem;
      font-size: 0.3rem;
      .integralList {
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem;
        border-bottom: 1px solid #eeeeee;
        .name {
          color: #000000;
          font-weight: 400;
        }
        .integralNum {
          span {
            color: #e65013;
            margin-right: 0.15rem;
          }
        }
      }
    }
  }
  .exchangeBtn {
    position: absolute;
    bottom: 0.5rem;
    left: 0.3rem;
    right: 0.3rem;
    height: 0.88rem;
    background: #e65013;
    font-size: 0.3rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.88rem;
  }
}
</style>