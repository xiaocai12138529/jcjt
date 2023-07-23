<template>
  <div class="formTabBox flexbox">
    <div v-for="item in tablist" :key="item.name" @click.stop="tabclick(item)" :class="activetab == item.name ? 'activetablist tablist' : 'tablist'">
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormTab',
  emits: ['formchange'],
  props: {
    tablist: {
      type: Array,
      default: () => [],
    },
    activetab: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const tabclick = (row) => {
      emit('formchange', row)
    }

    return { tabclick }
  },
})
</script>

<style lang="scss" scoped>
.formTabBox {
  width: 100%;
  height: 36px;
  align-items: center;

  .tablist {
    min-width: 80px;
    padding: 0 12px;
    height: 32px;
    background-image: url('../../../assets/images/account/blue-block.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    margin-right: 12px;
    cursor: pointer;
  }

  .activetablist {
    color: #fcca00;
    background-image: url('../../../assets/images/account/green-block.png');
  }
}
</style>
