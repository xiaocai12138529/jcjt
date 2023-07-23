<template>
    <div class="cbstaticbox" >
        <el-table :data="tableData" style="width:calc(100% - 2px)" v-loading="isloading" border>
            <el-table-column prop="speedLv" label="速度等级（km/h）" align="center"></el-table-column>
            <el-table-column prop="count" label="区段总数" align="center"></el-table-column>
            <el-table-column label="超标区段数" align="center">
                <el-table-column prop="getWordCount" label="作业验收" align="center"></el-table-column>
                <el-table-column prop="maintenanceAlertCount" label="维修警戒" align="center"></el-table-column>
                <el-table-column prop="limitMan" label="限值管理" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="超标区段占比" align="center">
                <el-table-column prop="getWordRatio" label="作业验收" align="center">
                    <template #default="scope"><span>{{ scope.row.getWordRatio*100+"%" }}</span></template>
                </el-table-column>
                <el-table-column prop="maintenanceAlertRatio" label="维修警戒" align="center">
                    <template #default="scope"><span>{{ scope.row.maintenanceAlertRatio*100+"%" }}</span></template>
                </el-table-column>
                <el-table-column prop="limitManRatio" label="限值管理" align="center">
                    <template #default="scope"><span>{{ scope.row.limitManRatio*100+"%" }}</span></template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import {GetList_CBQDSTATIC} from "@/api/interface/section-optimization";
export default defineComponent({
    name: "CBSTATIC",
    props: {
        DataGroupId: {
            default: null,
        },
        activetab: {
            default: "",
        },
        projectid: {
            default: null,
        },
        showleftType: {
            default: 1
        }
    },
    setup(props) {
        const data = reactive({
            tableData: [],
            isloading: false,
        });

        const getdata = () => {
            data.isloading = true;
            let urls = ""
            if (props.activetab == "静态TQI超标区段统计") {
                urls = "/Api/JcjdMan/XzjlTQICompare/Statistic_StaticManLimit"
            } else if (props.activetab == "动态TQI超标区段统计") {
                urls = "/Api/JcjdMan/XzjlTQICompare/Statistic_DynamicManLimit"
            }
            GetList_CBQDSTATIC(urls, {
                DataPeridId: props.DataGroupId ? props.DataGroupId : null,
            }).then((res) => {
                console.log(res)
                if(res?.length){
                    data.tableData=res
                }else{
                    data.tableData=[]
                }
                 
                data.isloading = false
            })
        };
      
        onMounted(() => {
            getdata();
            watch(
                () => props.DataGroupId,
                () => {
                    getdata()
                }
            );
        })
        return {
            ...toRefs(data)
        };
    },
});
</script>
<style lang="scss" scoped>
.cbstaticbox {
    width: 100%;
}
:deep(){
    .el-table--border .el-table__inner-wrapper::after, .el-table--border::after, .el-table--border::before, .el-table__inner-wrapper::before{
        border: none;
        background: none;
    }
    .el-table__border-left-patch{
        border: none;
        background: none;
    }
    .is-group th{
        border-right: solid 1px  rgba(33, 84, 118, 0.65) !important;
        border-top: solid 1px  rgba(33, 84, 118, 0.65) !important;
    }
    .el-table__header-wrapper{
        border-bottom: solid 1px  rgba(33, 84, 118, 0.65) !important;
        border-right: solid 1px  rgba(33, 84, 118, 0.65) !important;
    }
    .el-table__header-wrapper{
        background: transparent !important;
    }
    td{
        border-right: solid 1px  rgba(33, 84, 118, 0.65) !important;
        border-bottom: solid 1px  rgba(33, 84, 118, 0.65) !important;
    }
}
</style>
