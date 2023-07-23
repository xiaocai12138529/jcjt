<template>
    <div class="basebox">
        <div class="toptabs flexbox">
            <div class="lefttab flexbox">
                <FormTab ref="tab" :activetab="activetab" :tablist="tablist" @formchange="formchange"></FormTab>
            </div>
            <div class="righttab flexbox">
                <FormTab ref="tab1" :activetab="activetab" :tablist="tablist1" @formchange="formchange1"></FormTab>
            </div>
        </div>
        <LineInfo v-if="activetab == '线路信息'"></LineInfo>
        <UNIT v-if="activetab == '单位管理'"></UNIT>
        <DEPART v-if="activetab == '部门管理'"></DEPART>
        <USER v-if="activetab == '用户管理'"></USER>
        <ROLE v-if="activetab == '角色管理'"></ROLE>
        <POWER v-if="activetab == '权限管理'"></POWER>
        <DailyRecord v-if="activetab == '日志管理'"></DailyRecord>
    </div>
</template>

<script>
import { defineComponent, toRefs, reactive, ref } from "vue";
import FormTab from '@/components/component/formtab';
import LineInfo from './lineinfo/index.vue';
import DailyRecord from "./dailyRecord/dailyRecord.vue";
import USER from "./user/index.vue";
import ROLE from "./role/index.vue";
import POWER from "./power/index.vue"
import UNIT from "./unit/unit.vue"
import DEPART from "./department/department.vue"
export default defineComponent({
    name: 'base-data',
    components: { FormTab, LineInfo, DailyRecord, USER, ROLE ,POWER,UNIT,DEPART},
    setup() {
        const tab = ref(null)
        const tab1 = ref(null)
        const data = reactive({
            activetab: "线路信息",
            tablist: [{ name: "线路信息", id: 1 } ,{ name: "单位管理", id: 2 }, { name: "部门管理", id: 3 }],
            tablist1: [{ name: "用户管理", id: 7 }, { name: "角色管理", id: 8}, { name: "权限管理", id: 9 }, { name: "日志管理", id: 10 }],
        })
        const formchange = (row) => {
            data.activetab = row.name
        }
        const formchange1 = (row) => {
            data.activetab = row.name
        }
        return { ...toRefs(data), formchange, formchange1, tab, tab1 }
    }
})
</script>
<style lang="scss" scoped>
.basebox {
    position: relative;
    width: 100%;
    height: calc(100% - 7px);
    color: #00ffff;
    z-index: 998;

    .toptabs {
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        .lefttab {
            align-items: center;
            margin-left: 40px;
        }

        .righttab {
            align-items: center;
            justify-content: flex-end;
            margin-right: 20px;
        }
    }


}
</style>
