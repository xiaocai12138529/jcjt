<template>
    <el-dialog :title="title" v-model="dialogVisible" :close-on-click-modal="false" :show-close="true"
      :destroy-on-close="true" width="600" >
      <div class="selectbox flexbox" v-if="selectlist?.length">
        <div class="selectline" v-for="(item,index) in selectlist" :key="index">
            <span>{{ item.name }}</span>
        </div>
      </div>
        <el-scrollbar class="tablebox">
            <a-tree v-if="treeData.length" :tree-data="treeData" 
            :fieldNames="fieldNames" @select="onSekect" :showLine="true" 
            :blockNode="true" :autoExpandParent="true" 
            v-model:selectedKeys="selectedKeys"
            :defaultExpandAll="true">
                <template #title="{ dataRef, expanded }">
                    <template v-if="dataRef.level==1">
                        <FolderOpenFilled v-if="expanded" style="color: #ffca03" />
                        <FolderFilled v-else style="color: #ffca03" />
                    </template>
                    <UserOutlined v-else style="color: #39fbfd" />
                    {{ dataRef.name }}
                </template>
            </a-tree>
        </el-scrollbar>
        <template #footer>
            <span class="dialog-footer">
                <el-button style="background:#E2E2E2;color:#000000" @click="dialogclick">取 消</el-button>
                <el-button style="background:#1890FF;color:#ffffff" @click="dialogclick">确 定</el-button>
            </span>
      </template>
    </el-dialog>
  </template>
  
<script>
  import { defineComponent, ref,toRefs, reactive} from "vue";
  import {GetTbJsListAll} from "@/api/interface/basic-data"
  import {norepeat} from "@/utils/utils"
  import { FolderFilled, FolderOpenFilled, UserOutlined } from "@ant-design/icons-vue";
  export default defineComponent({
    name: "SelectLine",
    emits: ["returnJSlist"],
    components: {FolderFilled,FolderOpenFilled,UserOutlined},
    props: {
      title: {
        type: String,
        default: "选择关联角色"
      }
    },
    setup(props,{emit}) {
        const dialogVisible = ref(false)
        const selectlist=ref([])
        const tabledom=ref(null)
        const data = reactive({
            selectedKeys:[],
            currentselected:[],
            fieldNames:{children:"childrens",title:"name",key:"key"},
            key:"",
            treeData: [],
            editData: {}
        })
        // 节点点击事件
        const onSekect = (selectedKeys, e) => {
            // console.log(selectedKeys,e)
            if (e.node.dataRef.level != 1) {
                if(e.selected){
                    selectlist.value.push(e.node.dataRef)
                    data.selectedKeys=selectedKeys
                    data.currentselected=selectedKeys
                }else{
                    selectlist.value.map((item,index)=>{
                        if(item.id==e.node.dataRef.id){
                            selectlist.value.splice(index,1)
                        }
                    })
                    data.selectedKeys=[]
                    data.currentselected=[]
                }
                selectlist.value=norepeat(selectlist.value,"id")
            }else{
                data.selectedKeys=data.currentselected
            }
            
        };
        const dialogclick = () => {
            dialogVisible.value = false
            emit("returnJSlist",selectlist.value)
            data.selectedKeys=[]
            data.currentselected=[]
            selectlist.value=[]
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
        return { dialogVisible, selectlist,...toRefs(data),tabledom,dialogclick,onSekect}
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .selectbox{
    width: calc(100% - 0px);
    flex-wrap: wrap;
    margin: 0 auto;
    padding-bottom: 10px;
    border: dashed 1px #1890ff;
    .selectline{
        padding: 0 10px;
        background: #3f5094;
        height: 32px;
        line-height: 32px;
        border-radius: 6px;
        margin-left: 10px;
        margin-top: 10px;
        color: #ffffff;
        font-size: 14px;
        position: relative;
        .delicon{
            position: absolute;
            right: -6px;
            top: -12px;
            cursor: pointer;
        }
    }
  }
  .querybox {
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;

        .queryleft {
            align-items: center;
            margin-left: 10px;
        }

        .queryright {
            align-items: center;
            margin-right: 20px;
        }
    }
    .tablebox{
        border: dashed 1px #1890ff;
        padding:20px;
        margin-top: 16px;
        height: 420px;
    }
  </style>
  