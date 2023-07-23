<template>
  <header class="index-header">
    <div class="navs">
      <router-link replace v-for="item in navList" :key="item.path" :to="{ path: item.path }" active-class="nav-active" class="nav-item">
        <span>{{ item.meta.title }}</span>
      </router-link>
    </div>
    <div class="under-line">
      <span class="web-title">{{ headertitle }}</span>
    </div>
    <div v-if="!userinfo.realName" class="user-option flexbox" @click="toLogin">
      <el-icon>
        <User />
      </el-icon>
      <span>登录</span>
    </div>
    <div v-if="userinfo.realName" class="user-option flexbox" @click="logout">
      <el-icon>
        <User />
      </el-icon>
      <span>{{ userinfo.realName }}</span>
    </div>
  </header>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import storage from "@/utils/storage";
export default defineComponent({
  name: "HEADER",
  components: {},
  setup() {
    const route = useRoute();
    const data = reactive({
      headertitle: process.env.VUE_APP_NAME,
      navList: "",
      userinfo: {
        realName: "",
      },
    });
    const getnavList = () => {
      if (storage.getStorage("userinfo")) {
        data.userinfo = storage.getStorage("userinfo");
      }
      if (route.matched && route.matched.length) {
        route.matched.map((item) => {
          if (item.name == "main") {
            data.navList = item.children;
          }
        });
      }
    };
    getnavList();
    const toLogin = () => {
      localStorage.clear();
      router.replace("/login");
    };
    const logout = () => {
      ElMessageBox.confirm("是否退出登录?", "提示", {
        type: "warning",
        cancelButtonText: "取消",
        confirmButtonText: "确认",
      })
        .then(() => {
          localStorage.clear();
          router.replace("/login");
          ElMessage.info("退出登录");
        })
        .catch(() => {});
    };
    return {
      ...toRefs(data),
      toLogin,
      logout,
    };
  },
});
</script>

<style lang="scss">
.index-header {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // 修改退出登录遮罩层为 998 , 对应统计分析板块为999
  z-index: 998;

  .user-option {
    position: fixed;
    top: 5px;
    right: 0;
    padding: 10px;
    color: #00ffff;
    font-size: 14px;
    cursor: pointer;
    z-index: 999;
    align-items: center;

    i {
      margin-right: 4px;
    }
  }

  .navs {
    position: absolute;
    width: 100%;
    padding: 0 5vw;
    z-index: 4;
    margin-top: 5px;

    .nav-item {
      display: inline-block;
      width: 105.9996px;
      height: 31.9998px;
      margin-left: 14px;
      margin-top: 6px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      position: relative;
      &:nth-of-type(-n + 4)::before {
        content: "";
        display: inline-block;
        width: 105.9996px;
        height: 31.9998px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #0084ff);
        opacity: 0.6;
        border: solid 1px #4c84f8;
        transform: skew(30deg);
        position: absolute;
        left: 0;
      }
      & > span {
        width: 105.9996px;
        font-size: 14px;
        text-align: center;
        font-weight: 600;
        line-height: 32.9994px;
        position: absolute;
        top: 0;
        left: 0;
      }
      &:nth-of-type(n + 5)::before {
        content: "";
        display: inline-block;
        width: 105.9996px;
        height: 31.9998px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #0084ff);
        opacity: 0.6;
        border: solid 1px #4c84f8;
        transform: skew(-30deg);
        position: absolute;
        right: 0;
      }
      &:nth-of-type(n + 5) {
        float: right;
      }

      &.nav-active::before {
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #20ffe7);
        opacity: 0.6;
        border: solid 1px #4c84f8;
      }
      &.nav-active::after {
        content: "";
        display: inline-block;
        width: 105.9996px;
        height: 31.9998px;
        background-image: url(../assets/images/index/activetab@2x.png);
        background-size: 100%;
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .under-line {
    position: relative;
    width: 100%;
    height: 65px;
    margin-top: 10px;
    background-image: url(../assets/images/index/big-head-bg.png);
    background-size: 100% 80%;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;

    .web-title {
      position: relative;
      bottom: 12px;
      height: 45px;
      font-family: "方正综艺简体";
      font-size: 30px;
      color: #9cfffa;
      line-height: 84px;
      user-select: none;
      background-image: -webkit-linear-gradient(bottom, #95d6fe, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      padding-top: 7px;
      font-family: SourceHanSansCN-Regular;
      font-size: 1.1vw;
      color: #fff;
      user-select: none;
    }
  }
}
</style>
