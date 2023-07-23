<template>
  <div class="titlebox flexbox">
    <span>{{ title }}</span>
    <img src="../../assets/images/bigscreen/titlebg.png" alt="" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TITLES",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.titlebox {
  height: 37px;
  position: relative;
  align-items: center;
  span {
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    font-style: italic;
    -webkit-text-stroke-width: 1px #54c1f4;
    left: 40px;
    position: absolute;
    z-index: 2;
  }
  img {
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 1;
  }
}
</style>
