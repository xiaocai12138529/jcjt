<template>
  <div class="typeTabBox flexbox">
    <span
      v-for="item in typelist"
      :key="item.name"
      @click.stop="itemclick(item)"
      :class="activetype == item.name ? 'activespan' : ''"
      >{{ item.name }}</span
    >
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TypeTab",
  emits: ["typechange"],
  props: {
    typelist: {
      type: Array,
      default: () => []
    },
    activetype:{
      type:String,
      default:""
    }
  },
  setup(props, { emit }) {
    const itemclick = (row) => {
      emit("typechange", row);
    };

    return { itemclick };
  },
});
</script>

<style lang="scss" scoped>
.typeTabBox {
  width: 100%;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
  span {
    padding: 0 15px;
    border-left: 2px solid #ffffff;
    font-size: 16px;
    cursor: pointer;
    color: #ffc06d;
  }
  span:nth-child(1) {
    border-left: none;
  }
  .activespan {
    color: #75feff;
  }
}
</style>
