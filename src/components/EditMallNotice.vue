<template>
    <div class="EditMallNotice" style="background: #fff">
      <div class="new_product">
        <div class="new_box">
          <div class="mearee">
            <img src="../assets/img/home/index/zuixindongtai.png" class="left_img">
            <marquee>
              <marquee-item class="marquee_item"><img src="../assets/img/home/order/taobaojia.png"><div>会员 等你归来 5489 收益 <span>9.9元</span></div></marquee-item>
              <marquee-item class="marquee_item"><img src="../assets/img/home/order/taobaojia.png"><div>会员 等你归来 5489 收益 <span>9.9元</span></div></marquee-item>
              <marquee-item class="marquee_item"><img src="../assets/img/home/order/taobaojia.png"><div>会员 等你归来 5489 收益 <span>9.9元</span></div></marquee-item>
            </marquee>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Marquee, MarqueeItem} from 'vux'
export default {
  name: 'EditMallNotice',
  components: {
    Marquee, MarqueeItem
  },
  props: ['data', 'newList'],
  data () {
    return {}
  },
  methods: {
    handDetailNew (item) {
      this.$router.push({
        name: 'mallArticleInfo',
        query: item
      })
    }
  }
}
</script>

<style scoped lang="less">
.EditMallNotice{
  width: 7rem;
  height: 0.8rem;
  margin: 0.45rem 0.25rem 0;
  border:1px solid rgba(233,193,124,1);
  border-radius: 0.05rem;
  position: relative;
  .new_product{
    width: 100%;
    height: 100%;
    .new_box{
      width: 100%;
      height: 100%;
      .mearee{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .left_img{
          width: 1.24rem;
          height: 0.48rem;
          margin-right: 0.17rem;
          border-radius:0px 5px 5px 0px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .marquee_item{
          height: 0.56rem;
          font-size: 0.28rem;
          display: flex;
          align-items: center;
          img{
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.2rem;
          }
          span{
            color: #FE4F43;
          }
        }
      }
    }
  }
}
</style>
