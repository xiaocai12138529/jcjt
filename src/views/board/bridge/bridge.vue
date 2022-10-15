<template>
  <div>
    <div class="tootip">
      <a-space :size="12">
        <a-select ref="select" style="width: 450px" placeholder="请选择铁路">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-select ref="select" style="width: 256px" placeholder="请选择">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-button type="primary">类型设置</a-button>
        <a-range-picker />
        <a-input-search placeholder="关键字" style="width: 200px" />
        <a-button type="primary">查询</a-button>
      </a-space>
    </div>
    <div class="context mt10">
      <a-table
        :columns="columns"
        :data-source="data"
        :row-class-name="
          (_record:any, index:any) => (index % 2 === 1 ? 'table-striped' : null)
        "
      ></a-table>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { data as datax, columns } from '@/utils/ls-data'
export default defineComponent({
  name: 'BRIDGE',
  setup() {
    const data = computed(() => {
      const da = JSON.parse(JSON.stringify(datax))
      for (let i = 0; i < 20; i++) {
        da.push({
          name: '第一工程独立坐标系统CPI成果',
          zbxt: '北京54坐标系',
          zyzwx: '180。30，00',
          tymddg: '150',
          gcyc: '80',
          cldw: '中国铁设测绘院',
          zyfzr: '张三',
          zysj: new Date().toLocaleDateString(),
          zylc: 'k23-k56',
        })
      }
      return da
    })
    return { data, columns }
  },
})
</script>
<style scoped lang="scss">
.tootip {
  color: #fff;
  width: 100%;
  height: 100px;
  border: 1px solid #217186;
  border-radius: 8px;
  padding: 36px 24px;
}
.context {
  color: #fff;
  width: 100%;
  height: calc(100vh - 270px);
  border: 1px solid #217186;
  border-radius: 8px;
  padding: 18px;
}
:deep(.table-striped) td {
  background-color: rgba(0, 123, 211, 0.33);
}
</style>
