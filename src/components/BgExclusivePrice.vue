
<template>
<div class="exclusive">
    <div class="exclusive-top">
        <div>
            <img src="../assets/img/home/index/9.9.png" alt="">
            <span>9.9专享价</span>
        </div>
            <span>查看更多<i class="icofont rounded-right"></i></span>
    </div>
    <div class="exclusive-list">
        <div class="exclusive-goods">
            <img src="../assets/img/home/index/vipmianfeilingqu.png" alt="">
            <p>源本初见洁面乳...</p>
            <div>￥9.9<s>￥19.9</s></div>
        </div>
        <div class="exclusive-goods">
            <img src="../assets/img/home/index/vipmianfeilingqu.png" alt="">
            <p>源本初见洁面乳...</p>
            <div>￥9.9<s>￥19.9</s></div>
        </div>
        <div class="exclusive-goods">
            <img src="../assets/img/home/index/vipmianfeilingqu.png" alt="">
            <p>源本初见洁面乳...</p>
            <div>￥9.9<s>￥19.9</s></div>
        </div>
        <div class="exclusive-goods">
            <img src="../assets/img/home/index/vipmianfeilingqu.png" alt="">
            <p>源本初见洁面乳...</p>
            <div>￥9.9<s>￥19.9</s></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'BgExclusivePrice',
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
    handDetail (id) {
      this.$router.push({
        name: 'mallHomeDetail',
        query: {
          title: id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.exclusive{
    width: 100%;
    display: flex;
    flex-direction: column;
    .exclusive-top{
        margin: 0.3rem 0.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
            height: 0.31rem;
            font-size: 0.32rem;
            font-weight:bold;
            color:rgba(51,51,51,1);
            display: flex;
            align-items: center;
            img{
                width: 0.38rem;
                height: 0.38rem;
                margin-right: 0.13rem;
                border-radius: 50%;
            }
            span{
                height: 0.33rem;
                line-height: 0.33rem;
                font-size: 0.32rem;
                font-weight:bold;
                color:rgba(51,51,51,1);
            }
        }
        &>span{
            height: 0.24rem;
            line-height: 0.24rem;
            font-size: 0.24rem;
            font-weight:500;
            color:rgba(153,153,153,1);
        }
    }
    .exclusive-list{
        width: 100%;
        display: flex;
        overflow: auto;
        box-sizing: border-box;
        padding: 0 0.15rem 0.34rem;
        .exclusive-goods{
            margin: 0 0.1rem 0;
            img{
                width: 2.1rem;
                height: 2.1rem;
                border-radius:5px;
            }
            p{
                height: 0.25rem;
                font-size: 0.26rem;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
            div{
                height: 0.19rem;
                margin-top: 0.15rem;
                font-size: 0.24rem;
                font-weight:500;
                color:rgba(252,57,66,1);
                s{
                    margin-left: 0.19rem;
                    color:rgba(153,153,153,1);
                }
            }
        }
    }
}
</style>