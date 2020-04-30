<template >
  <div class="info">
    <div class="infoBox">
      <group v-if="info">
        <cell title="姓名" :value="info.name"></cell>
        <cell title="手机号" :value="info.mobile | phone"></cell>
        <cell title="身份证号" :value="info.ids | ali"></cell>
        <cell title="支付宝账号" :value="info.alipay | ali"></cell>
        <cell title="激活时间" :value="formatDate(info.create_time)"></cell>
      </group>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { Group, Cell } from "vux";
import store from "../../store";
import { formatDate } from "../../plugin/data";
export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      info: ""
    };
  },
  filters: {
    ali(val){
      let lang= val.length;
      let index = parseInt(lang) - 1;
      let  first = val.substring(0,2);
      let  last = val.substring(index-1);
      let center = val.substring(2,index-1)
      var re = /[0-9]|[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/g
      var num = center.replace(re,'*')
      return first + num + last
    },
    phone(val){
      return  val.substring(0,3) + '*****' + val.substring(8)
    }
  },
  mounted() {
    apiHttp.myIndex(store.state.global.token).then(res => {
      if (res.code == 1) {
        this.info = res.data;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.info .weui-cells {
  font-size: 0.3rem;
}
.weui-cell__hd {
  width: 2rem;
}
</style>