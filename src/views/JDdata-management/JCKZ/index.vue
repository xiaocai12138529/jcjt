<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="JCKZ" class="flexbox">
    <div class="boxrightbot">
      <div class="tabbox flexbox">
        <FormTab :activetab="activetab" :tablist="tablist" @formchange="formchange"></FormTab>
        <!-- 计划控制搜索 -->
        <SearchDwXlJh @planIdChange="planIdChange" v-if="activetab !== '坐标系统'" />
      </div>

      <!-- 主体展示表格 -->
      <COORDINATE v-if="activetab == '坐标系统'" />
      <BASEBOX v-else :activetab="activetab" :showleftType="showleftType" :planId="planId"></BASEBOX>
    </div>
  </div>
</template>

<script>
import FormTab from '@/components/component/formtab'
import SearchDwXlJh from '../components/searchDwXlJh'
import BASEBOX from './base.vue'
import COORDINATE from './coordinate/coordinate.vue'
import { reactive, toRefs } from 'vue-demi'
import { accountoptions } from './option'
export default {
  name: 'JCKZ',
  components: { FormTab, BASEBOX, SearchDwXlJh, COORDINATE },
  setup() {
    const data = reactive({
      tablist: accountoptions,
      activetab: accountoptions[0].name,
      planId: null,
    })

    const formchange = (row) => {
      data.activetab = row.name
    }

    // 计划id
    const planIdChange = (val) => {
      console.log(val)
      data.planId = val
    }
    return { ...toRefs(data), formchange, planIdChange }
  },
}
</script>

<style lang="scss" scoped>
#JCKZ {
  position: relative;
  width: 100%;
  height: calc(100% - 7px);
  color: #00ffff;
  z-index: 998;
  padding-top: 50px;

  .boxrightbot {
    width: 100%;
    height: calc(100vh - 120px);
    line-height: 20px;
    border-radius: 16px;
    color: rgba(90, 187, 243, 1);
    font-size: 14px;
    box-shadow: 0px 10px 30px 14px rgba(1, 11, 51, 100);

    .tabbox {
      padding-top: 14px;
      padding-left: 22px;
      justify-content: space-between;
      align-items: center;

      .lrbtn {
        margin-right: 20px;
        button {
          background: #1890ff;
          border: none;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
