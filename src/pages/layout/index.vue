<template>
  <view-box
    ref="viewBox"
    :body-padding-top="$route.meta.isShowHead ? '.88rem' : '0'"
    :body-padding-bottom="$route.meta.isShowTab ? '1.06rem' : '0'"
  >
    <x-header
      v-show="$route.meta.isShowHead"
      slot="header"
      :left-options="{showBack: false}"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;background:#e65013;color:#fff"
    >
      <a slot="left" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <transition :name="transitionName">
      <keep-alive>
        <router-view  v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view  v-if="!$route.meta.keepAlive"></router-view>
    </transition>
 
    <tabbar slot="bottom" class="tabbar" v-show="$route.meta.isShowTab">
      <tabbar-item :selected="$route.name === 'message'" link="/message">
        <img slot="icon" src="../../assets/img/message.png" alt="">
        <img slot="icon-active" src="../../assets/img/message1.png" alt="">
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name === 'home'" link="/home">
        <img slot="icon" src="../../assets/img/jifen.png" alt="">
        <img slot="icon-active" src="../../assets/img/jifen1.png" alt="">
        <span slot="label">积分兑换</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name === 'set'" link="/set">
        <img slot="icon" src="../../assets/img/set.png" alt="">
        <img slot="icon-active" src="../../assets/img/set1.png" alt="">
        <span slot="label">设置</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem, XHeader } from 'vux'
export default {
  name: 'index',
  data () {
    return {
      h: (49 + Number(window.api && api.safeArea.bottom || 0)) + 'px',
      transitionName: '',
      pageName: ['home', 'my'],
      bot: window.api && api.safeArea.bottom || 0
    }
  },
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    XHeader
  },
  mounted () {
    if (window.api) {
      document.getElementById('tabbarBox') && (document.getElementById('tabbarBox').style.paddingBottom = api.safeArea.bottom + 'px')
      document.getElementById('tabbar1') && (document.getElementById('tabbar1').style.paddingBottom = api.safeArea.bottom + 'px')
    }
  },
  // 此段添加内容
  watch: {
    '$route' (to, from) {
      if (from.meta.routerZindex > to.meta.routerZindex) {
        this.transitionName = 'slide-right'
      } else if (from.meta.routerZindex < to.meta.routerZindex) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-none'
      }
    }
  }
}
</script>

<style scoped lang="less">
  #tabbar{
    height: 49px;
  }
  #tabbar1{
    height: 49px;
  }
  .router-fade-enter-active, .router-fade-leave-active {
    position: absolute;
    width: 100%;
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .weui-tabbar{
    // background: #fff;
  }
  .weui-tabbar:before{
    border-top: 1px solid #e0dee6;
  }
</style>
<style lang="less">
  #layout{
    .weui-tabbar__item{
      padding-top: 7px;
    }
    .vux-header{
      .vux-header-left{
        left: 0;
        top: 0;
        .backBox{
          display: block;
          height: 0.88rem;
          line-height: .88rem;
          padding: 0 .2rem;
        }
      }
    }
    .tabbarBox{
      z-index: 2000;
      box-shadow: 0 4px 8px #525252;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 49px;
      padding-top: 5px;
      box-sizing: content-box;
      width: 100%;
      display: flex;
      .tabbar{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .tabbarIcon{
          width: 23px;
          height: 23px;
          display: inline-block;
          margin-bottom: 1px;
          img{
            width: 23px;
            height: 23px;
            display: inline-block;
          }
        }
        .tabbarName{
          font-size: 12px;
          color: #999;
          line-height: 1.8;
          text-align: center;
        }
      }
      .upTab{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .tabbarIcon{
          background: #fff;
          margin-top: -0.5rem;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
        }
      }
    }
  }
</style>
