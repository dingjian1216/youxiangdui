<template>
  <div class="orderDetails">
    <x-header :left-options="{showBack: false}" style="background: #e65013;">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      报单详情
      <span class="save" slot="right" @click="daYin" style="color:#fff">打印报单</span>
    </x-header>
    <div class="detailsBox">
      <div class="title">
        <span>订单金额</span>
        <span class="money">¥{{info.price}}</span>
      </div>
      <div class="list">
        <div class="item">
          <span>订单号</span>
          <span class="right">{{info.order_number}}</span>
        </div>
        <div class="item">
          <span>状态</span>
          <span class="warning" v-if="info['status'] == 1">待审核</span>
          <span class="danger" v-if="info['status'] == 2">已驳回</span>
          <span class="success" v-if="info['status'] == 3">已完成</span>
          <span class="danger" v-if="info['status'] == 4">初审通过待复审</span>
        </div>
        <div class="item">
          <span>商品</span>
          <span class="right">{{info.good_name}}</span>
        </div>
        <div class="item" v-if="info.voucher_money > 0">
          <span>奖金劵</span>
          <span class="right">{{info.voucher_money}}</span>
        </div>
        <div class="item">
          <span>消耗积分</span>
          <span v-if="info['show'] == 1" class="right">{{info.integral}}</span>
          <span v-else class="right">审核中</span>
        </div>
        <div class="item">
          <span>报单时间</span>
          <span class="right">{{info.create_time}}</span>
        </div>
        <div class="item" v-show="info['status'] == 2">
          <span>报单时间</span>
          <span class="right">{{info.info}}</span>
        </div>
      </div>
      <div class="detailsPic" v-if="info.picture !== undefined && info.picture.length > 0 ">
        <div class="title">图片资料</div>
        <ul class="picBox">
          <li v-for="(vo, index) in info['picture']" :key="index">
            <img :src="vo" alt />
          </li>
        </ul>
      </div>
      <div class="editor" v-show="info.editor">
        <div class="title">券码信息</div>
        <div class="text">{{info.good_name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import store from "../../store";
import { CellFormPreview, Group, Cell } from "vux";

export default {
  components: {
    CellFormPreview,
    Group,
    Cell
  },
  data() {
    return {
      order_id: this.$route.query.id,
      info: "",
      sn: "",
      userName: "",
      daYinTime: ''
    };
  },
  mounted() {
    let that = this;
    apiHttp
      .getOrderDetail(this.order_id, store.state.global.token)
      .then(res => {
        if (res.code == 1) {
          this.info = res.data;
        }
      });
    apiHttp.myIndex(store.state.global.token).then(res => {
      if (res.code == 1) {
        this.userName = res.data.name;
      }
    });
    let Getsn = api.require("moduleDemo");
    Getsn.getSn({}, function(ret) {
      if (ret.sn) {
        that.sn = ret.sn;
      }
    });
    var SunmiPrinter = api.require("sunmiPrinter");
    SunmiPrinter.startService(function(ret, err) {});
  },
  methods: {
    daYin() {
      let that = this;
      var SunmiPrinter = api.require("sunmiPrinter");
      let format = "down" + new Date().getTime() + ".jpg";
      let info = that.info;
      if(this.daYinTime){
        this.$vux.toast.text('已打印,请勿重复打印');
        return
      }else {
        this.daYinTime = new Date().getTime()
        api.download(
          {
            url: that.info.member_sign + "?imageView2/1/w/360/h/160",
            savePath: "fs://" + format,
            report: true,
            cache: true,
            allowResume: true
          },
          function(ret, err) {
            if (ret.state == 1) {
              SunmiPrinter.printData(
                {
                  data: [
                    {
                      rowtype: "setAlignment",
                      alignment: 1
                    },
                    {
                      rowtype: "setFontSize",
                      fontsize: 28
                    },
                    {
                      rowtype: "printText",
                      text: "积分妙兑智能POS机\n"
                    },
                    {
                      rowtype: "lineWrap",
                      n: 1
                    },
                    {
                      rowtype: "setAlignment",
                      alignment: 0
                    },
                    {
                      rowtype: "setFontSize",
                      fontsize: 24
                    },
                    {
                      rowtype: "printText",
                      text: "  积分兑换交易凭证\n"
                    },
                    {
                      rowtype: "setFontSize",
                      fontsize: 16
                    },
                    {
                      rowtype: "printText",
                      text: "   (持卡人存根)\n"
                    },
                    {
                      rowtype: "setFontSize",
                      fontsize: 20
                    },
                    {
                      rowtype: "printText",
                      text: "  ------------------------------------\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  转让方:     " + info.member_name + "\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  联系方式:   " + info.member_mobile + "\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  商品:       " + info.good_name + "\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  交易金额:    " + info.price + "\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  消耗积分:    " + info.integral + "\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  交易流水号:  " + info.order_number + "\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  交易时间:    " + info.create_time + "\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  ------------------------------------\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  签名:\n"
                    },
                    {
                      rowtype: "setAlignment",
                      alignment: 1
                    },
                    {
                      rowtype: "printBitmap",
                      image: "fs://" + format
                    },
                    {
                      rowtype: "lineWrap",
                      n: 1
                    },
                    {
                      rowtype: "setAlignment",
                      alignment: 0
                    },
                    {
                      rowtype: "printText",
                      text:
                        "    本人确认以上物品交易抵扣的积分是本  人所持有的，且同意将上述积分数量范围  内兑换的礼品用上述协商价格不可撤销的  转让给受让人。如因此产生纠纷，双方可  协商或向人民法院起诉解决。\n"
                    },
                    {
                      rowtype: "printText",
                      text: "  ------------------------------------\n"
                    },
                    {
                      rowtype: "setFontSize",
                      fontsize: 18
                    },
                    {
                      rowtype: "printText",
                      text: "  SN: " + that.sn + "\n"
                    },
                    {
                      rowtype: "printText",
                      text:
                        "  本小票金额只做参考,以实际到账金额为准,最  终解释权为积分秒兑"
                    },
                    {
                      rowtype: "lineWrap",
                      n: 5
                    }
                  ]
                },
                function(ret, err) {
                  if (ret) {
                    that.oneDaYin = true;
                    let text = "打印成功，感谢您的使用，祝您生意兴隆！";
                    var bdTTS = api.require("bdTTS");
                    bdTTS.speak(
                      {
                        text: text
                      },
                      function(ret) {}
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  }
};
</script>
<style lang="less">
.orderDetails {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  .detailsBox {
    padding-top: 0.2rem;
    .title {
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #757575;
      height: 0.88rem;
      border-bottom: 1px solid #eeeeee;
      .money {
        font-style: normal;
        font-size: 0.5rem;
        color: #000;
      }
    }
    .list {
      padding: 0.2rem 0;
      border-bottom: 1px solid #eeeeee;
      .item {
        padding: 0 0.3rem;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.26rem;
        .success {
          color: #ffc107 !important;
        }
        .danger {
          color: #e51c23 !important;
        }
        .success {
          color: #009688 !important;
        }
        .right {
          color: #757575;
        }
      }
    }
    .detailsPic {
      .picBox {
        padding: 0.2rem 0.3rem;
        border-bottom: 1px solid #dddddd;
        overflow: hidden;
        li {
          width: 2.1rem;
          height: 2.1rem;
          margin-right: 0.2rem;
          margin-bottom: 0.2rem;
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .editor {
      .text {
        color: #757575;
        padding: 0.2rem 0.3rem;
      }
    }
  }
}
</style>