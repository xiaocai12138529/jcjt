<template>
    <div class="powerBox">
        <div class="tablebox">
            <el-table :data="powerlist" style="width: 100%" :border="false">
                <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
                <el-table-column prop="name" label="权限类型" align="center" width="300">
                    <template #header>
                        <div class="rowbox flexbox">
                            <span >权限类型</span>
                            <el-icon size="14" @click.stop="handleclick('addcd',{})"><plus /></el-icon>
                        </div>
                    </template>
                    <template #default="scope">
                        <div class="rowbox flexbox">
                            <span >{{ scope.row.name }}</span>
                            <el-icon size="14" @click.stop="handleclick('add',scope.row)"><plus /></el-icon>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="模块权限清单">
                    <template #default="scope">
                        <el-row :gutter="20" type="flex">
                            <el-col :span="8" v-for="item in scope.row.childrens" :key="item.ID">
                                <div class="flexbox" style="align-items: center;line-height: 30px;">
                                    <span style="margin-left:4px">{{ item.name }}</span>
                                    <el-popover placement="right" title=" " :width="80" trigger="hover">
                                        <template #reference>
                                            <el-icon size="14" style="margin-left:10px"><setting /></el-icon>
                                        </template>
                                        <div class="btnlist" style="color:#fff;">
                                            <div style="width:100%;color:#fff;height:30px;line-height: 30px;text-align: center;cursor: pointer;" @click.stop="childclick('edit',scope.row,item)">编辑</div>
                                            <div style="width:100%;margin-left: 0;color:red;height:30px;line-height: 30px;text-align: center;cursor: pointer;" @click.stop="childclick('del',scope.row,item)">删除</div>
                                        </div>
                                    </el-popover>
                                </div>
                                
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <AddDialog ref="AddDialogdom" @addsure="addsure" :editData="editData"></AddDialog>
        <el-dialog v-model="showTypeBox" title="权限类型管理" :close-on-click-modal="false" :show-close="true" :destroy-on-close="true" width="600">
            <TypeList @havechanged="getlist"></TypeList>
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
import { defineComponent, reactive, toRefs, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {GetTbQxListAll,Add_TbQx,Edit_TbQx,Del_TbQx} from "@/api/interface/basic-data"
import TypeList from "./type/type.vue"
import AddDialog from './add.vue'
export default defineComponent({
    name: 'POWER',
    components: {AddDialog ,TypeList},
    setup() {
        const AddDialogdom = ref(null)
        const data = reactive({
            showTypeBox:false,
            linename: "",
            powerlist: [],
            editData: {}
        })
        const formchange = (e) => {
            console.log(e)
        }
        const typechange = (e) => {
            console.log(e)
        }
        const handleclick = (type, row) => {
            console.log(row)
            if (type == 'addcd') {
                data.showTypeBox = true
            }else if (type == 'add') {
                data.editData = {typeID:row.id}
                AddDialogdom.value.dialogVisible = true
            }
        }
        const addsure=(formdata)=>{
            if (formdata.id) {
                Edit_TbQx({ ...formdata}).then(() => {
                    ElMessage.success("编辑成功");
                    AddDialogdom.value.dialogVisible = false;
                    getlist();
                });
            } else {
                Add_TbQx({ 
                    name:formdata.name,
                    key:formdata.key,
                    typeID:formdata.typeID,
                }).then(() => {
                    ElMessage.success("添加成功");
                    AddDialogdom.value.dialogVisible = false;
                    getlist()
                });
            }
        }
        const childclick = (type,row,item) => {
            console.log(row,item)
            if(type=="edit"){
                data.editData = {
                    ...item,
                    typeID:row.id
                }
                AddDialogdom.value.dialogVisible = true
            }else if(type=="del") {
                ElMessageBox.confirm("确认删除此条记录及其数据", "提示", {
                    type: "warning",
                    cancelButtonText: "取消",
                    confirmButtonText: "确认",
                })
                .then(() => {
                    Del_TbQx({id: item.id}).then(() => {
                        ElMessage.success("删除成功");
                        getlist()
                    });
                })
                .catch(() => {});
            }
        }
        const delsure = () => {
            ElMessage({
                type: "success",
                message: "删除成功",
                offset: 110
            })
        }
        const getlist=()=>{
            GetTbQxListAll().then((res)=>{
                console.log(res)
                if(res?.length){
                    data.powerlist=res
                }else{
                    data.powerlist=[]
                }
            })
        }
        getlist()
        return { formchange, typechange, handleclick, addsure, childclick, delsure, ...toRefs(data), AddDialogdom,getlist }
    }
})
</script>
<style lang="scss" scoped>
.powerBox {
    position: relative;
    width: 100%;
    height: calc(100% - 77px);
    color: #00ffff;
    z-index: 998;
    margin-top: 30px;
    .tablebox {
        padding: 0 40px;
        color: #39FBFD;
        .btnlist{
            color: #ffffff;
            font-size: 14px;
            div{
                line-height: 30px;
            }
        }
        .rowbox{
            align-items: center;
            justify-content: center;
            line-height: 30px;
            padding:0 10px;
            position: relative;
           i{
                cursor: pointer;
                color: #39FBFD;
                position: absolute;
                right: 10px;
           }
        }
        :deep(){
            .el-table{
                height: calc(100vh - 150px);
                
            }
            .el-table__header-wrapper th {
                padding-left: 10px !important;
                padding-right: 10px !important;
                border-top: solid 1px #197FC9 !important;
                border-right: solid 1px #197FC9 !important;
                border-bottom: solid 1px #197FC9 !important;
            }

            .el-table__header-wrapper th:nth-child(1) {
                border-left: solid 1px #197FC9 !important;
            }

            .el-table__body-wrapper td {
                padding-left: 10px !important;
                padding-right: 10px !important;
                border-right: solid 1px #197FC9 !important;
                border-bottom: solid 1px #197FC9 !important;
            }

            .el-table__body-wrapper td:nth-child(1) {
                border-left: solid 1px #197FC9 !important;
            }

            .el-checkbox {
                color: #39FBFD;
            }

            .is-checked .el-checkbox__inner {
                background: transparent !important;
            }

            .el-checkbox__input.is-checked+.el-checkbox__label {
                color: #39FBFD;
            }

            .el-checkbox-group {
                width: 100%;
            }
        }
        
    }
}
</style>
