<template>
  <div class="boot-loading">
    <div class="loading-container">
      <img
        src="@/assets/images/loading.gif"
        class="loding-img"
        alt="加载中。。。"
      />
      <span class="loading-text">系统启动中...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss" scoped>
.boot-loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2000000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30vh;
  }
  .loding-img {
    width: 300px;
  }
  .loading-text {
    font-size: 14px;
    color: #aeaeae;
  }
}
</style>
