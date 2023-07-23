<template>
  <div class="loginbox">
    <div class="login-container">
      <div class="login-title">
        <h2 class="login-tittle__text">{{ title }}</h2>
      </div>
      <div class="horn-left-top"></div>
      <div class="horn-right-top"></div>
      <div class="horn-left-botton"></div>
      <div class="horn-right-botton"></div>
      <FORM></FORM>
    </div>
    <div id="stars"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import FORM from "./form.vue";

export default defineComponent({
  name:"LOGIN",
  components: {
    FORM
  },
  setup() {
    const title = ref("铁路轨道精测精捣信息化管理平台");
    onMounted(() => {
      localStorage.setItem("activetabindex", "");
      let starsCount = 800; //星星数量
      let distance = 800; //间距
      let parentStarts = document.getElementById("stars");
      for (let i = 0; i < starsCount; i++) {
        let childStart = document.createElement("div");
        childStart.setAttribute("class", "star");
        parentStarts.appendChild(childStart);
      }
      for (let i = 0; i < starsCount; i++) {
        let item = parentStarts.children[i];
        let speed = 0.2 + Math.random() * 1;
        let thisDistance = distance + Math.random() * 300;
        item.style.transformOrigin = "0 0 " + thisDistance + "px";
        item.style.transform =
          "translate3d(0,0,-" +
          thisDistance +
          "px) rotateY(" +
          Math.random() * 360 +
          "deg) rotateX(" +
          Math.random() * -50 +
          "deg) scale(" +
          speed +
          "," +
          speed +
          ")";
      }
    });
    return {
      title
    };
  }
});
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }

  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}
#stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: fixed;
  perspective-origin: 50% 100%;
  left: 65%;
  animation: rotate 66s infinite linear;
  bottom: 0;
}

:deep() {
  .star {
    width: 2px;
    height: 2px;
    background: #f7f7b8;
    position: fixed;
    top: 0px;
    left: 0;
    backface-visibility: hidden;
  }
}
#particles-js {
  width: 100%;
  height: 100%;
  position: relative;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: auto;
  margin-right: auto;
}
.loginbox {
  width: 100%;
  height: 100vh;
  background-image: url(~@/assets/images/login/dl-bg-2.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .login-container {
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(3px);
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid #00b7ff3a;
    box-sizing: border-box;
    position: absolute;
    right: calc(20vw - 100px);
    top: 35vh;
    box-sizing: border-box;
    .login-title {
      position: absolute;
      top: -18vh;
      text-align: center;
      margin-bottom: 10px;
      .login-tittle__text {
        font-size: 42px;
        color: #fff;
        font-family: "方正综艺简体";
        width: 100vw;
        background-image: linear-gradient(90deg, #009df4, #00e9d0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .horn-left-top {
      position: absolute;
      top: -2px;
      left: -2px;
      width: 40px;
      height: 40px;
      border: 5px solid transparent;
      border-top: 5px solid #00b8ff;
      border-left: 5px solid #00b8ff;
    }
    .horn-right-top {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 40px;
      height: 40px;
      border: 5px solid transparent;
      border-top: 5px solid #00b8ff;
      border-right: 5px solid #00b8ff;
    }
    .horn-left-botton {
      position: absolute;
      left: -2px;
      bottom: -2px;
      width: 40px;
      height: 40px;
      border: 5px solid transparent;
      border-bottom: 5px solid #00b8ff;
      border-left: 5px solid #00b8ff;
    }
    .horn-right-botton {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 40px;
      height: 40px;
      border: 5px solid transparent;
      border-bottom: 5px solid #00b8ff;
      border-right: 5px solid #00b8ff;
    }
  }
  ::-webkit-input-placeholder {
    color: #fff;
  }
}
:deep() .ant-form-item-explain.ant-form-item-explain-error > div {
  font-size: 15px;
}
</style>
