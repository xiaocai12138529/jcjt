<template>
    <div class="departmentBox flexbox">
        <div class="boxleft">
            <DWSelect :btnname="'部门'" @selectsure="selectsure"></DWSelect>
        </div>
        <div class="boxcenter flexbox">
            <el-icon><caret-right /></el-icon>
        </div>
        <div class="boxright">
            <div class="righttop flexbox">
                <el-icon>
                    <Fold />
                </el-icon>
                <div class="gjfw">部门列表<span>{{ linename }}</span></div>
            </div>
            <div class="querybox flexbox">
                <div class="queryboxright flexbox">
                    <el-input class="inputitem" clearable placeholder="关键字" v-model="key" @clear="search">
                        <template #suffix><el-icon style="cursor: pointer;" @click.stop="search">
                                <Search />
                            </el-icon></template>
                    </el-input>
                    <el-button type="primary" @click.stop="handleclick('add')">新增部门</el-button>
                </div>
            </div>
            <TableBox :tableData="tableData" @editBM="editBM" @delBM="delBM" @addchild="addchild"></TableBox>
        </div>
        <AddDialog ref="AddDialogdom" :LXlist="LXlist" :title="addtitle" @addsure="addsure" :editData="editData"></AddDialog>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import DWSelect from './select.vue'
import AddDialog from './add.vue'
import TableBox from "./table.vue"
import {GetTbDepartChild,Add_TbDepartment,Edit_TbDepartment,Del_TbDepartment} from "@/api/interface/basic-data"
export default defineComponent({
    name: 'DEPART',
    components: { DWSelect, AddDialog, TableBox },
    setup() {
        const AddDialogdom = ref(null)
        const bachupload = ref(null)
        const data = reactive({
            addchildid:null,
            addtitle:"",
            activeDWtypeid:null,
            linename: "",
            key: "",
            tableData: [],
            LXlist:[],
            editData: {}
        })
        const handleclick = (type) => {
            if (type == 'add') {
                data.addchildid=null
                data.editData = {}
                data.addtitle="新增部门"
                AddDialogdom.value.dialogVisible = true
            }
        }
        const addsure=(formdata)=>{
            if(data.addchildid){
                Add_TbDepartment({ ...formdata,parentId:data.addchildid,dwId:data.activeDWtypeid}).then(() => {
                    ElMessage.success("添加成功");
                    AddDialogdom.value.dialogVisible = false;
                    search()
                });
            }else{
                if (formdata.id) {
                    Edit_TbDepartment({ ...formdata,dwId:data.activeDWtypeid}).then(() => {
                        ElMessage.success("编辑成功");
                        AddDialogdom.value.dialogVisible = false;
                        search();
                    });
                } else {
                    Add_TbDepartment({ ...formdata,parentId:0,dwId:data.activeDWtypeid}).then(() => {
                        ElMessage.success("添加成功");
                        AddDialogdom.value.dialogVisible = false;
                        search()
                    });
                }
            }
        }
        const selectsure = (e) => {
            data.activeDWtypeid=e.id
            data.linename = "（" + e.name + "）"
            getTreeList()
        }

        const editBM = (e) => {
            data.addchildid=null
            data.editData = e
            data.addtitle="编辑部门"
            AddDialogdom.value.dialogVisible = true
        }
        const delBM = (row) => {
            ElMessageBox.confirm("确认删除此条记录及其数据", "提示", {
                type: "warning",
                cancelButtonText: "取消",
                confirmButtonText: "确认",
            })
            .then(() => {
                Del_TbDepartment({ids: row.id}).then(() => {
                    ElMessage.success("删除成功");
                    search()
                });
            })
        }
        const addchild=(row)=>{
            data.addchildid=row.id
            data.editData = {}
            data.addtitle="添加部门"
            AddDialogdom.value.dialogVisible = true
        }
        const search = () => {
            getTreeList()
        }
        const getTreeList=()=>{
            GetTbDepartChild({dwid:data.activeDWtypeid,key:data.key}).then((res)=>{
                if(res?.pageList?.length){
                    data.tableData=res.pageList
                }else{
                    data.tableData=[]
                }
            })
        }
       
        return { ...toRefs(data),handleclick, addsure, editBM, delBM, AddDialogdom, bachupload, selectsure, search,addchild}
    }
})
</script>
<style lang="scss" scoped>
.departmentBox {
    position: relative;
    width: 100%;
    height: calc(100% - 77px);
    color: #00ffff;
    z-index: 998;
    margin-top: 30px;

    .boxleft {
        margin-left: 15px;
        width: 320px;
        height: 100%;
        border-radius: 0px 20px 20px 0px;
        box-shadow: 21px -30px 38px 5px rgba(1, 11, 51, 100);
    }

    .boxcenter {
        width: 70px;
        align-items: center;
        justify-content: center;

        i {
            font-size: 60px;
            color: rgba(255, 255, 255, 0.36);
        }
    }

    .boxright {
        width: calc(100vw - 425px);
        margin-right: 20px;
        height: 100%;
        border-radius: 16px;
        font-size: 14px;
        box-shadow: 0px 10px 30px 14px rgba(1, 11, 51, 100);

        .righttop {
            align-items: center;
            height: 50px;
            padding: 0px 20px;
            font-size: 18px;

            .gjfw {
                margin-left: 10px;

                span {
                    color: #FCCA00;
                }
            }
        }

        .querybox {
            width: 100%;
            align-items: center;
            justify-content: space-between;
            padding-left: 20px;
            padding-bottom: 20px;

            .queryboxleft {
                align-items: center;
               :deep() .inputitem{
                    width: 280px;
                }
                button {
                    margin-left: 10px;
                }
            }

            .queryboxright {
                align-items: center;
                :deep().inputitem{
                    width: 280px;
                }
                button {
                    margin-left: 10px;
                }
            }

        }
    }
}</style>
