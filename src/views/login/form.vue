<template>
  <div class="login-form">
    <a-form :model="loginForm" :rules="rules" ref="vForm" class="dlLogin">
      <a-form-item name="username">
        <a-input
          size="large"
          v-model:value="loginForm.username"
          placeholder="用户名"
        >
          <template #prefix>
            <span class="iconfont">&#xe65a;</span>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input
          size="large"
          v-model:value="loginForm.password"
          placeholder="密码"
          type="password"
        >
          <template #prefix>
            <span class="iconfont">&#xe65b;</span>
          </template>
        </a-input>
      </a-form-item>
      <a-button
        type="primary"
        class="btn-login"
        size="large"
        :loading="isLoading && showimgsilder"
        @click="login"
        >登录</a-button
      >
    </a-form>
    <el-dialog
      append-to-body
      class="formdialog"
      v-model="showimgsilder"
      width="360px"
      top="30vh"
      title="拖动滑块完成验证"
    >
      <imgsilder
        v-if="showimgsilder"
        @success="querysuccess"
        @again="queryagain"
        @fail="queryfail"
        @refresh="queryrefresh"
      ></imgsilder>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import imgsilder from "./imgsilder/SlidePuzzleVerification.vue";
import { message } from "ant-design-vue";
import { rules } from "./config.js";
import storage from "@/utils/storage";
import router from "@/router";
import { projectInfo } from "@/config";
import axios from "axios";
import qs from "qs"
import {GetUserInfo} from "@/api/interface/basic-data"
// import Encrypt from "@/utils/secret";
export default defineComponent({
  name:"FORM",
  components: {
    imgsilder,
  },
  setup() {
    const loginForm = reactive({
      username: "",
      password: "",
      mobile: undefined,
      code: undefined
    });
    const showimgsilder = ref(false);
    const vForm = ref(null);
    // 加载效果
    const isLoading = ref(false);

    // 登录方法
    const login = () => {
      vForm.value
        .validate()
        .then((res) => {
          if (res) {
            showimgsilder.value = true;
            isLoading.value = true;
          }
        })
        .catch(() => ({}));
    };
    const querysuccess = () => {
      message.success("验证成功");
      axios({
        method: "POST",
        url: process.env.VUE_APP_BASE_URL+"/connect/token",
        data:qs.stringify({
          client_id:projectInfo.client_id,
          client_secret:projectInfo.client_secret,
          grant_type:projectInfo.grant_type,
          scope:projectInfo.scope,
          username:loginForm.username,
          password:loginForm.password
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        console.log(res);
        if (res?.status == 200) {
          let data = res.data;
          storage.setStorage("_token", data.access_token);
          getuserinfo()
        }else{
          message.error("登录失败")
        }
      }).catch((error)=>{
        message.error(error.message)
        isLoading.value = false;
        showimgsilder.value = false;
      });
    };
    const getuserinfo=()=>{
      GetUserInfo({loginname:loginForm.username}).then((res)=>{
        if(res){
          storage.setStorage("userinfo", res);
          isLoading.value = false;
          showimgsilder.value = false;
          message.success("登录成功")
          router.replace("/index");
        }else{
          message.success("用户未认证")
        }
      })
    }
    const queryagain = () => {};
    const queryfail = () => {
      message.error("验证失败，请重新进行验证");
    };
    const queryrefresh = () => {};

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      showimgsilder,
      queryrefresh,
      queryfail,
      queryagain,
      querysuccess,
      loginForm,
      login,
      isLoading,
      vForm,
      rules
    };
  },
});
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
}
.iconfont {
  font-size: 22px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}

:deep() {
  .ant-input-affix-wrapper .ant-input-prefix {
    margin-right: 20px;
  }
}
.login-form {
  .dlLogin {
    .yzm {
      color: #fff;
    }

    min-width: 352px;
    margin: 48px;
    ::v-deep {
      .ant-form-item {
        margin-bottom: 28px;
      }
      .ant-form-item-control-input {
        min-height: 50px;
      }
      .ant-input-affix-wrapper {
        background-color: #00000000;
        border: 2px solid #004b77 !important;
        border-radius: 6px !important;
        box-shadow: none !important;
        height: 49px;
        .ant-input {
          color: #fff;
          background-color: #00000000 !important;
        }
        &:hover {
          border-color: #00d2ff !important;
        }
        color: #fff;
      }
      .ant-select-arrow {
        color: #fff;
        font-size: 18px;
        width: 20px;
      }
      .ant-select > .ant-select-selector {
        .ant-select-selection-item {
          line-height: 49px;
        }
        padding-left: 50px;
        height: 49px;
        background-color: #00000000;
        border: 2px solid #004b77;
        border-radius: 6px;
        box-shadow: none !important;
        &::-webkit {
          background-color: #00000000;
        }
        .ant-select-selector {
          background-color: #00000000;
        }
        &:hover {
          border-color: #00d2ff !important;
        }
        color: #fff;
      }
    }

    .btn-login {
      width: 100%;
      background-color: #4a73ff;
      border-color: transparent;
      &:hover,
      &:focus {
        background-color: #40a9ff;
        border-color: #40a9ff;
      }
    }
  }
}
.icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
:deep() .ant-btn > span {
  color: #fff;
}
.yzm {
  font-size: 10px !important;
  cursor: pointer;
}
.time-yzm {
  cursor: auto;
  color: #ccc;
}
:deep() {
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(
      .ant-select-customize-input
    )
    .ant-select-selector {
    border-color: #00d0ffa1;
  }
  .ant-form-item-has-error .ant-input,
  .ant-form-item-has-error .ant-input-affix-wrapper,
  .ant-form-item-has-error .ant-input:hover,
  .ant-form-item-has-error .ant-input-affix-wrapper:hover {
    border-color: #00d2ff !important;
  }
  input:-internal-autofill-selected,
  input:-internal-autofill-previewed {
    // -webkit-box-shadow: 0 0 0 1000px white inset !important ;
    -webkit-text-fill-color: #ffffff !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }
  .ant-select-selection-item {
    line-height: 47.6px !important;
  }
}

.prefix-item {
  position: relative;
  .prefix {
    position: absolute;
    // top: 10px;
    left: 12.5px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
