<template>
  <div class="undone">
    <img src="@/assets/images/undone.png" class="mb10" alt="页面正在开发中" />
    功能正在开发中，敬请期待...
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "UNDONE",
});
</script>

<style lang="scss" scoped>
.undone {
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
}
</style>
