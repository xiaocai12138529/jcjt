<template>
    <div class="typelistbox">
      <div class="querybox flexbox">
        <el-input placeholder="关键字" clearable v-model="key" @clear="refreshdata" style="width: 50%;">
          <template #suffix><el-icon style="cursor: pointer;" @click.stop="refreshdata">
              <Search />
            </el-icon></template>
        </el-input>
        <el-button type="primary" class="adddw" @click.stop="handleclick('add', {})">新增角色类型</el-button>
      </div>
      <div class="xllistbox">
        <el-table :data="selectData" style="width: 100%" :border="false" row-key="id"
          :tree-props="{ children: 'children' }">
          <el-table-column label="序号" type="index" :index="indexMethod" width="60" align="center"></el-table-column>
          <el-table-column label="类型名称" prop="name"></el-table-column>
          <el-table-column prop="action" label="操作" align="center" width="110">
            <template #default="scope">
              <el-icon @click.stop="handleclick('edit', scope.row)">
                <Edit />
              </el-icon>
              <el-icon class="delbtn" @click.stop="handleclick('del', scope.row)">
                <Delete />
              </el-icon>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationbox flexbox">
        <el-pagination background layout="prev, pager, next" :current-page="currentpageXL" :page-size="pagesizeXL"
          :total="totalXL" @current-change="currentchangeXL">
        </el-pagination>
      </div>
      <AddDialog ref="AddDialogdom" :LXlist="LXlist" :title="addtitle" :editData="editData" @addsure="addsure"></AddDialog>
    </div>
  </template>
  <script>
  import { defineComponent, reactive, toRefs, ref } from "vue";
  import {GetTbJsTypeListAll,Add_TbJsType,Edit_TbJsType,Del_TbJsType} from "@/api/interface/basic-data"
  import { ElMessage, ElMessageBox } from "element-plus";
  import AddDialog from './add.vue'
  export default defineComponent({
    name: "TypeList",
    emits: ["selectsure"],
    components:{AddDialog},
    props: {
      btnname: {
        type: String,
        default: "",
      }
    },
    setup(props, { emit }) {
      const activeline = ref(null)
      const AddDialogdom= ref(null)
      const indexMethod=(index) => {
          return Number(data.currentpageXL - 1) * data.pagesizeXL + index + 1;
      }
      const data = reactive({
        key: "",
        addtitle:"",
        LXlist: [],
        selectData: [],
        pagesizeXL: 10,
        currentpageXL: 1,
        totalXL: 0,
        editData:{}
      })
      const currentchangeXL = (page) => {
        data.currentpageXL = page
        getlist()
      }
      const search = () => {
        data.currentpageXL=1
        getlist()
      }
      const handleclick = (type,row) => {
        if(type=="add"){
          data.editData = {}
          data.addtitle="新增角色类型"
          AddDialogdom.value.dialogVisible = true
        }
        else if(type=="edit"){
          data.editData = row
          data.addtitle="编辑角色类型"
          AddDialogdom.value.dialogVisible = true
        }
        else if(type=="del"){
          ElMessageBox.confirm("确认删除此条记录及其数据", "提示", {
              type: "warning",
              cancelButtonText: "取消",
              confirmButtonText: "确认",
          })
          .then(() => {
            Del_TbJsType({ids: row.id}).then(() => {
                ElMessage.success("删除成功");
                refreshdata()
                emit("havechanged")
            });
          })
        }
      }
      const addsure=(formdata)=>{
        if (formdata.id) {
          Edit_TbJsType({ ...formdata}).then(() => {
              ElMessage.success("编辑成功");
              AddDialogdom.value.dialogVisible = false;
              refreshdata();
              emit("havechanged")
          });
        } else {
          Add_TbJsType({ ...formdata}).then(() => {
              ElMessage.success("添加成功");
              AddDialogdom.value.dialogVisible = false;
              refreshdata()
              emit("havechanged")
          });
        }
      }
      const refreshdata=()=>{
          data.currentpageXL = 1;
          data.totalXL = 0;
          getlist();
      }
      const getlist=()=>{
        data.selectData=[]
        data.totalXL=0
        GetTbJsTypeListAll({pageindex:data.currentpageXL,pagesize:data.pagesizeXL,key:data.key}).then((res)=>{
          if(res?.pageList?.length){
            data.selectData=res.pageList
          }
          data.totalXL=res.allCounts?res.allCounts:0
        })
      }
      getlist()
      return {...toRefs(data), currentchangeXL, search, handleclick, activeline,indexMethod,addsure,refreshdata,AddDialogdom}
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .typelistbox {
    width: 100%;
    color: #EFEFEF;
    .querybox {
      padding: 0 20px;
      align-items: center;
      .adddw{
        margin:0 10px;
      }
    }
  
    .xllistbox {
      padding: 0 20px;
      margin-top: 20px;
  
      i {
          cursor: pointer;
        }
  
      .delbtn {
        color: #FF4B51;
        margin-left: 10px;
      }
    }
  
    .paginationbox {
      justify-content: center;
      margin-top: 30px;
    }
  }
  </style>
  