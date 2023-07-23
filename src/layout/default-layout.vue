<template>
  <div class="default-layout">
    <index-header></index-header>
    <div class="layout-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import indexHeader from './index-header.vue'

export default defineComponent({
  name: 'defaultLayout',
  components: {
    indexHeader,
  },
  setup() {
    return { }
  }
})
</script>

<style lang="scss">
.default-layout {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/index/index-bg.jpg");
  background-size: 100%;
  background-position: center;

  .layout-container {
    width: 100%;
    height: 100%;
    padding-top:60px;
    overflow: hidden;
  }

  .upload-task-icon {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 1000000;
  }
}
</style>
