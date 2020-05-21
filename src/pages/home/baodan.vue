<template>
  <div class="baodan">
    <div class="singleBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="tip">
          <div class="tipMsg">请提交正确的券码信息，恶意提交无关券码，一经核实将扣款或封号</div>
        </div>
        <div class="baodanBox">
          <div class="title">选择产品</div>
          <div class="goodBox">
            <label
              class="aui-border"
              v-bind:class="{ active: pro_id == item.id}"
              @click="getNum(item.id,item.productname,item.jfnum)"
              v-for="(item,index) in list"
              :key="index"
            >
              <input type="radio" v-model="pro_id" :value="item.id" />
              {{item.productname}}
            </label>
          </div>
        </div>
        <group>
          <x-number title="数量" v-model="changeValue" :min="1"></x-number>
        </group>
        <div class="prove" v-show="type.indexOf('2')>=0">
          <div class="title">
            请上传券码截图
            <span @click="captureImage">拍照</span>
          </div>
          <div class="imgBox">
            <div class="imglist" v-for="(item,index) in imgSrc" :key="index">
              <img class="aui-margin-r-15" :src="item" />
              <span class="iconfont icon-close-b" @click="delImgList(index)"></span>
            </div>
            <span class="iconfont icon-tianjiatupian" @click="addImg()"></span>
          </div>
        </div>
        <div class="sms" v-show="type.indexOf('3')>=0">
          <div class="title" @click="shibie">
            点击右侧上传短信截图
            <img src="../../assets/img/you.png" alt class="you" />
          </div>
          <div class="smsBox">
            <textarea placeholder="兑换码短信" v-model="sms"></textarea>
          </div>
        </div>
        <group>
          <x-input title="真实姓名：" placeholder="请输入真实姓名" v-model="realname" :show-clear='false' ></x-input>
          <x-input title="手机号码:" placeholder="请输入手机号码" v-model="mobile" type="number" :show-clear='false' ></x-input>
          <x-input title="服务费(%):" placeholder="请输入服务费" v-model="fwf" :show-clear='false' ></x-input>
        </group>
        <div class="autograph">
          <img :src="sign" alt v-if="sign" class="sign" @click="goSign" />
          <span v-else @click="goSign">请点击此处开始签名</span>
        </div>
      </mescroll-vue>
    </div>
    <div class="setOrder" @click="setOrder">申请报单</div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { Group, XInput, XNumber } from "vux";
import MescrollVue from "mescroll.js/mescroll.vue";
import store from "../../store";
export default {
  components: {
    Group,
    XInput,
    XNumber,
    MescrollVue
  },
  data() {
    return {
      goods_id: this.$route.query.id,
      bank_id: this.$route.query.bankId,
      list: [], //产品类型列表
      pro_id: 0, //产品类型ID
      bankInfo: [], //银行信息
      sms: "", //短信
      imgSrc: [], //图片路径
      type: [], //类型
      orderSn: "", //订单号
      couponMoney: "", //优惠金额
      couponId: "", // 优惠券Id
      lang: "", //优惠券数量
      fwf: '10',//服务费
      sign: "",
      imgarr: "",
      goodName: "",
      goodJiFen: "",
      base64Str: "",
      realname: "",
      mobile: "",
      sn: "",
      userInfo: "",
      price: "",
      changeValue: 1, //兑换数量
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        auto: false,
        use: false
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        auto: false
      },
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null, // 路由切换时是否禁止ios回弹
      address: ""
    };
  },
  created() {
    this.$route.meta.isBack = true;
    console.log(this.$route.meta);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name == "sign") {
        if (store.state.global.sign) {
          vm.sign = store.state.global.sign;
          console.log(vm.sign);
        }
        if (vm.mescroll) {
          // 滚动到之前列表的位置
          if (vm.lastScrollTop) {
            vm.mescroll.setScrollTop(vm.lastScrollTop);
            setTimeout(() => {
              // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
              vm.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
            }, 16);
          }
          // 恢复到之前设置的isBounce状态
          if (vm.lastBounce != null) vm.mescroll.setBounce(vm.lastBounce);
        }
        api.setScreenOrientation({
          orientation: "portrait_up"
        });
        to.meta.isBack = false;
        var drawingBoard = api.require("drawingBoard");
        drawingBoard.close();
      }
      if (from.name == "goodInfo") {
        to.meta.isBack = true;
        vm.sign = "";
        vm.imgSrc = [];
        vm.changeValue = 1;
        (vm.realname = ""), (vm.mobile = "");
        vm.getgoodsDetail();
        vm.getAddress();
      }
      if (from.name == "my") {
        vm.getUser();
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "goodInfo") {
      this.$store.commit("setSign", "");
    }
    if (to.name == "sign") {
      if (this.mescroll) {
        console.log(this.mescroll.getScrollTop());
        this.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
        this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
        this.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true); // 允许bounce
      }
    }
    next();
  },
  activated() {},
  mounted() {
    let that = this;
    var SunmiPrinter = api.require("sunmiPrinter");
    SunmiPrinter.startService(function(ret, err) {});
    let Getsn = api.require("moduleDemo");
    Getsn.getSn({}, function(ret) {
      if (ret.sn) {
        that.sn = ret.sn;
      }
    });
    apiHttp.myIndex(store.state.global.token).then(res => {
      if (res.code == 1) {
        that.userInfo = res.data.name;
      }
    });
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {},
    getUser() {
      apiHttp.myIndex(store.state.global.token).then(res => {
        if (res.code == 1) {
          this.userInfo = res.data.name;
        }
      });
    },

    // 获取当前地址
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
            console.log(ret.lon);
            console.log(ret.lat);
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
    goSign() {
      this.$router.push({
        name: "sign",
        query: {
          w: api.winHeight
        }
      });
    },
    // 获取详情
    getgoodsDetail() {
      let that = this;
      this.goods_id = this.$route.query.id;
      apiHttp
        .getgoodsDetail(this.goods_id, this.$route.query.bankId)
        .then(ret => {
          if (ret.code === 1) {
            that.list = ret.data.list;
            that.bankInfo = ret.data.bankInfo;
            that.pro_id = that.list[0].id;
            that.type = that.bankInfo.type;
            that.orderSn = that.bankInfo.orderSn;
            that.goodName = that.list[0].productname;
            that.goodJiFen = that.list[0].jfnum;
            let text;
            if (that.type.indexOf("2") >= 0) {
              text =
                "确认报单数量，上传截图，填写客户姓名和手机号码，客户签名即可打印小票。";
            } else {
              text =
                "根据兑换的券码，选择相应的券值，然后点击右侧上传短信截图按钮，扫描手机短信区域，截图，锁定报单短信识别后。自行核对信息无误，即可报单";
            }
            var bdTTS = api.require("bdTTS");
            bdTTS.speak(
              {
                text: text
              },
              function(ret) {}
            );
          }
        });
    },
    // 拍照
    captureImage() {
      let This = this;
      api.getPicture(
        {
          sourceType: "camera",
          mediaValue: "pic",
          destinationType: "base64",
          allowEdit: true,
          preview: true
        },
        function(ret, err) {
          console.log("拍照" + JSON.stringify(ret));
          if (ret.data) {
            api.ajax(
              {
                url: "http://uat.xingciji.com/api/index/upload",
                method: "post",
                timeout: 30,
                data: {
                  files: {
                    file: ret.data
                  }
                }
              },
              function(ret, err) {
                if (ret.code == 1) {
                  var src = ret.data.img;
                  This.imgSrc.push(src);
                } else {
                  This.$vux.toast.text(ret.msg);
                  return;
                }
              }
            );
          } else {
            console.log(JSON.stringify(err));
          }
        }
      );
    },
    // 改变产品
    getNum(id, name, num) {
      let that = this;
      this.pro_id = id;
      that.goodName = name;
      that.goodJiFen = num;
    },
    // 添加图片
    addImg() {
      var UIAlbumBrowser = api.require("UIAlbumBrowser");
      let that = this;
      UIAlbumBrowser.open(
        {
          max: 9,
          styles: {
            bg: "#000000",
            cameraImg: "widget://res/cameraImg.png",
            mark: {
              icon: "",
              position: "top_right",
              size: 20
            },
            nav: {
              bg: "#000000",
              cancelColor: "#f00",
              cancelSize: 16,
              nextStepColor: "#7fff00",
              nextStepSize: 16
            }
          },
          animation: true
        },
        function(ret) {
          if (ret.eventType == "confirm") {
            if (ret.list && ret.list.length > 0) {
              that.imgarr = ret.list;
              that.UIAlbumBrowser_transPath();
            }
            UIAlbumBrowser.closePicker();
          }
        }
      );
    },
    // 获取添加图片的绝对路径
    UIAlbumBrowser_transPath() {
      var UIAlbumBrowser = api.require("UIAlbumBrowser");
      let that = this;
      for (let i = 0; i < this.imgarr.length; i++) {
        UIAlbumBrowser.transPath(
          {
            path: that.imgarr[i].path
          },
          function(ret, err) {
            if (ret) {
              i++;
              that.setPict(ret.path);
            }
          }
        );
      }
    },
    // 上传图片  券码截图
    setPict(file) {
      let that = this;
      api.ajax(
        {
          url: "http://uat.xingciji.com/api/index/upload",
          method: "post",
          timeout: 30,
          data: {
            files: {
              file: file
            }
          }
        },
        function(ret, err) {
          api.hideProgress();
          console.log(JSON.stringify(ret));
          if (ret) {
            if (ret.code == 1) {
              var src = ret.data.img;
              that.imgSrc.push(src);
            } else {
              this.$vux.toast.text(ret.msg);
              return;
            }
          } else {
            this.$vux.toast.text(err.msg);
          }
        }
      );
    },
    // 删除券码截图
    delImgList: function(index) {
      this.imgSrc.splice(index, 1);
    },
    // 提交申请
    setOrder() {
      let imgPic = JSON.stringify(this.imgSrc);
      let that = this;
      if (!this.sign) {
        this.$vux.toast.text("请签名后提交申请");
        return;
      }
      if (!imgPic && !this.sms) {
        this.$vux.toast.text("请上传券码截图或短信信息");
        return;
      }
      if (!this.realname) {
        this.$vux.toast.text("请填写客户姓名");
        return;
      }
      if (!this.mobile) {
        this.$vux.toast.text("请填写客户手机号");
        return;
      }
      var re = /^1\d{10}$/;
      if (!re.test(this.mobile)) {
        this.$vux.toast.text("手机号码有误");
        return;
      }
      if (!this.fwf) {
        this.$vux.toast.text("请输入服务费");
        return;
      }
      let fwf = this.fwf / 100
      apiHttp
        .setOrder(
          this.pro_id,
          this.sms,
          imgPic,
          this.orderSn,
          this.sign,
          this.realname,
          this.mobile,
          this.address,
          fwf,
          this.changeValue
        )
        .then(res => {
          if (res.code == 1) {
            this.price = res.data.price;
            this.$vux.toast.text("申请成功");
            this.printData();
          } else if (res.code == -1) {
            this.$vux.confirm.show({
              title: "提示",
              content: res.msg,
              onCancel() {
                console.log("plugin cancel");
              },
              onConfirm() {
                that.$router.push({
                  name: "my"
                });
              }
            });
          } else {
            that.$vux.toast.text(res.msg);
          }
        });
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    // 打印
    printData() {
      let that = this;
      var SunmiPrinter = api.require("sunmiPrinter");
      let format = "down" + new Date().getTime() + ".jpg";
      let date = new Date();
      let time = that.dateFormat("YYYY-mm-dd HH:MM", date);
      let allJF = that.goodJiFen * that.changeValue;
      api.download(
        {
          url: that.sign + "?imageView2/1/w/360/h/160",
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
                    text: "可兑智能POS机\n"
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
                    text: "  转让方:     " + that.realname + "\n"
                  },
                  {
                    rowtype: "printText",
                    text: "  联系方式:   " + that.mobile + "\n"
                  },
                  {
                    rowtype: "printText",
                    text: "  商品:       " + that.goodName + "\n"
                  },
                  {
                    rowtype: "printText",
                    text: "  交易金额:   " + that.price + "\n"
                  },
                  // {
                  //   rowtype: "printText",
                  //   text: "  受让方:     " + that.userInfo + "\n"
                  // },
                  {
                    rowtype: "printText",
                    text: "  消耗积分:    " + allJF + "\n"
                  },
                  {
                    rowtype: "printText",
                    text: "  兑换数量:    " + that.changeValue + "\n"
                  },
                  {
                    rowtype: "printText",
                    text: "  交易流水号:  " + that.orderSn + "\n"
                  },
                  {
                    rowtype: "printText",
                    text: "  交易时间:    " + time + "\n"
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
                    rowtype: "setAlignment",
                    alignment: 0
                  },
                  {
                    rowtype: "lineWrap",
                    n: 1
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
                      "  本小票金额只做参考,以实际到账金额为准,最  终解释权为可兑智能终端"
                  },
                  {
                    rowtype: "lineWrap",
                    n: 5
                  }
                ]
              },
              function(ret, err) {
                if (ret) {
                  let text = "打印成功，感谢您的使用，祝您生意兴隆！";
                  var bdTTS = api.require("bdTTS");
                  bdTTS.speak(
                    {
                      text: text
                    },
                    function(ret) {}
                  );
                  setTimeout(function() {
                    that.$router.push("/success");
                  }, 3000);
                }
                // alert(JSON.stringify(ret));
              }
            );
          }
        }
      );
    },
    shibie() {
      let that = this;
      var baiduAd = api.require("baiduIdentifyOCR");
      baiduAd.init(function(ret, err) {
        // alert(JSON.stringify(ret))
      });
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
          that.sms = text;
        }
      });
    }
  }
};
</script>

<style lang="less">
.baodan {
  height: 100%;
  background: #f6f6f6;
  position: relative;
  .singleBox {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 1.5rem;
    overflow-y: scroll;
    .tip {
      padding: 0.3rem;
      margin-bottom: 0.2rem;
      background: #ffffff;
      .tipMsg {
        background: #fff7ec;
        color: #c7845c;
        padding: 15px;
      }
    }
    .title {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.3rem;
      font-size: 0.32rem;
      color: #000;
      font-weight: 600;
      border-bottom: 1px solid #dddddd;
    }
    .baodanBox {
      margin-bottom: 0.2rem;
      background: #ffffff;
      position: relative;
      .goodBox {
        box-sizing: border-box;
        label {
          position: relative;
          display: inline-block;
          padding: 5px 20px;
          margin: 5px 6px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #ffffff;
          box-sizing: border-box;
          input {
            display: none;
          }
        }
        .active {
          border: 1px solid rgb(230, 80, 19);
        }
        .active:before {
          content: "";
          display: block;
          height: 0;
          width: 0;
          font-size: 0;
          border: 5px solid transparent;
          border-right: 5px solid rgb(230, 80, 19);
          border-bottom: 5px solid rgb(230, 80, 19);
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
    .prove {
      background: #ffffff;
      .title-right {
        margin-left: 5px;
        color: #b2b2b2;
        font-size: 0.24rem;
        font-weight: 400;
      }
      .imgBox {
        padding: 0.2rem 0.3rem;
        .imglist {
          position: relative;
          padding: 0;
          display: inline-block;
          width: 1.6rem;
          height: 1.6rem;
          margin-right: 0.4rem;
          margin-bottom: 0.3rem;
          img {
            max-width: 80px;
            max-height: 80px;
          }
          .iconfont {
            position: absolute;
            top: -0.2rem;
            right: -0.2rem;
            z-index: 99;
            font-size: 0.4rem;
            color: #757575;
            vertical-align: -0.15rem;
            fill: currentColor;
            overflow: hidden;
          }
        }
      }
      .icon-tianjiatupian {
        font-size: 1.4rem;
      }
    }
    .sms {
      background: #ffffff;
      .you {
        width: 0.4rem;
        height: 0.4rem;
      }
      .smsBox {
        padding: 0.2rem 0.3rem;
      }
      textarea {
        width: 100%;
        height: 2.2rem;
        line-height: normal;
        color: #424242;
        font-size: 0.32rem;
        font-family: inherit;
      }
    }
    .autograph {
      margin-top: 0.2rem;
      height: 2rem;
      background: #ffffff;
      .sign {
        width: 100%;
      }
      span {
        font-size: 0.28rem;
        color: #757575;
        line-height: 2rem;
        display: block;
        text-align: center;
      }
    }
  }

  .weui-cells {
    font-size: 0.32rem;
  }
  .weui-input {
    text-align: right;
  }
  .setOrder {
    position: absolute;
    left: 0.3rem;
    right: 0.3rem;
    bottom: 0.2rem;
    text-align: center;
    background: rgb(230, 80, 19);
    height: 1rem;
    line-height: 1rem;
    color: #fff;
  }
}
</style>