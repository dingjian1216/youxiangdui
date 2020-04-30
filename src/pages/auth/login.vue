<template>
  <div id="login">
    <div class="aui-content-padded">
      <div class="bgbox">
        <h2>登录</h2>
        <div class="aui-content-padded aui-margin-b-15">
          <ul class="aui-list aui-form-list">
            <li class="aui-list-item yeoh-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label aui-font-size-14">账号</div>
                <div class="aui-list-item-input">
                  <input
                    class="aui-font-size-14"
                    type="number"
                    pattern="[0-9]*"
                    placeholder="请输入手机号"
                    v-model="mobile"
                  />
                </div>
              </div>
            </li>
            <li class="aui-list-item yeoh-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label aui-font-size-14">密码</div>
                <div class="aui-list-item-input">
                  <input
                    class="aui-font-size-14"
                    type="password"
                    placeholder="请输入密码"
                    v-model="password"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="circle" tapmode @click="loginbtn">
          <span class="iconfont icon-xiangyou"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { type } from "os";
import * as apiHttp from "../../api/index";
import { log } from 'util';
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      password: "",
      sn: '',
    };
  },
  inject: ["reload"],
  created() {
    let that = this;
    let Getsn = api.require("moduleDemo");
    Getsn.getSn({}, function(ret) {
      if (ret.sn) {
        that.sn = ret.sn
        apiHttp.getCheckSn(ret.sn).then(res => {
          if (res.code == 0) {
            that.$router.push("/register");
          }
        });
      }
    });
  },
  mounted() {

  },
  methods: {
    loginbtn() {
      if (!this.mobile) {
        this.$vux.toast.text("手机号不能为空");
        return;
      }
       var re = /^1\d{10}$/;
      if (!re.test(this.mobile)) {
        this.$vux.toast.text("手机号码有误");
        return;
      }
      if (!this.password) {
        this.$vux.toast.text("请输入密码");
        return;
      }
      let that = this;
      apiHttp.getLogin(this.mobile, this.password,this.sn).then(res => {
        if (res.code === 1) {
          that.$store.commit("setToken", res.data.token);
          that.reload();
          that.$router.push("/home");
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    }
  },
  mounted: function() {}
};
</script>

<style scoped lang="less">
#login {
  overflow-x: hidden;
  height: 100%;
  background: #fff;
  overflow-y: auto;
  font-size: 0.28rem;
  background: #e65013;
  padding-top: 1.5rem;
  box-sizing: border-box;
  .aui-content-padded {
    padding: 0 0.3rem;
    position: relative;
  }
  body {
    background: #e65013;
  }

  h2 {
    text-align: center;
    color: #e83632;
    padding-top: 0.4rem;
  }

  .bigbox {
    width: 100%;
    position: absolute;
    top: 1.6rem;
  }

  .aui-list,
  .aui-list .aui-list-item {
    background-image: none;
  }

  .bgbox {
    background: url(../../../static/white.png) no-repeat;
    background-size: 100% 100%;
    height: 7.2rem;
  }

  .aui-list .aui-list-item {
    padding-left: 0;
    padding-top: 0.4rem;
  }

  .aui-list .aui-list-item-inner {
    border-bottom: 1px solid #ddd;
    padding-left: 0.3rem;
    position: relative;
    min-height: 0.88rem;
    padding-right: 0.3rem;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .aui-list .aui-list-item-label,
  .aui-list .aui-list-item-label-icon {
    color: #212121;
    width: 35%;
    min-width: 0.6rem;
    margin: 0;
    padding: 0;
    padding-right: 0.1rem;
    line-height: 0.44rem;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
  }
  .aui-list-item-input {
    width: 100%;
    padding: 0;
    padding-right: 0.75rem;
    -webkit-box-flex: 1;
    box-flex: 1;
    -webkit-flex-shrink: 1;
    flex-shrink: 1;
  }

  .forget {
    padding-top: 0.2rem;
    position: absolute;
    right: 15px;
  }

  .circle {
    width: 1rem;
    height: 1rem;
    background: #e83632;
    border-radius: 1rem;
    position: absolute;
    right: 0.6rem;
    margin-top: 1.2rem;
    box-shadow: 0 2px 8px #999;
    text-align: center;
    line-height: 1rem;
  }

  .iconfont {
    font-size: 0.4rem;
    color: #fff;
    fill: currentColor;
    overflow: hidden;
  }

  .zc {
    color: #fff;
    width: 2rem;
    margin: 0 auto;
    margin-top: 1.2rem;
  }
}
</style>
