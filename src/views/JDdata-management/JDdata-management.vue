<template>
  <div class="jddatabox">
    <PublicMenu :menulist="menulist" :activemenu="activemenu" @getmenu="getmenu"></PublicMenu>
    <div class="sectionbox">
      <div class="conbox" v-if="activemenu==1">
        <JHGL></JHGL>
      </div>
      <JCKZ v-else-if="activemenu==2"></JCKZ>
      <GDXZJC v-else-if="activemenu==4"></GDXZJC>
      <PZDMYH v-else-if="activemenu==3"></PZDMYH>
      <DJDGWX v-else-if="activemenu==6"></DJDGWX>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import PublicMenu from "@/components/publicMenu/publicMenu.vue";
import GDXZJC from "@/views/track-detection/track-detection.vue";
import PZDMYH from "@/views/section-optimization/section-optimization.vue";
import DJDGWX from "@/views/machine-maintenance/machine-maintenance.vue";
import JHGL from "@/views/JDdata-management/plan-management/index.vue";
import JCKZ from "./JCKZ/index.vue";
export default defineComponent({
  name: "account-management",
  components: { PublicMenu, GDXZJC, PZDMYH, DJDGWX, JHGL, JCKZ },
  setup() {
    const data = reactive({
      activemenu: 1,
      menulist: [
        { id: 1, name: "捣固计划" },
        { id: 2, name: "精测控制" },
        { id: 3, name: "轨道精测" },
        { id: 4, name: "优化设计" },
        { id: 5, name: "优化评价" },
        { id: 6, name: "精捣作业" },
        { id: 7, name: "捣固评价" },
      ],
    });
    const getmenu = (id) => {
      data.activemenu = id;
    };
    return { ...toRefs(data), getmenu };
  },
});
</script>
<style lang="scss" scoped>
.jddatabox {
  position: relative;
  width: 100%;
  height: calc(100vh - 20px);
  color: #00ffff;
  z-index: 998;
  .sectionbox {
    width: calc(100vw - 20px);
    height: 100%;
    margin: 0 auto;
  }
  .conbox {
    padding-top: 50px;
  }
}
</style>
