<template>
  <div class="login">
    <!-- 登录背景 -->
    <vue-particles
      class="login-bg"
      style="position: absolute; width: 100%; height: 100%"
      color="#f4f4f4"
      :particle-opacity="0.7"
      :particles-number="100"
      shape-type="circle"
      :particle-size="4"
      lines-color="#f4f4f4"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="3"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
    />

    <div class="loginFrom">
      <a-form
        ref="logInFromRef"
        v-model:model="formInline"
        :rules="rules"
      >
        <a-form-item name="username">
          <a-input
            v-model:value="formInline.username"
            size="large"
            placeholder="用户名"
          >
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input
            v-model:value="formInline.password"
            size="large"
            type="password"
            placeholder="密码"
            autocomplete="new-password"
          >
            <template #prefix>
              <lock-outlined type="user" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            @click="submitFrom()"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { rules } from "./config";
import { FormInstance, message } from "ant-design-vue";
import { logInData, logInFrom } from "@/type/login/login";
import { userStore } from "@/store/user";
export default defineComponent({
  name: "LogIn",
  setup() {
    const store = userStore();
    // 登录表单
    const formInline = reactive(new logInData().logInFrom);

    // 表单dom
    const logInFromRef = ref<FormInstance>();

    // 提交表单
    const submitFrom = () => {
      //登录验证
      logInFromRef.value?.validate().then(() => {
        // message.success("登录成功");
        store.login(formInline);
      });
    };
    return { formInline, rules, logInFromRef, submitFrom };
  },
});
</script>
<style scoped lang="scss">
.login {
  .login-bg {
    background-color: #4d4d4d;
  }
  .loginFrom {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 360px;
    // .ant-form-item {
    // margin-bottom: 40px;
    // }
    .ant-input-affix-wrapper {
      border: 1px solid #fff;
      background-color: #00000000;
      border-top: 0 !important;
      border-left: 0 !important;
      border-right: 0 !important;
      box-shadow: none !important;
      &::-webkit {
        background-color: #00000000;
      }
      color: #fff;
      background-color: transparent;
    }
    ::v-deep {
      .ant-input {
        background-color: #00000000;
        border-top: 0 !important;
        border-left: 0 !important;
        border-right: 0 !important;
        box-shadow: none !important;
        &::-webkit {
          background-color: #00000000;
        }
        color: #fff;
      }
      .ant-form-item-has-error :hover {
        background-color: #00000000;
      }
    }
  }
}
</style>
