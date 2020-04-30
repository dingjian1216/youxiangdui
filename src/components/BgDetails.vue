<template>
<div id="goods">
    <span class="goBack" id='ps' style="top: 0.2rem" @click="goBack()">
        <img src="../assets/img/home/details/back.png" alt="">
    </span>
    <div class="vux-header" style="backgroundColor: opacity,paddingTop: 0.3rem">
      <div class="vux-header-left" style="top: 0.2rem"><a class="backBox"><i class="iconfont icon-back" @click="goBack"></i></a></div>
      <h1 class="vux-header-title"><span class="titleInfo">宝贝</span><span class="titleInfo">详情</span><span class="titleInfo">推荐</span></h1>
    </div>
    <div id="box" >
      <div class="goods_carousel">
        <div class="swiperBox">
          <swiper loop :show-dots="false" @on-index-change="onSwiperItemIndexChange">
            <swiper-item class="swiper-demo-img">
                <img src="../assets/img/home/index/banner.png">
            </swiper-item>
            <swiper-item class="swiper-demo-img">
                <img src="../assets/img/home/index/banner.png">
            </swiper-item>
            <swiper-item class="swiper-demo-img">
                <img src="../assets/img/home/index/banner.png">
            </swiper-item>
            <swiper-item class="swiper-demo-img">
                <img src="../assets/img/home/index/banner.png">
            </swiper-item>
            <swiper-item class="swiper-demo-img">
                <img src="../assets/img/home/index/banner.png">
            </swiper-item>
            <p class="goods_page_box"><span>{{swiperItemIndex}}</span>/4</p>
          </swiper>
        </div>
      </div>
      <div class="goodsInst">
        <div class="title"><img src="../assets/img/home/details/tblogo.png" alt="">
          <img src="../assets/img/home/details/tmlogo.png" alt="" >慢漫WHITE CONCEPT北欧式白色全纯棉四件套安丽娜家纺</div>
        <p class="numBox">9991人已购买</p>
        <div class="priceBox">
          <div class="price"><p class="new" style="color: #ccc"><span>￥</span>29.98</p><p class="old">￥29.98</p></div>
          <div class="profit">预估收益￥0.60</div>
        </div>
        <div class="update">
          <p style="color: red">现在升级运营商，最高获得0.68佣金</p><span>立即升级</span>
        </div>
        <div class="coupon">
          <img src="../assets/img/home/details/couponBg.png" class="bg">
          <p class="money" style="font-size: 0.8rem">12<span style="font-size: 0.2rem">元</span></p>
          <p class="money">12<span>元</span></p>
          <p class="time">使用期限 2019.03.12-2019.05.12</p>
        </div>
        <div class="description"><span>推荐</span>爱的发鬼地方个回复价格和太阳如图一对符合规范脚后跟妇科疾病不能买车东方红共同一人</div>
        <!--宝贝评论-->
      </div>
      <div class="commentBox">
        <p>宝贝评论(1062)</p> <p class="checkAll">查看全部</p>
      </div>
      <template>
        <div class="commentContent">
          <div class="titlee">
            <div class="head">
              <img src="../assets/img/home/details/back.png" alt="">
            </div>
            <div class="username">席小阳Sunny</div>
          </div>
          <p class="size">2019-01-23  适用床尺寸：1.8m(6英寸)床 颜色分类：贝克希尔</p>
          <p class="text">评价详情评价详情评价详情评价详情评价详情评价详情评价详情评价详情评价详情</p>
          <div class="imgbox" >
            <div></div>
          </div>
        </div>
      </template>
      <div class="shopBoxInfo">
        <img class="shopLogo" src="../assets/img/home/details/pddshop.png" alt="">
        <img class="shopLogo">
        <img class="shopLogo" src="../assets/img/home/details/tbshop.png" alt="">
        <img class="shopLogo" src="../assets/img/home/details/tmshop.png" alt="">
        <div class="shopInfo">
          <div class="title">
            <p><img src="../assets/img/home/details/tb1.png" alt=""><img src="../assets/img/home/details/tm.png" alt=""><img src="../assets/img/home/details/jd.png" alt=""><img src="../assets/img/home/details/pdd.png" alt="">other.shopName</p>
            <span>进店逛逛</span>
          </div>
          <div class="score">
            <p>宝贝描述<span style="color: red">other.score[0]</span></p>
            <p>卖家服务<span style="color: red">other.score[1]</span></p>
            <p>物流服务<span style="color: red">other.score[2]</span></p>
          </div>
        </div>
      </div>
      <div class="detailTitle" ref="detail" >
        <img src="../assets/img/home/details/detail.png" alt="">
      </div>
      <div class="detail" ref="detailBox">
        <div></div>
        <p class="pddCon">爱上对方过后就卡了</p>
        <img src="../assets/img/home/details/collectEd.png" alt="">
      </div>
      <div class="goods_like_box">
        <img src="../assets/img/home/details/collectEd.png" alt="">
      </div>
      <goods-item></goods-item>
    </div>
    <div class="footer">
      <div class="collect">
        <img src="../assets/img/home/details/collectEd.png" />
        <p style="color: red" >客服</p>
      </div>
      <div class="collect">
        <img src="../assets/img/home/details/share.png" />
        <p>分享赚￥0.60</p>
      </div>
      <div class="otherBox">
        <div class="Box"><p>券后￥89</p><p>再返￥12</p></div>
        <div class="Box" @click="purchase"><p>领券购买</p></div>
      </div>
    </div>
    <div class="goodsBarrage showBarrage">
      <!-- <img :src="barrage.avatar" alt=""> -->
      <p>barrage.action</p>
    </div>
    <div class="goods_back_top_box"></div>
    <div>
      <x-dialog v-model="showToast1" class="oauthBox">
        <div class="update">
          <img src="../assets/img/home/details/oauth.png" alt="" class="bg">
          <div class="contentBox">
            <div class="add">
              <p class="t" >淘宝渠道认证</p>
              <div class="info" >由于淘宝需要对渠道加强精细化管理，邀请您进行淘宝身份认证操作，届时没有进行身份认证的，将可能无法分享推广淘宝商品功能，请您提前认证。</div>
            </div>
            <div class="update_btn" ><span>稍后再说</span><span>马上认证</span></div>
          </div>
        </div>
      </x-dialog>
    </div>
    <confirm v-model="couponShow"
             @on-confirm="couponChange"
             title="提醒">
      <p style="text-align:center;">您的账户余额还有{{couponpassMoney}}元，不足以兑换 此优惠券，点击确认前往充值</p>
    </confirm>
</div>
</template>

<script>
import { TransferDom, dateFormat,  Confirm, Swiper,SwiperItem } from 'vux'
import * as utils from '../utils'
// import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { close } from 'fs';
export default {
  name: 'goods',
  components: {
    Swiper,
    SwiperItem,
    Confirm
  },
  data () {
    return {
      swiperItemIndex:0,
      showBarrage: false,
      barrage: '',
      couponShow: false,
      showToast1: false,
      showBack: true,
      opacity: 'rgba(255, 255, 255, 0)',
      shows: false,
      data: '',
      index: 0,
      imgs: [],
      like: '',
      width: '',
      showDetail: true,
      backShow: false,
      loading: null,
      skip: null,
      save: null,
      getCouponUrl: true,
      couponpassMoney: 0, // 优惠券卡密相关的一个变量
      swiperOption: {
        loop: true,
        on: {}
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.showDetail = true
      this.getCouponUrl = true
    }
  },
  computed: {
    h () {
      let size = (document.documentElement.clientWidth / 7.5)
      let height = 0
      if (window.api) {
        height = api.safeArea.top >= 30 ? api.safeArea.top + 5 : api.safeArea.top
      }
      return (height / size)
      // return 1
    }
  },
  filters: {
    dateFormat
  },
  directives: {
    TransferDom
  },
  methods: {
    onSwiperItemIndexChange (index){
      this.swiperItemIndex=index;
    },
    purchase(){
      this.$router.push('/OrderDetails');
    }
  }
}
</script>
<style lang="less">
  .oauthBox{
    display: none;
    .weui-dialog{
      max-width: 5.1rem !important;
      width: 5.1rem !important;
    }
    .weui-mask{
      background: rgba(0, 0, 0, 0.7);
    }
    .weui-dialog{
      background: none;
    }
    .update{
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 5.1rem;
      overflow: hidden;
      border-radius:0.2rem;
      .bg{
        width: 100%;
        float: left;
      }
      .contentBox{
        width: 100%;
        float: left;
        background: #fff;
        padding: 0 0.4rem 0.4rem;
        box-sizing: border-box;
        /*border-radius:  0 0 0.2rem 0.2rem;*/
      }
      .add{
        width: 100%;
        p{
          text-align: center;
          color: #666;
        }
        .t{
          font-size: .36rem;
          color: #333333;
        }
        .info{
          margin-top: .2rem;
          font-size: .24rem;
          color: #333333;
          text-align: left;
        }
        img{
          margin-top: .6rem;
          width: .76rem;
          height: .76rem;
        }
      }
      .update_btn{
        margin-top: 0.4rem;
        display: flex;
        justify-content: space-around;
        span{
          display: inline-block;
          width: 2rem;
          height: .6rem;
          border-radius: .3rem;
          text-align: center;
          background: #E5E5E5;
          line-height: .6rem;
          font-size: .3rem;
          color: #999;
        }
        span:last-of-type{
          color: #fff;
          background: linear-gradient(to right, #D456FF, #7468FF);
        }
      }
      .close{
        width: .76rem;
        height: .76rem;
        position: absolute;
        bottom: -0.76rem;
        left: 50%;
        margin-left: -0.38rem;
      }
    }
  }
</style>
<style lang="less" scoped>
  #goods{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .goBack{
      width: 0.48rem;
      height: 0.48rem;
      position: absolute;
      top: 0.2rem;
      z-index: 1001;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .vux-header{
      .vux-header-title{
        display: flex;
        justify-content: space-around;
        span{
          font-size: .3rem;
          color: #333;
        }
      }
    }
    #box{
      width: 100%;
        .goods_carousel{
          width: 100%;
          .swiperBox{
            // width:7.5rem;
            // height:6.8rem;
            .swiper-demo-img{
              width: 100%;
              height: 100%;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .goods_page_box{
              z-index: 100;
              padding: 0 .2rem;
              color: #fff;
              border-radius: .2rem;
              justify-content: center;
              letter-spacing: 3px;
              display: flex;
              align-items: center;
              position: absolute;
              right: .30rem;
              bottom: .33rem;
              height: .4rem;
              font-size: .2rem;
              background: rgba(0,0,0,0.4);
            }
          }
        }
        .goodsInst{
            background: #fff;
            padding: 0.2rem;
            .title{
                font-size: .32rem;
                line-height: .48rem;
                overflow: hidden;
                display: -webkit-inline-box;
                text-overflow:ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                img{
                  width: .33rem;
                  height: .33rem;
                  vertical-align: top;
                  margin-right: .09rem;
                  margin-top: .06rem;
                }
            }
            .numBox{
                margin-top: 0.1rem;
                font-size: 0.22rem;
                color: #999;
            }
            .priceBox{
                display: flex;
                justify-content: space-between;
                .price{
                display: flex;
                align-items: center;
                .new{
                    font-size: .36rem;
                    margin-right: 0.16rem;
                    span{
                    font-size: 0.24rem;
                    }
                }
                .old{
                    font-size: 0.26rem;
                    color: #999999;
                    text-decoration: line-through;
                }
                }
                .profit{
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-size: 0.26rem;
                    padding: 0 0.1rem;
                    height: 0.44rem;
                    border-radius: 0.06rem;
                }
            }
            .update{
                margin-top: 0.3rem;
                height: 0.62rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.1rem;
                background: rgba(255, 199, 0, 0.15);
                border-radius: 0.06rem;
                p{
                    font-size: 0.24rem;
                }
                span{
                    padding: 0 0.1rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    border-radius: 0.2rem;
                    color: #fff;
                    font-size: 0.2rem;
                }
            }
            .coupon{
                margin: 0.2rem 0.4rem;
                position: relative;
                height: 1.6rem;
                .bg{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
                .money{
                    position: absolute;
                    left: 0.4rem;
                    top: 0;
                    font-size: 1rem;
                    color: #fff;
                    line-height: 1.2rem;
                    span{
                        font-size: 0.3rem;
                    }
                }
                .time{
                    position: absolute;
                    left: 0.4rem;
                    bottom: 0;
                    color: #fff;
                    font-size: 0.2rem;
                }
            }
            .description{
                background: #F7F7F7;
                border-radius: 0.06rem;
                font-size: 0.24rem;
                margin-top: 0.2rem;
                padding: 0.1rem;
                span{
                    display: inline-block;
                    line-height: 0.34rem;
                    color: #fff;
                    padding: 0 0.1rem;
                    height: 0.34rem;
                    border-radius: 0.17rem;
                    font-size: 0.16rem;
                }
            }
        }
        .commentBox {
            position: relative;
            margin-top: 0.2rem;
            font-size: .3rem;
            background: #fff;
            height: 0.8rem;
            padding: 0 0.4rem 0 0.2rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            justify-content: space-between;
            p{
                line-height: 0.6rem;
                margin-top: 0.08rem;
            }
            .checkAll {
                color: #FF5847;
            }
            &:after{
                content: " ";
                display: inline-block;
                height: 6px;
                width: 6px;
                border-width: 2px 2px 0 0;
                border-color: #FF5847;
                border-style: solid;
                -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
                transform: matrix(.71,.71,-.71,.71,0,0);
                position: absolute;
                top: 50%;
                margin-top: -4px;
                right: .2rem;
            }
        }
        .shopBoxInfo{
            margin: 0.2rem 0;
            padding: 0.3rem 0.2rem;
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            .shopLogo{
                width: 1.16rem;
                height: 1.16rem;
                border-radius: 0.1rem;
                flex-shrink: 0;
                margin-right: 0.16rem;
            }
            .shopInfo{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .title{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    p{
                        font-size: 0.32rem;
                        color: #666;
                        display: flex;
                        align-items: center;
                        img{
                            width: 0.3rem;
                            height: 0.3rem;
                            margin-right: 0.06rem;
                            border-radius: 0.04rem;
                        }
                    }
                    span{
                        height: 0.44rem;
                        line-height: 0.44rem;
                        color: #fff;
                        border-radius: 0.22rem;
                        font-size: 0.2rem;
                        padding: 0 0.1rem;
                    }
                }
                .score{
                    display: flex;
                    align-items: center;
                    p{
                        font-size: 0.22rem;
                        color: #999999;
                    }
                    p:nth-of-type(2){
                        flex: 1;
                        text-align: center;
                    }
                }
            }
        }
        .goods_like_box{
            margin-top: 0.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: .9rem;
            background: #fff;
            img{
                width: 4rem;
            }
        }
    }
    .commentContent{
      font-size: .3rem;
      background-color: #fff;
      padding:.2rem;
      .titlee {
        line-height: .8rem;
        overflow: hidden;
        .head {
          float: left;
          height: .8rem;
          width: .8rem;
          border-radius: 50%;
          margin-right: .1rem;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .username {
          float: left;
        }
      }
      .size {
        font-size: .24rem;
        color: #999;
        margin: .15rem 0;
      }
      .imgbox {
        overflow: hidden;
        div{
          float: left;
          width: 2.28rem;
          height: 2.28rem;
          margin-right: 0.06rem;
          margin-top: 0.06rem;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
        div:nth-of-type(3n){
          margin-right: 0;
        }
      }
    }
    .footer{
      display: flex;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.9rem;
      background: #fff;
      .collect{
        width: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        i{
          color: #666666;
        }
        img{
          width: 0.28rem;
          height: 0.28rem;
          margin-bottom: 0.1rem;
        }
        p{
          font-size: .2rem;
          color: #666666;
        }
      }
      .collect:nth-of-type(2){
        width: 1.7rem;
      }
      .otherBox{
        width: 4.6rem;
        height: 0.9rem;
        display: flex;
        .Box{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: linear-gradient(to right, #FF9702, #FFCB00);
          font-size: 0.28rem;
          color: #fff;
          p{
            font-size: 0.24rem;
          }
        }
        .Box:nth-of-type(2){
          background: linear-gradient(to right, #F63D36, #F87B64);
          p{
            font-size: 0.28rem;
          }
        }
      }
    }
    .vux-header{
      border-bottom: 0;
      z-index: 1000;
      height: 0.88rem;
      box-sizing: content-box;
      .vux-header-left{
        /*top: .5rem;*/
        left: 0.2rem;
      }
      .high{
        width: 100%;
        height: .5rem;
        overflow: hidden;
      }
    }
    #box{
      .toOrder{
        p{
          font-size: 0.26rem;
        }
        .p1{
          span{
            padding-left: 0.1rem;
            font-size: 0.26rem;
          }
        }
        .p2{
          padding-left: 0.2rem;
          color: #fc3357;
        }
      }
    }
  }
  .detail{
    overflow: hidden;
    text-align: center;
    background: #fff;
    .pddCon{
      font-size: .24rem;
      color: #333;
      text-align: left;
      padding: .2rem;
      line-height: .46rem;
    }
    img{
      /*width: 100%;*/
      max-width: 100% !important;
      height: auto;
    }
    .desc_anchor{
      display: none;
    }
    .ssd-module-wrap{
      width: 100%;
      .ssd-module{
        width: 100%;
        padding-top: 100%;
        height: 0;
      }
    }
  }
</style>
<style lang="less" scoped>
  .detailTitle{
    height: 1.32rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    img{
      width: 4.1rem;
    }
  }
  
  .goodsBarrage{
    position: absolute;
    left: .34rem;
    top: 3rem;
    height: 0.6rem;
    border-radius: 0.3rem;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    display: flex;
    align-items: center;
    padding: 0 0.2rem 0 0.1rem;
    opacity: 0;
    img{
      width: 0.44rem;
      height: 0.44rem;
      border-radius: 50%;
      margin-right: 0.1rem;
    }
    p{
      font-size: 0.24rem;
      color: #fff;
    }
  }
  .showBarrage {
    animation: opacitySHow 8s linear infinite;
  }
  @keyframes  opacitySHow{
    0%{opacity:0}
    10%{opacity:0;}
    20%{opacity:0.35;}
    30%{opacity:0.7;}
    40%{opacity:1;}
    50%{opacity:1;}
    60%{opacity:1;}
    70%{opacity: 0.7;}
    80%{opacity: 0.35;}
    90%{opacity: 0;}
    100%{opacity:0;}
  }
  .goods_back_top_box{
    width: .74rem;
    height: .74rem;
    background-size: .74rem .74rem;
    position: absolute;
    right: .34rem;
    bottom: 1rem;
    background: url('../assets/img/home/details/back_top.png') no-repeat;
    background-size: 100% 100%;
  }
  .swiperBox{
    width: 100%;
    box-sizing: border-box;
    .vux-slider{
        // height: 2.8rem;
        .swiper-demo-img{
            // height: 2.8rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: 0.05rem;
            }
        }
    }
}

</style>
