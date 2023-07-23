<template>
  <svg class="svg-icon" :style="{ width: size + 'px', height: size + 'px', color: color }" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
  export default {
    name: 'svg-icon',
    props: {
      name: { type: String, required: true },     // svg 图标名称
      size: { type: Number, default: 16 },        // 图标尺寸
      color: { type: String, default: "#000" }    // 图标颜色
    }
  }
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -4px;
  fill: currentColor;
  overflow: hidden;
}
</style>

