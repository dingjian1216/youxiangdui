<template>
  <div id="swiper">
    <div class="swiperBox">
      <swiper :options="swiperOption" class="swiper" ref="swiperBox">
        <swiper-slide v-for="(item, index) in data" :key="index">
          <img :src="item.img" alt />
        </swiper-slide>
      </swiper>
    </div>
    <!-- <div class="swiperBox1">
      <swiper :options="swiperOption1" class="swiper" ref="swiperBox1" >
        <swiper-slide v-for="(item, index) in data"  :key="index">
          <img :src="item.img" alt="" >
        </swiper-slide>
      </swiper>
    </div>-->
    <!-- <div class="swiperBox2"  >
      <swiper :options="swiperOption2" class="swiper2" ref="swiperBox2" >
        <swiper-slide v-for="(item, index) in data"  :key="index">
          <img :src="item.img" alt=""  >
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>-->
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "IndexSwiper",
  components: {
    swiper,
    swiperSlide
  },
  props: ["data"],
  data() {
    return {
      swiper: "",
      swiperOption: {
        grabCursor: true,
        loop: true,
        slidesPerView: 1,
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false
        // },
        on: {
          click: () => {
            let k = 0;
            for (let i in this.data.items) {
              if (k === this.$refs.swiperBox.swiper.realIndex) {
                this.jumpLink(this.data.items[i].link);
              }
              k++;
            }
          }
        }
      }
    };
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style  lang="less" scoped>
#swiper {
  overflow-x: hidden;
  height: 3.6rem;
  background: #fff;
  .swiperBox {
    position: relative;
    .swiper-slide {
      padding: 0 0.3rem;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 3.6rem;
        margin: 0 auto;
        border-radius: 0.2rem;
      }
    }
    .vux-slider {
      .vux-indicator {
        .vux-icon-dot {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.4);
        }
        .active {
          background: rgba(255, 255, 255, 1) !important;
        }
      }
    }
  }
}
</style>
