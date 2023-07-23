<template>
  <div class="menubox flexbox">
    <div
      class="menulist flexbox"
      v-for="item in menulist"
      :key="item.id"
      @click.stop="menuclick(item.id)"
    >
      <span :style="activemenu == item.id ? 'color:#75feff' : 'color:#fc8211'">{{
        item.name
      }}</span>
      <span v-if="activemenu == item.id"></span>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "PublicMenu",
  emits: ["getmenu"],
  props: {
    menulist: {
      default: [],
    },
    activemenu:{
        default: 0,
    }
  },
  setup(props,{emit}) {
    const activemenuid = computed(()=>props.activemenu)
    const menuclick = (id) => {
      emit("getmenu",id)
    };
    return {activemenuid, menuclick };
  },
});
</script>
<style lang="scss" scoped>
.menubox {
  width: calc(50vw - 40px);
  height: 50px;
  color: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  align-items: center;
  padding-left: 40px;
  z-index: 1000;
  .menulist {
    height: 50px;
    padding: 0 10px;
    align-items: center;
    cursor: pointer;
    margin-right: 20px;
    position: relative;
    span:nth-child(1) {
      font-size: 16px;
      color: #fc8211;
      font-weight: 600;
    }
    span:nth-child(2) {
      width: 100%;
      height: 2px;
      background: #75feff;
      border-radius: 2px;
      position: absolute;
      bottom: 0px;
      left: 0px;
    }
  }
}
</style>
