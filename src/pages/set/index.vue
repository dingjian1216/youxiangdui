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
      <div class="setList" @click="clear">
        <span class="iconfont icon-qinglihuancun" style="color: #e65013"></span>
        清除缓存
        <span class="size">{{size}}</span>
      </div>
      
      <div class="setList" @click="andSet">
        <span class="iconfont icon-qunfengzhanghushezhi" style="color: #e65013"></span>
        系统设置
      </div>

      <div class="setList" @click="hardwarekeeper">
        <span class="iconfont icon-yingjianguanli" style="color: #e65013; font-size: 0.5rem"></span>
        硬件管家
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/less/font.js";
export default {
  data() {
    return {
      size: ""
    };
  },
  mounted() {
    this.getSize();
  },
  methods: {
    getSize() {
      let size = api.getCacheSize({
        sync: true
      });
      let kbCache = Math.round(Number(size) / 1024);
      if (kbCache < 1) {
        if (size) {
          this.size = size + "B";
        } else {
          this.size = "";
        }
      } else if (kbCache < 1024) {
        this.size = kbCache + "KB";
      } else {
        this.size = Math.round(Number(kbCache) / 1024) + "MB";
      }
    },
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
      api.openApp({ androidPkg: "com.sunmi.gallery" }, function(ret, err) {});
    },
    hardwarekeeper() {
      api.openApp({ androidPkg: "com.woyou.hardwarekeeper" });
    },
    clear() {
      let that = this;
      console.log(that.size === "");
      if (that.size === "") {
        return;
      }
      api.clearCache(function() {
        that.size = "";
        api.toast({
          msg: "清除完成"
        });
      });
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
    .size {
      position: absolute;
      top: 0;
      right: 0.6rem;
      font-size: 0.28rem;
      color: #757575;
      line-height: 1rem;
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