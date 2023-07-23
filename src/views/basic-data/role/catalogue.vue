<template>
  <div class="catalogue">
    <div class="title flexbox">
      <div><span>角色列表</span></div>
      <div class="outlined" @click.stop="showTypeBox=true">角色类型</div>
    </div>
    <el-scrollbar class="treebox">
      <a-tree v-if="treeData.length" :tree-data="treeData" :fieldNames="fieldNames"
       @select="onSekect" :showLine="true" :blockNode="true" :autoExpandParent="true"
       v-model:selectedKeys="selectedlist"
       :defaultExpandAll="true">
        <template #title="{ dataRef, expanded }">
          <template v-if="dataRef.level==1">
              <FolderOpenFilled v-if="expanded" style="color: #ffca03" />
              <FolderFilled v-else style="color: #ffca03" />
          </template>
          <UserOutlined v-else style="color: #39fbfd" />
          {{ dataRef.name }}
          <plus-outlined v-if="dataRef.level==1" class="addicon deleteOutlined" @click.stop="addFn(dataRef)" />
          <delete-outlined v-else class="deleteOutlined" style="color:#f5f5f5" @click.stop="delClick(dataRef)" />
        </template>
      </a-tree>
    </el-scrollbar>
    <el-dialog v-model="showTypeBox" title="角色类型管理" :close-on-click-modal="false" :show-close="true" :destroy-on-close="true" width="600">
        <TypeList @havechanged="getTreeList"></TypeList>
        <template #footer>
            <span class="dialog-footer">
                <el-button style="background:#E2E2E2;color:#000000" @click="showTypeBox=false">取 消</el-button>
                <el-button style="background:#1890FF;color:#ffffff" @click="showTypeBox=false">确 定</el-button>
            </span>
        </template>
    </el-dialog>
    <AddDialog ref="AddDialogdom" @addsure="addsure" :editData="editData"></AddDialog>
  </div>
</template>

<script>
import { defineComponent, reactive,toRefs,ref } from "vue";
import { FolderFilled, FolderOpenFilled, UserOutlined } from "@ant-design/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {GetTbJsListAll,Del_TbJs,Add_TbJs,Edit_TbJs} from "@/api/interface/basic-data"
import TypeList from "./type/type.vue"
import AddDialog from './add.vue'
export default defineComponent({
  name:"JSList",
  emits: ["selectsure"],
  components: {FolderFilled,FolderOpenFilled,UserOutlined,TypeList,AddDialog},
  props:{
    list:{
      type:Array,
      default:()=>[]
    }
  },
  setup(props,{emit}) {
    const AddDialogdom = ref(null)
    const data = reactive({
      editData:{},
      showTypeBox:false,
      fieldNames:{children:"childrens",title:"name",key:"key"},
      treeData:[],
      selectedlist:[],
      currentselected:[]
    })
    const addsure=(formdata)=>{
      console.log(formdata)
      if(formdata.id){
        Edit_TbJs({...formdata}).then(()=>{
          ElMessage.success("编辑成功");
          AddDialogdom.value.dialogVisible = false;
          getTreeList();
        })
      }else{
        Add_TbJs({
          typeID:formdata.typeID,
          name:formdata.name,
          remark:formdata.remark
        }).then(()=>{
          ElMessage.success("添加成功");
          AddDialogdom.value.dialogVisible = false;
          getTreeList();
        })
      }
    }
    const addFn=(row)=>{
      data.editData={typeID:row.id}
      AddDialogdom.value.dialogVisible=true
    }
    // 节点点击事件
    const onSekect = (selectedKey, e) => {
      console.log(selectedKey,e)
      if (selectedKey.length && e.node.dataRef.level != 1) {
        data.selectedlist[0] = selectedKey[0];
        data.currentselected[0]= selectedKey[0];
        emit("selectsure", e.node.dataRef);
      } else {
        if (e.node.dataRef.level != 1) {
          data.selectedlist[0] = e.node.eventKey;
          data.currentselected[0]= e.node.eventKey;
        } else {
          data.selectedlist[0] = data.currentselected[0]
        }
      }
    };
    const delClick=(row)=>{
      console.log(row)
      ElMessageBox.confirm("确认删除此条记录及其数据", "提示", {
          type: "warning",
          cancelButtonText: "取消",
          confirmButtonText: "确认",
      })
      .then(() => {
          Del_TbJs({ids: row.id}).then(() => {
              ElMessage.success("删除成功");
              getTreeList()
          });
      })
      .catch(() => {});
    }
    const getTreeList=()=>{
      GetTbJsListAll().then((res)=>{
          if(res?.length){
            res.map((item)=>{
                item.level=1
                item.childrens.map((item2)=>{
                    item2.level=2
                    item2.childrens.map((item3)=>{
                        item3.level=3
                    })
                })
            })
            data.treeData=res
          }else{
            data.treeData=[]
          }
      })
    }
    getTreeList()
    return {...toRefs(data),onSekect,delClick,getTreeList,AddDialogdom,addsure,addFn};
  }
});
</script>

<style lang="scss" scoped>
.filecounts {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #409eff;
  background-color: #ccc;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 16px;
}
.example {
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
.catalogue {
  width: 100%;
  height: calc(100vh - 200px);
  position: relative;
  .title {
    height: 46px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid rgba(20, 125, 157, 0.5);
    color: #39fbfd;
    // font-weight: bold;
    font-size: 16px;
    border-radius:  20px 20px 0px 0px;

    .outlined {
      right: 20px;
      cursor: pointer;
      color: #39fbfd;
      font-size: 14px;
      // text-decoration: underline;
    }
  }
  .treebox{
    width:100%;
    height: calc(100% - 60px);
    padding: 20px;
  }

  .deleteOutlined {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .addicon{
      color: #409eff;
      font-size: 14px;
    }
}
</style>
