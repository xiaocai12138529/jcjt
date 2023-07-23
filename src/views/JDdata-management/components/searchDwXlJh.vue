<template>
  <div class="flexbox">
    <div style="margin-right: 10px">
      <el-cascader :props="propsSelect" placeholder="请选择单位/部门" style="width: 180px" @change="cascaderDW" clearable></el-cascader>
    </div>
    <div>
      <el-select v-model="LineId" placeholder="所属线路" clearable style="margin-right: 10px; width: 180px" @change="getPlanList">
        <el-option v-for="item in XLlist" :key="item.id" :label="item.name" :value="item.id">{{ item.name }} </el-option>
      </el-select>
    </div>
    <div>
      <el-select v-model="planId" placeholder="选择计划" clearable style="margin-right: 10px; width: 180px" @change="planChange" placement="bottom-end">
        <el-option v-for="item in planOption" :key="item.id" :label="item.name" :value="item.id">{{ item.name }} </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { GetListByLine, GetTbDepartChild, GetTbDwByPage, GetTbLineByPage } from '@/api/interface/basic-data'
import { computed, defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'searchDwXlJh',
  emits: ['search', 'planIdChange'],
  props: {
    search: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const data = reactive({
      XLlist: [],
      planOption: [],
      DWName: null, // 单位名称
      DepName: null, // 部门名称
      planId: null, // 计划id
      LineId: null, // 线路id
    })

    const searchList = computed({
      get: () => props.search,
      set: (val) => emit('search', val),
    })

    const planChange = () => {
      emit('planIdChange', data.planId ? data.planId : null)
    }

    // 获取线路类型
    const getXLList = () => {
      GetTbLineByPage({
        key: null,
        pageindex: 1,
        pagesize: 999,
        DWName: data.DWName,
        DepName: data.DepName,
      }).then((res) => {
        if (res?.pageList.length) {
          data.XLlist = res?.pageList
        }
      })
    }
    getXLList()

    const getPlanList = () => {
      GetListByLine({ LineId: data.LineId }).then((res) => {
        if (res?.length) {
          data.planOption = res
        }
      })
    }
    getPlanList()
    //动态获取部门数据
    const propsSelect = {
      lazy: true,
      checkStrictly: true,
      lazyLoad(node, resolve) {
        const { level, data } = node
        // 一级为单位
        if (level == 0) {
          const nodes = []
          GetTbDwByPage().then((res) => {
            data.DWlist = res.pageList
            res.pageList.map((item) => {
              nodes.push({
                value: item.id + '-' + item.name,
                label: item.name,
                leaf: false,
              })
            })
            resolve(nodes)
          })
        } else if (level == 1) {
          // 二级处理部门
          GetTbDepartChild({ dwid: node.value.split('-')[0] }).then((res) => {
            const nodes = []
            res?.pageList.map((item) => {
              nodes.push({
                value: item.id + '-' + item.name,
                label: item.name,
                leaf: !item?.childrens.length,
                childrens: item?.childrens,
              })
            })

            resolve(nodes)
          })
        } else {
          // N级处理后面的部门
          const nodes = []
          data.childrens.map((item) => {
            nodes.push({
              value: item.id + '-' + item.name,
              label: item.name,
              leaf: !item?.childrens.length,
              childrens: item?.childrens,
            })
          })

          resolve(nodes)
        }
      },
    }

    const cascaderDW = (casVal) => {
      console.log(casVal)
      if (casVal?.length == 1) {
        data.DWName = casVal[0].split('-')[1]
        data.DepName = null
      } else if (casVal?.length > 1) {
        data.DWName = casVal[0].split('-')[1]
        data.DepName = casVal[casVal.length - 1].split('-')[1]
      } else {
        data.DWName = null
        data.DepName = null
      }
      getXLList()
    }

    return {
      propsSelect,
      cascaderDW,
      searchList,
      ...toRefs(data),
      getPlanList,
      planChange,
    }
  },
})
</script>
<style scoped lang="scss"></style>
