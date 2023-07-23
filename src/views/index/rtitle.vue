<template>
  <div class="rtitlebox flexbox">
    <span>{{title}}</span>
    <img src="../../assets/images/bigscreen/righttitle.png" alt="" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "RTITLES",
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
.rtitlebox {
  height: 37px;
  position: relative;
  align-items: center;
  span {
    position: absolute;
    font-size: 16px;
    color: #fff;
    z-index: 2;
    font-weight: 600;
    font-style: italic;
    -webkit-text-stroke-width: 1px #54c1f4;
    right: 46px;
  }
  img {
    height: 100%;
    position: absolute;
    right: 0;
    z-index: 1;
  }
}
</style>
