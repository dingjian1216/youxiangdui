<template>
  <div id="about">
    <div v-html="info.content"></div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import store from "../../store";
export default {
  data() {
    return {
      info: ""
    };
  },
  mounted() {
    apiHttp.getAbout(store.state.global.token, 1).then(res => {
      if (res.code == 1) {
        this.info = res.data;
      }
    });
  }
};
</script>
<style lang="less" scoped>
#about {
  background: #ffffff;
  padding: 0.3rem;
  img {
    max-width: 100%;
  }
}
</style>