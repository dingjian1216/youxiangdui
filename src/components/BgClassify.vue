<template>
  <div :class="!list?'BgClassify':'merchandise'">
    <ul class="mall-list">
      <li><img src="../assets/img/home/index/taobao.png" alt=""><p>淘宝</p></li>
      <li><img src="../assets/img/home/index/tianmao.png" alt=""><p>天猫</p></li>
      <li><img src="../assets/img/home/index/jingdong.png" alt=""><p>京东</p></li>
      <li><img src="../assets/img/home/index/pinduoduo.png" alt=""><p>拼多多</p></li>
      <li><img src="../assets/img/home/index/0yuangou.png" alt=""><p>0元购</p></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BgClassify',
  props: ['list'],
  data(){
    return{
      mall:this.list
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
.BgClassify{
  width: 100%;
  height: 1.53rem;
  .mall-list{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 0.24rem;
    list-style: none;
    display: flex;
    li{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 0.7rem;
      }
      p{
        color:rgba(153,153,153,1);
        font-size: 0.24rem;
        font-weight: 500;
        height: 0.24rem;
        line-height: 0.24rem;
        margin-top: 0.12rem;
      }
    }
  }
}
.merchandise{
  width: 100%;
  ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li{
      width: 20%;
      padding-top: 0.26rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: 0.88rem;
      }
      p{
        height: 0.25rem;
        margin-top: 0.14rem;
        line-height: 0.25rem;
        font-size: 0.26rem;
        font-weight: 500;
        color:rgba(102,102,102,1);
      }
    }
  }
}
</style>
