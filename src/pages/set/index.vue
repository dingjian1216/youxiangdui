<template>
  <div class="set">
    <x-header :left-options="{showBack: false}" style="background: #e65013;">设置中心</x-header>
    <div class="setBox">
      <div class="setList" @click="longrange">
        <span class="iconfont icon-yuanchengxiezhu"></span>
        远程协助
      </div>
      <div class="setList" @click="androidPic">
        <svg class="yeoh-icon" aria-hidden="true">
          <use xlink:href="#icon-tuku" />
        </svg>
        图库管理
      </div>
      <div class="setList" @click="open">
        <svg class="yeoh-icon" aria-hidden="true">
          <use xlink:href="#icon-yingyongshichang" />
        </svg>
        应用市场
      </div>
      <div class="setList" @click="andSet">
        <span class="iconfont icon-qunfengzhanghushezhi"></span>
        系统设置
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/less/font.js";
export default {
  methods: {
    andSet() {
      api.openApp({ androidPkg: "android.settings.SETTINGS" });
    },
    longrange() {
      api.openApp({ androidPkg: "com.sunmi.remotecontrol.pro" });
    },
    open() {
      api.openApp({ androidPkg: "woyou.market" });
    },
    androidPic() {
      api.getPicture(
        {
          sourceType: "library",
          mediaValue: "all",
          destinationType: "url",
          allowEdit: true,
          quality: 50,
          targetWidth: 100,
          targetHeight: 100,
          saveToPhotoAlbum: false
        },
        function(ret, err) {}
      );
    }
  }
};
</script>

<style lang="less" scoped>
.set {
  background: #f2f2f2;
  height: 100%;
  box-sizing: border-box;
  .setBox {
    padding-top: 0.2rem;
  }
  .setList {
    margin: 0 0.3rem 0.2rem;
    height: 1rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 0.3rem;
    border-radius: 0.2rem;
    position: relative;
    font-size: 0.32rem;
    .iconfont {
      font-size: 0.6rem;
      margin-right: 0.2rem;
    }
    .yeoh-icon {
      width: 0.6rem;
      margin-right: 0.2rem;
    }
    .icon-yuanchengxiezhu {
      color: #e65013;
    }
    .icon-qunfengzhanghushezhi {
      color: #757575;
    }
  }
  .setList::before {
    content: "";
    width: 0.2rem;
    height: 0.2rem;
    position: absolute;
    top: 50%;
    right: 0.3rem;
    margin-top: -0.1rem;
    background: transparent;
    border: 1px solid #666666;
    border-top: none;
    border-right: none;
    z-index: 2;
    border-radius: 0;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
}
</style>