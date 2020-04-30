<template>
  <div class="moneyDetail">
    <group>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { CellFormPreview, Group, Cell } from 'vux'
import store from "../../store";
export default {
   components: {
    CellFormPreview,
    Group,
    Cell
  },
  data(){
    return{
      info: '',
      id: this.$route.query.id,
      list: [],
    }
  },
  mounted(){
    apiHttp.getMoneyDetail(store.state.global.token,this.id).then(res => {
      if (res.code == 1) {
        this.info = res.data
        this.list = [{label: '订单号',value: this.info.order_number},
        {label: '变动金额',value: this.info.money},
        {label: '变动类型',value: this.info.type_name},
        {label: '变动时间',value: this.info.create_time},
        {label: '说明',value: this.info.note},]
      }
    });
  }
}
</script>