<template>
  <div class="home">
    <el-scrollbar class="homebox">
      <div class="topbox flexbox">
        <div class="topleftbox ml20 pt10">
          <TzInfo></TzInfo>
          <GDXZ></GDXZ>
        </div>
        <div class="topleftbox mr20 pt10">
          <DJDG></DJDG>
          <PZDM></PZDM>
        </div>
      </div>
      <XMDT></XMDT>
    </el-scrollbar>
    <div id="homemapbox">
      <MAPS></MAPS>
    </div>
  </div>
</template>

<script>
import { defineComponent} from "vue";
import TzInfo from "./tzinfo.vue"
import GDXZ from "./gdxz.vue"
import DJDG from "./djdg.vue"
import PZDM from "./pzdm.vue"
import XMDT from "./xmdt.vue"
import MAPS from "./subwaymaps/mapecharts.vue"
export default defineComponent({
  name: "HomeView",
  components: {
    TzInfo,GDXZ,DJDG,PZDM,XMDT,MAPS
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  position: relative;
  #homemapbox{
    width: 100%;
    height: calc(100vh - 60px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0.6;
    zoom: 1.3;
  }
  .homebox {
    width: 100%;
    height: calc(100vh - 80px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    .topbox {
      width: 100%;
      justify-content: space-between;
      .topleftbox {
        width: 460px;
      }
    }
  }
}
:deep(){
  .ol-zoom,.ol-rotate{
    display: none !important;
  }
}
</style>
