
<template>
<div class="goods-list">
    <div class="recommend-goods" @click="Details">
        <img src="../assets/img/home/index/banner.png" alt="">
        <div>
          <div class="goods-title">奥尔贝比纯棉宝宝套装内衣奥尔贝比纯棉宝宝套装</div>
          <div class="goods-profit"><div>预估赚￥0.36</div><div>升级赚￥0.36</div></div>
          <div class="goods-proposed"><img src="../assets/img/home/index/shichangjia.png" /><div>￥88.50淘宝价</div></div>
          <div class="goods-price"><img src="../assets/img/home/index/hesuanjia.png" /><div>￥68.50</div><div>盒蒜价</div></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'BgGoodsList',
  props: ['list'],
  components: {

  },
  data(){
    return{
      mall:[]
    }
  },
  mounted(){
    console.log(this.mall)
  },
  methods: {
    Details () {
        this.$router.push({
        name: 'BgDetails'
      })
    },
  }
}
</script>

<style scoped lang="less">
.goods-list{
    .recommend-goods{
        border-top: 0.01rem solid rgba(238,238,238,1);
        padding: 0.3rem 0.25rem;
        display: flex;
        &>img{
            width: 2.4rem;
            height: 2.4rem;
            margin-right: 0.2rem;
            border-radius: 5px;
        }
        &>div{
            font-size: 0.26rem;
            font-weight: 500;
            color:rgba(51,51,51,1);
            line-height: 0.4rem;
            .goods-profit{
                display: flex;
                div{
                    height: 0.32rem;
                    margin-right: 0.26rem;
                    padding: 0.05rem 0.15rem;
                    line-height: 0.32rem;
                    border-radius: 0.03rem;
                    font-size: 0.24rem;
                    font-weight: 500;
                    color:rgba(255,255,255,1);
                }
                &>div:nth-child(1){
                    background: linear-gradient(-90deg,rgba(255,128,25,1) 0%,rgba(255,24,57,1) 100%);
                }
                &>div:nth-child(2){
                    background:linear-gradient(90deg,rgba(255,134,4,1) 0%,rgba(255,183,10,1) 100%);
                }
            }
            .goods-proposed{
                margin: 0.28rem 0 0.17rem;
                font-size: 0.24rem;
                font-weight:500;
                color:rgba(51,51,51,1);
                display: flex;
                align-items: center;
                img{
                    width: 0.24rem;
                    height: 0.24rem;
                    margin-right: 0.09rem;
                }
                div{
                    height: 0.24rem;
                    line-height: 0.24rem;
                }
            }
            .goods-price{
                display: flex;
                align-items: center;
                img{
                    width: 0.24rem;
                    height: 0.24rem;
                    margin-right: 0.09rem;
                }
                &>div:nth-child(2){
                    height: 0.23rem;
                    line-height: 0.23rem;
                    font-size: 0.3rem;
                    font-weight:bold;
                    color:rgba(252,57,66,1);
                }
                &>div:nth-child(3){
                    width: 1.32rem;
                    margin-left: 0.2rem;
                    text-align: center;
                    font-size: 0.2rem;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    background-image: url(../assets/img/home/index/biaoqian.png);
                    background-size: 100% 100%;
                }
            }
        }
    }
}
</style>