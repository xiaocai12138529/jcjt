<template>
    <div class="contentbox">
        <div class="querybox flexbox">
            <div class="queryleft flexbox">
                <el-select v-model="dwtypeid" clearable placeholder="请选择单位类型" @change="refreshdata">
                    <el-option v-for="item in LXlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-input placeholder="请输入关键字" clearable v-model="key" style="margin-left:10px" @clear="refreshdata">
                    <template #suffix><el-icon style="cursor: pointer;" @click.stop="refreshdata">
                            <Search />
                        </el-icon></template>
                </el-input>
            </div>
            <div class="queryright">
                <el-button type="primary" @click.stop="handleclick('add', {})">新增单位</el-button>
                <el-button type="primary" @click.stop="handleclick('showtype', {})">单位类型管理</el-button>
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
        <AddDialog ref="AddDialogdom" :LXlist="LXlist" :title="addtitle" :editData="editData" @addsure="addsure"></AddDialog>
        <el-dialog v-model="showTypeBox" title="单位类型管理" :close-on-click-modal="false" :show-close="true" :destroy-on-close="true" width="600">
            <TypeList></TypeList>
            <template #footer>
                <span class="dialog-footer">
                    <el-button style="background:#E2E2E2;color:#000000" @click="showTypeBox=false">取 消</el-button>
                    <el-button style="background:#1890FF;color:#ffffff" @click="showTypeBox=false">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, toRefs, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PublickTable from "@/components/publictable/publictable.vue";
import {GetTbDwTypeByPage,GetTbDwByPage,Add_TbDw,Edit_TbDw,Del_TbDw} from "@/api/interface/basic-data"
import {columData} from "./options"
import AddDialog from './add.vue'
import TypeList from "./type/type.vue"
export default defineComponent({
    name: 'UNIT',
    components: { PublickTable,AddDialog,TypeList},
    setup() {
        const AddDialogdom = ref(null)
        const data = reactive({
            tableheight:"calc(100vh - 250px)",
            showTypeBox:false,
            addtitle:"",
            dwtypeid:null,
            key: "",
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
            tableData: [],
            LXlist:[],
            editData: {}
        })
        const pagechange = (page) => {
            data.pageobj.page = page;
            getdwlist();
        };
        const handleedit = (row) => {
            data.editData = { ...row };
            data.addtitle="编辑单位"
            AddDialogdom.value.dialogVisible = true;
        };
        const handledel = (row) => {
            ElMessageBox.confirm("确认删除此条记录及其数据", "提示", {
                type: "warning",
                cancelButtonText: "取消",
                confirmButtonText: "确认",
            })
            .then(() => {
                Del_TbDw({ids: row.id}).then(() => {
                    ElMessage.success("删除成功");
                    refreshdata()
                });
            })
            .catch(() => {});
        };
        const refreshdata=()=>{
            data.pageobj.page = 1;
            data.pageobj.total = 0;
            getdwlist();
        }
        const addsure=(formdata)=>{
            if (formdata.id) {
                Edit_TbDw({ ...formdata}).then(() => {
                    ElMessage.success("编辑成功");
                    AddDialogdom.value.dialogVisible = false;
                    refreshdata();
                });
            } else {
                Add_TbDw({ ...formdata,parentId:0}).then(() => {
                    ElMessage.success("添加成功");
                    AddDialogdom.value.dialogVisible = false;
                    refreshdata()
                });
            }
        }
        const handleclick = (type, row) => {
            console.log(row)
            if (type == 'add') {
                data.editData = {}
                data.addtitle="添加单位"
                AddDialogdom.value.dialogVisible = true
            }else if(type=="showtype"){
                data.showTypeBox=true
            }
        }
        const gettype=()=>{
            GetTbDwTypeByPage({pageindex:1,pagesize:1000}).then((res)=>{
                if(res?.pageList?.length){
                    data.LXlist=res.pageList
                }else{
                    data.LXlist=[]
                }
            })
        }
        const getdwlist=()=>{
            data.tableData=[]
            data.pageobj.total=0
            GetTbDwByPage({pageindex:data.pageobj.page,pagesize:data.pageobj.pagesize,key:data.key,dwtypeid:data.dwtypeid?data.dwtypeid:null}).then((res)=>{
                if(res?.pageList?.length){
                    data.tableData=res.pageList
                }
                data.pageobj.total=res.allCounts?res.allCounts:0
                data.columObj.loading=false
            })
        }
        getdwlist()
        gettype()
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
        padding:0 20px;
        margin-top: 14px;
    }

}
</style>
