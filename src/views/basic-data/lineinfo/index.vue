<template>
    <div class="contentbox">
        <div class="querybox flexbox">
            <div class="queryleft flexbox">
                <el-input placeholder="请输入关键字" clearable v-model="query.key" style="margin-left:10px" @clear="refreshdata">
                    <template #suffix><el-icon style="cursor: pointer;" @click.stop="refreshdata">
                            <Search />
                        </el-icon></template>
                </el-input>
            </div>
            <div class="queryright">
                <el-button type="primary" @click.stop="handleclick('add', {})">新增线路</el-button>
            </div>
        </div>
        <div class="tablebox">
            <PublickTable
                :height="tableheight"
                :tableData="tableData"
                :columObj="columObj"
                :pageobj="pageobj"
                @pagechange="pagechange"
                @handleedit="handleedit"
                @handledel="handledel"
            ></PublickTable>
        </div>
        <PublicDialog
            ref="AddDialogdom"
            @addsure="addsure"
            :editData="editData"
            :formItems="formItems"
        ></PublicDialog>
    </div>
</template>

<script>
import { defineComponent, toRefs, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PublickTable from "@/components/publictable/publictable.vue";
import {GetTbLineByPage,Del_TbLine,Add_TbLine,Edit_TbLine} from "@/api/interface/basic-data"
import PublicDialog from "@/components/publicmodel/publickmodel.vue";
import {columData,formItems} from "./options"
export default defineComponent({
    name: 'LineInfo',
    components: { PublickTable, PublicDialog },
    setup() {
        const AddDialogdom = ref(null)
        const data = reactive({
            tableheight:"calc(100vh - 252px)",
            query: {
                key: "",
                DW: null
            },
            pageobj: {
                page: 1,
                pagesize: 50,
                total: 0,
            },
            columObj: {
                loading: true,
                showselection: false,
                showindex: true,
                showaction: true,
                columData: columData
            },
            formItems: formItems,
            tableData: [],
            editData: {}
        })
        const pagechange = (page) => {
            data.pageobj.page = page;
            getdata();
        };
        const handleedit = (row) => {
            data.editData = { ...row };
            AddDialogdom.value.dialogVisible = true;
        };
        const handledel = (row) => {
            ElMessageBox.confirm("确认删除此条记录及其数据", "提示", {
                type: "warning",
                cancelButtonText: "取消",
                confirmButtonText: "确认",
            })
            .then(() => {
                Del_TbLine({ids: row.id}).then(() => {
                    ElMessage.success("删除成功");
                    refreshdata()
                });
            })
            .catch(() => {});
        };
        const refreshdata=()=>{
            data.pageobj.page = 1;
            data.pageobj.total = 0;
            getdata();
        }
        const addsure = (formdata) => {
            if (formdata.id) {
                Edit_TbLine({ ...formdata })
                .then(() => {
                    ElMessage.success("编辑成功");
                    AddDialogdom.value.dialogVisible = false;
                    getdata();
                });
            } else {
                Add_TbLine({ ...formdata }).then(() => {
                    ElMessage.success("添加成功");
                    AddDialogdom.value.dialogVisible = false;
                    refreshdata()
                });
            }
        };
        const handleclick = (type, row) => {
            console.log(row)
            if (type == 'add') {
                data.editData = {}
                AddDialogdom.value.dialogVisible = true
            }
        }
        const getdata = () => {
            data.tableData = [];
            data.columObj.loading = true;
            GetTbLineByPage({
                key: data.key,
                pageindex: data.pageobj.page,
                pagesize: data.pageobj.pagesize,
            })
            .then((res) => {
                if (res.pageList && res.pageList.length) {
                    data.tableData = res.pageList;
                    data.pageobj.total = res.allCounts;
                }else{
                    data.pageobj.total = 0;
                    data.tableData = []
                } 
            
                data.columObj.loading = false;
            })
            .catch(() => {
                data.columObj.loading = false;
            });
        };
        getdata();
        return { ...toRefs(data), pagechange,handleedit, handledel,refreshdata, AddDialogdom, addsure, handleclick }
    }
})
</script>
<style lang="scss" scoped>
.contentbox {
    width: calc(100% - 40px);
    height: calc(100% - 60px);
    margin: 0 auto;
    margin-top: 10px;
    box-shadow: 0px 10px 30px 14px rgba(1, 11, 51, 100);

    .querybox {
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding-top: 14px;

        .queryleft {
            align-items: center;
            margin-left: 20px;
        }

        .queryright {
            align-items: center;
            margin-right: 20px;
        }
    }
    .tablebox{
        padding:0 14px;
        margin-top: 16px;
    }

}
</style>
