<template >
  <div id="price">
    <div class="header" :style="{paddingTop: statusH + 'rem'}">
      <i class="iconfont icon-back" @click="goBack()"></i>
      <div class="searchBox">
        <i class="iconfont icon-search"></i>
        <input placeholder="输入您要搜索的银行" type="search" @keyup.enter="getBank" v-model="name" />
      </div>
      <span @click="getBank">搜索</span>
    </div>
    <div class="priceBox"  :style="{marginTop:statusH + 'rem'}">
      <h3 class="title">积分兑换价格（单位：元/万）</h3>
      <table class="table" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th style="width: 20%;">银行名称</th>
            <th style="width: 15%;">用户价</th>
            <th style="width: 15%;">审核周期</th>
            <th style="width: 15%;">起兑分</th>
          </tr>
        </thead>
        <tbody v-for="(vo, index) in list" :key="index">
          <tr v-for="(vo, index2) in vo['goods_list']" :key="index2">
            <td>{{vo.name}}</td>
            <td>{{vo.hy_money}}</td>
            <td v-if="Index == 2" style="color:#e65013">{{vo.hj_money}}</td>
            <td>{{vo.settlement}}</td>
            <td>{{vo.rise}}</td>
          </tr>
        </tbody>
      </table>
      <div class="empty" v-if="showKong">
        <img src="../../assets/img/kong.png" />
        <p>暂无相关数据</p>
      </div>
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
      list: "",
      bankBox: "",
      name: "",
      showKong: false,
      statusH: ''
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  mounted() {
    apiHttp.gradeIndex(store.state.global.token).then(res => {
      if (res.code == 1) {
        this.list = res.data.list;
        this.bankBox = res.data.list;
      }
    });
  },
  methods: {
    getBank() {
      let bankBox = this.bankBox;
      this.showKong = false
      let list = [];
      for (let i in bankBox) {
        if (bankBox[i].name.indexOf(this.name) > -1) {
          list.push(bankBox[i]);
        }
      }
      if(list.length  < 1){
        this.showKong = true
      }else{
        this.showKong = false
      }
      this.list = list;
    }
  }
};
</script>
<style lang="less" scoped>
#price {
  height: 100%;
  position: relative;
  .title {
    padding: 0.2rem;
    color: #e65013 !important;
    text-align: center;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
  }
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
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 0.88rem;
  background: #e65013;
  .icon-back {
    font-size: 0.4rem;
    color: #ffffff;
    margin-top: 0.02rem;
  }
  .searchBox {
    width: 5.5rem;
    height: 0.6rem;
    border-radius: 0.3rem;
    background: #efefef;
    display: flex;
    align-items: center;
    padding-left: 0.3rem;
    .icon-search {
      font-size: 0.27rem;
      color: #999;
    }
    input {
      background: #efefef;
      margin-left: 0.2rem;
      width: 4.8rem;
      font-size: 0.26rem;
      color: #999;
      outline: none;
      border: none;
    }
  }
  span {
    font-size: 0.28rem;
    /*margin-right: .2rem;*/
    color: #ffffff;
  }
}
.priceBox {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
.empty {
  padding-top: 110px;
  text-align: center;
  img {
    display: inline-block;
    width: 150px;
  }
  p {
    font-size: 0.28rem;
    color: #757575;
    margin-top: 0.2rem;
  }
}
</style>