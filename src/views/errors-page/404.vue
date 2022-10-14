<template>
  <div class="not-found">
    <a-result
      status="404"
      title="404"
      sub-title="您输入的地址有误。"
    >
      <template #extra>
        <a-button
          type="primary"
          @click="toHome"
        >返回主页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "ErroR404",
  setup() {
    const router = useRouter();
    const toHome = () => {
      router.push("/");
    };
    return {
      toHome,
    };
  },
});
</script>

<style lang="scss" scoped>
.not-found {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .not-found__text {
    font-size: 20px;
  }
}
</style>
