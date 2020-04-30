<template>
  <div id="cashDetail">
    <div class="cashbox">
      <div class="cashItem">
        <span class="name">订单号</span>
        <span class="riht">{{info.out_trade_no}}</span>
      </div>
      <div class="cashItem">
        <span class="name">状态</span>
        <span v-if="info['status'] == 1" class="warning riht">审核中</span>
        <span v-if="info['status'] == 2" class="danger riht">已驳回</span>
        <span v-if="info['status'] == 3" class="success riht">已完成</span>
      </div>
      <div class="cashItem">
        <span class="name">提现金额</span>
        <span class="riht">{{info.money}}</span>
      </div>
      <div class="cashItem">
        <span class="name">收款行</span>
        <span v-if="info['type'] == 1" class="riht">支付宝</span>
        <span v-if="info['type'] == 2" class="riht">{{info.bankname}}</span>
      </div>
      <div class="cashItem">
        <span class="name">账号</span>
        <span v-if="info['type'] == 1" class="riht">{{info.alipay}}</span>
        <span v-if="info['type'] == 2" class="riht">{{info.card}}</span>
      </div>
      <div class="cashItem">
        <span class="name">提现时间</span>
        <span class="riht">{{info.create_time}}</span>
      </div>
      <div class="cashItem" v-show="info['status'] == 2">
        <span class="name">驳回原因</span>
        <span class="riht">{{info.info}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { CellFormPreview, Group, Cell } from "vux";
import store from "../../store";
export default {
  components: {
    CellFormPreview,
    Group,
    Cell
  },
  data() {
    return {
      info: "",
      id: this.$route.query.id
    };
  },
  mounted() {
    apiHttp.getCashDetail(store.state.global.token, this.id).then(res => {
      if (res.code == 1) {
        this.info = res.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
#cashDetail {
  height: 100%;
  background: #f5f5f5;
  padding-top: 0.2rem;
  box-sizing: border-box;
  .cashbox {
    padding: 0.2rem 0;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    .cashItem {
      padding: 0 0.3rem;
      line-height: 0.6rem;
      color: #757575;
      .name {
        float: left;
        margin-right: 1em;
        min-width: 4em;
        color: #999999;
        -moz-text-align-last: justify;
        text-align-last: justify;
      }
      .riht {
        display: block;
        overflow: hidden;
        word-break: normal;
        word-wrap: break-word;
        text-align: right;
      }
      .success {
        color: #ffc107 !important;
      }
      .danger {
        color: #e51c23 !important;
      }
      .success {
        color: #009688 !important;
      }
    }
  }
}
</style>