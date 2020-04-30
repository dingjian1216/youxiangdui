<template>
  <div id="news">
      <div class="title">{{data.title}}</div>
      <div class="time">{{data.create_time}}</div>
      <div class="content" v-html="data.content"></div>
  </div>
</template>

<script>
import * as apiHttp from "../../api/index";
import store from "../../store";
export default {
  name: "message",
 
  data() {
    return {
      id: this.$route.query.id,
      data:''
    };
  },
  methods: {
  },
  mounted(){
    console.log(123)
    apiHttp.getNewDetails(this.id,store.state.global.token).then(res => {
      if (res.code == 1) {
        this.data = res.data;
      }
    });
  }
};
</script>

<style scoped lang="less">
#news {
  height: 100%;
  font-size: 0.3rem;
  background: #ffffff;
  position: relative;
  padding-top:0.2rem;
  box-sizing: border-box;
  .title{
    text-align: center;
    font-size: 0.36rem;
  }
  .time{
    font-size: 0.28rem;
    color: #757575;
    padding-left: 0.3rem;
    // text-align: center;
  }
  .content{
    padding: 0.2rem 0.3rem;
  }

}
</style>