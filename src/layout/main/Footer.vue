<template>
  <footer class="footer">
    <span class="footer-container">
      <span class="copy"> 版权所有：中国铁路设计集团有限公司工程实验室 中国铁路经济规划研究院有限公司 </span>
      <a-divider type="vertical"></a-divider>
      <span class="visits">访问量:{{ visits }}</span>
    </span>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { userStore } from "@/store/user";
export default defineComponent({
  name: "FooTer",
  setup() {
    const store = userStore();
    const visits = computed(() => store.visits);
    return {
      visits,
    };
  },
});
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #e6e6e6;
  text-align: center;
  transform: translateY(100%);
  .footer-container {
    display: block;
    padding: 10px 0;
    font-size: 14px;
    color: #666;
    span {
      font-size: 14px;
    }
  }
}
</style>
