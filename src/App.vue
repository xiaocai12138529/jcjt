<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import zhCn from "ant-design-vue/lib/locale/zh_CN.js";
// import "@/assets/icon/iconfont.js";
export default defineComponent({
  setup() {
    return {
      locale: zhCn,
    };
  },
});
</script>
<style lang="scss">
</style>
