<template>
  <div class="undone">
    <img src="@/assets/images/undone.png" class="mb10" alt="页面正在开发中" />
    功能正在开发中，敬请期待...
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss" scoped>
.undone {
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #3d4b58;
  font-weight: bold;
}
</style>
