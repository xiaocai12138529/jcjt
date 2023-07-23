<template>
    <div class="userBox flexbox">
        <div class="boxleft">
            <DWSelect :btnname="'人员'" @selectsure="selectsure"></DWSelect>
        </div>
        <div class="boxcenter flexbox">
            <el-icon><caret-right /></el-icon>
        </div>
        <div class="boxright">
            <div class="righttop flexbox">
                <el-icon>
                    <Fold />
                </el-icon>
                <div class="gjfw">用户列表<span>{{ linename }}</span></div>
            </div>
            <div class="querybox flexbox">
                <el-input placeholder="关键字" clearable v-model="key" style="width: 250px;" @clear="refreshdata">
                    <template #suffix><el-icon style="cursor: pointer;" @click.stop="refreshdata">
                            <Search />
                        </el-icon></template>
                </el-input>
                <el-select v-model="peopletype" @change="refreshdata" style="width: 250px;margin-left: 10px;" >
                    <el-option label="全部可用人员" value="1">全部可用人员</el-option>
                    <el-option label="已删除人员" value="0">已删除人员</el-option>
                </el-select>
                <el-button type="primary" @click.stop="handleclick('add', {})" :disabled="!departmentid">新增用户</el-button>
                <el-button type="primary" style="background: #ED7276;" @click.stop="handleclick('pldel', {})">批量删除</el-button>
                <el-button type="primary" v-if="peopletype=='0'" style="background: #fdf5e9;color: #e29836;" @click.stop="handleclick('resume', {})">恢复已删除人员</el-button>
            </div>
            <div class="tablebox">
                <PublickTable
                    :height="tableheight"
                    :tableData="tableData"
                    :columObj="columObj"
                    :pageobj="pageobj"
                    @selectionChange="selectionChange"
                    @pagechange="pagechange"
                    @handleedit="handleedit"
                    @handledel="handledel"
                ></PublickTable>
            </div>
        </div>
        <AddDialog ref="AddDialogdom" @addsure="addsure" :editData="editData"></AddDialog>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import DWSelect from './menu.vue'
import AddDialog from './add.vue'
import PublickTable from "@/components/publictable/publictable.vue";
import {GetTbPeopleByPage,Add_TbPeople,Edit_TbPeople,Del_TbPeople,drop_TbPeople,RecoverPeopleByIds} from "@/api/interface/basic-data"
export default defineComponent({
    name: 'USER',
    components: { DWSelect, AddDialog, PublickTable },
    setup() {
        const AddDialogdom = ref(null)
        const bachupload = ref(null)
        const data = reactive({
            peopletype:"1",
            tableheight:"calc(100vh - 300px)",
            pageobj: {
                page: 1,
                pagesize: 50,
                total: 0,
            },
            columObj: {
                loading: true,
                showselection: true,
                showindex: true,
                showaction: true,
                columData: [
                    {prop:"realName",label:"姓名",align:"center"},
                    {prop:"userName",label:"用户",align:"center"},
                    {prop:"telphone",label:"电话",align:"center"},
                    {prop:"email",label:"邮箱"},
                    {prop:"sex",label:"性别",align:"center"},
                    {prop:"jsNames",label:"角色"},
                    {prop:"departmentName",label:"部门名称"},
                    {prop:"duty",label:"职责"},
                ]
            },
            departmentid:0,
            dwid:0,
            linename: "",
            key:"",
            tableData: [],
            editData: {},
            selectids:[]
        })
        const pagechange = (page) => {
            data.pageobj.page = page;
            getdata();
        };
        const handleclick = (type, row) => {
            console.log(row)
            if (type == 'add') {
                data.editData = {}
                AddDialogdom.value.dialogVisible = true
            }else if (type == 'pldel'){
                if(!data.selectids.length){
                  return ElMessage.error("至少选择一条数据");
                }
                let ids = data.selectids.join(",");
                if(data.peopletype=="1"){
                    Del_TbPeople({ids:ids}).then(()=>{
                        ElMessage.success("删除成功");
                        refreshdata();
                    })
                }else{
                    drop_TbPeople({ids:ids}).then(()=>{
                        ElMessage.success("删除成功");
                        refreshdata();
                    })
                }
            }else if(type=="resume"){
                if(!data.selectids.length){
                  return ElMessage.error("至少选择一条数据");
                }
                let ids = data.selectids.join(",");
                console.log(ids)
                RecoverPeopleByIds({ids:ids}).then(()=>{
                    ElMessage.success("恢复成功");
                    refreshdata();
                })
            }
        }
        const selectionChange = (selections) => {
            data.selectids = [];
            selections.map((item) => {
                data.selectids.push(item.id);
            });
        };
        const addsure = (formdata) => {
            console.log(formdata)
            if (formdata.id) {
                let rolelist=[]
                let JsNames=[]
                formdata.resultlist?.map((item)=>{
                    rolelist.push({
                        id:item.oldid?item.oldid:0,
                        jsbName:item.name,
                        jsbId:item.id,
                        peopleId:formdata.id
                    })
                    JsNames.push(item.name)
                })
                

                Edit_TbPeople({ 
                    ...formdata,
                    tb_PeopleJsbDtos:rolelist,
                    JsNames:JsNames.join(","),
                    departmentId:data.departmentid,
                    departmentName:data.linename
                })
                .then(() => {
                    ElMessage.success("编辑成功");
                    AddDialogdom.value.dialogVisible = false;
                    getdata();
                });
            } else {
                let rolelist=[]
                let JsNames=[]
                formdata.resultlist?.map((item)=>{
                    rolelist.push({
                        id:0,
                        peopleId:formdata.id,
                        jsbName:item.name,
                        jsbId:item.id
                    })
                    JsNames.push(item.name)
                })
                Add_TbPeople({ 
                    ...formdata ,
                    isValid:1,
                    tb_PeopleJsbDtos:rolelist,
                    JsNames:JsNames.join(","),
                    departmentId:data.departmentid,
                    departmentName:data.linename
                }).then(() => {
                    ElMessage.success("添加成功");
                    AddDialogdom.value.dialogVisible = false;
                    refreshdata()
                });
            }
        };
        const selectsure = (e) => {
            console.log(e)
            data.linename = "（" + e.name + "）"
            if(e.level==1){
                data.dwid=e.id
                data.departmentid=0
            }else{
                data.dwid=0
                data.departmentid=e.id
            }
            refreshdata()
        }
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
                if(data.peopletype=="1"){
                    Del_TbPeople({ids:row.id}).then(()=>{
                        ElMessage.success("删除成功");
                        refreshdata();
                    })
                }else{
                    drop_TbPeople({ids:row.id}).then(()=>{
                        ElMessage.success("删除成功");
                        refreshdata();
                    })
                }
            })
            .catch(() => {});
        };
        const refreshdata = () => {
            data.pageobj.page = 1;
            data.pageobj.total = 0;
            getdata();
        }
        const getdata = () => {
            data.tableData = [];
            data.columObj.loading = true;
            GetTbPeopleByPage({
                key: data.key?data.key:null,
                dwid:data.dwid?data.dwid:0,
                departmentid:data.departmentid?data.departmentid:0,
                isvalid:data.peopletype,
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
        
        return { pagechange, handleclick, addsure, handleedit, handledel, ...toRefs(data), AddDialogdom, bachupload, selectsure, refreshdata,selectionChange}
    }
})
</script>
<style lang="scss" scoped>
.userBox {
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
            padding: 0px 20px;
            height: 50px;
            font-size: 18px;

            .gjfw {
                margin-left: 10px;

                span {
                    color: #FCCA00;
                }
            }
        }
        .querybox{
            align-items: center;
            padding-left: 20px;
            padding-bottom: 14px;
            button{
                margin-left: 10px;
            }
        }
        .tablebox{
            padding:0 20px;
        }
    }
}
</style>
