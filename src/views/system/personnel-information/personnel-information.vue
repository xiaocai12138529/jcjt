<template>
  <div>
    <div class="tootip">
      <a-space :size="12">
        <a-range-picker />
        <a-input-search
          placeholder="请输入项目名称/负责人的关键字"
          style="width: 300px"
        />
        <a-button type="primary">查询</a-button>
      </a-space>
      <a-button type="primary" class="fr">增加</a-button>
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
  name: 'personnel-information',
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
