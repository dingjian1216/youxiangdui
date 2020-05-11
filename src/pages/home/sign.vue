<template>
  <div class="sign"  :style="{paddingTop: statusH + 'rem'}">
    <div class="signBtn">
      <div class="delSign" @click="goBack()">取消</div>
      <div class="sureSign" @click="sure()">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: "",
      size: ''
    };
  },
  created() {
    let size = document.documentElement.clientHeight / 7.5;
    this.statusH = api.safeArea.top / size;
    this.size = size
  },
  mounted() {
    api.setScreenOrientation({
      orientation: "landscape_left"
    })
    var left = 50;
    var top = 20;
    var signH = 260;
    var drawingBoard = api.require("drawingBoard");
    var w = 572
    drawingBoard.open({
      rect: {
        x: left,
        y: api.safeArea.top + top,
        w: w,
        h: signH
      },
      styles: {
        brush: {
          color: "#ff0000",
          width: 6
        },
        bgColor: "#fff"
      },
      fixedOn: api.frameName
    });
  },
  methods: {
    sure: function() {
      // this.$router.back(-1)
      let that = this;
      var drawingBoard = api.require("drawingBoard");
      let format = "sign" + new Date().getTime() + ".png";
      drawingBoard.save(
        {
          savePath: "fs://" + format,
          copyToAlbum: true,
          overlay: true
        },
        function(ret) {
          if (ret.absolutePath) {
            console.log(JSON.stringify(ret));
            api.ajax(
              {
                url: "http://uat.xingciji.com/api/index/upload",
                method: "post",
                timeout: 30,
                data: {
                  files: {
                    file: ret.absolutePath
                  }
                }
              },
              function(res, err) {
                if (res.code == 1) {
                  that.$store.commit("setSign", res.data.img);
                  drawingBoard.close();
                  that.$router.go(-1);
                } else {
                  alert(err.msg);
                }
              }
            );
          }
        }
      );
    }
  }
};
</script>
<style lang="less">
.sign {
  background: #f2f2f2;
  height: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  .vux-header .vux-header-left i{
    font-size: 19px;
  }
  .vux-header .vux-header-title{
    line-height: 40px;
  }
  .signBtn {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      padding: 5px 20px;
      background: rgb(230, 80, 19);
      color: #ffffff;
      font-size: 15px;
      text-align: center;
      border-radius: 0.1rem;
    }
  }
}
</style>