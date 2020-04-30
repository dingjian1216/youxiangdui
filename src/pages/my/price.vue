<template >
  <div id="price">
    <div class="aui-card-list aui-text-center">
      <h3 class="title">积分兑换价格（单位：元/万）</h3>
      <table class="table" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th style="width: 20%;">银行</th>
            <th style="width: 20%;">产品</th>
            <th style="width: 15%;">用户</th>
            <th style="width: 15%; color:#e65013" v-if="Index == 2">机主</th>
            <th style="width: 15%;">审核周期</th>
            <th style="width: 15%;">起兑分</th>
          </tr>
        </thead>
        <tbody v-for="(vo, index) in list" :key="index">
          <tr>
            <td :rowspan="vo.goods_list_count">{{vo.name}}</td>
            <td>{{vo['goods_list'][0]['goods_name']}}</td>
            <td>{{vo['goods_list'][0]['hy_money']}}</td>
            <td v-if="Index == 2" style="color:#e65013">{{vo['goods_list'][0]['hj_money']}}</td>
            <td>{{vo['goods_list'][0]['settlement']}}</td>
            <td>{{vo['goods_list'][0]['rise']}}</td>
          </tr>
          <tr v-for="(vo, index2) in vo['goods_list']" :key="index2" v-if="index2 >= 1">
            <td>{{vo.goods_name}}</td>
            <td>{{vo.hy_money}}</td>
            <td v-if="Index == 2" style="color:#e65013">{{vo.hj_money}}</td>
            <td>{{vo.settlement}}</td>
            <td>{{vo.rise}}</td>
          </tr>
        </tbody>
      </table>
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
      Index: this.$route.query.index,
      list: ""
    };
  },
  created() {
    if (this.Index == 2) {
      let text =
        "系统分成用户收益和机主收益，审核通过的报单是按照机主收益进行结算，机主和持卡人是按照小票的价格线下结算，小票价格是客户收益减去默认10%的服务费";
      var bdTTS = api.require("bdTTS");
      bdTTS.speak(
        {
          text: text
        },
        function(ret) {}
      );
    }
  },
  mounted() {
    apiHttp.gradeIndex(store.state.global.token).then(res => {
      if (res.code == 1) {
        this.list = res.data.list;
      }
    });
  }
};
</script>
<style lang="less">
#price .title {
  padding: 0.2rem;
  color: #e65013 !important;
  text-align: center;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table thead tr th,
.table tbody tr td {
  padding: 8px 0;
  text-align: center;
  color: #333;
  border: 1px solid #ddd;
  border-collapse: collapse;
  background-color: #fff;
  font-size: 0.2rem;
}
</style>