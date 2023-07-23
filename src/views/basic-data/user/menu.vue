<template>
    <div class="linetabbox">
        <div class="boxlefttitle flexbox">
            <el-icon>
            <Fold />
            </el-icon>
            <span style="margin-left:12px">单位部门</span>
        </div>
        <div class="querybox flexbox">
            <el-select v-model="dwtypeid" default-first-option placeholder="单位类型" clearable @change="getlist">
                <el-option v-for="item in LXlist" :key="item.id" :label="item.name" :value="item.id">{{ item.name }}</el-option>
            </el-select>
        </div>
        <el-scrollbar class="scrollbars" v-if="selectData.length">
            <a-tree :tree-data="selectData" @select="onSekect" :selectedKeys="selectedKeys" show-icon show-line :blockNode="true" :defaultExpandAll="true" :autoExpandParent="true" :fieldNames="fieldNames">
                <template v-slot:title="{ dataRef }">
                    <svg-icon v-if="dataRef.level==1" name="qiyeguanli"  :size="18" />
                    <svg-icon v-else-if="dataRef.level==2" name="wenjian" :size="18" />
                    <svg-icon v-else-if="dataRef.level==3" name="tuandui" :size="18" />
                    <span style="margin-left:4px"> {{ dataRef.name }}</span>
                </template>
            </a-tree>
        </el-scrollbar>
    </div>
  </template>
  <script>
  import { defineComponent, reactive, toRefs } from "vue";
  import {GetTbDwTypeByPage,GetListAllWithDepartment} from "@/api/interface/basic-data"
  export default defineComponent({
    name: "DWformSelect",
    components:{},
    emits: ["selectsure"],
    props: {
      btnname: {
        type: String,
        default:"",
      }
    },
    setup(props,{emit}) {
      const data = reactive({
        fieldNames:{children:"childrens",title:"name",key:"key"},
        dwtypeid:null,
        LXlist: [],
        activeXL: 0,
        selectData: [],
        selectedKeys:[]
      })
      const onSekect = (selectedKeys, { node }) => {
        // console.log("click", selectedKeys, node);
        data.selectedKeys=[node.dataRef.key]
        emit("selectsure", node.dataRef)
      };
      const gettype=()=>{
          GetTbDwTypeByPage({pageindex:1,pagesize:1000}).then((res)=>{
              if(res?.pageList?.length){
                  data.LXlist=res.pageList
              }else{
                  data.LXlist=[]
              }
          })
      }
      const getlist=()=>{
        GetListAllWithDepartment({dwtypeid:data.dwtypeid?data.dwtypeid:null}).then((res)=>{
          if(res?.pageList.length){
            res.pageList.map((item)=>{
                item.level=1
                item.childrens?.map((item2)=>{
                    item2.level=2
                    item2.childrens?.map((item3)=>{
                        item3.level=3
                        item3.childrens?.map((item4)=>{
                            item4.level=4
                            item4.childrens?.map((item5)=>{
                                item5.level=4
                            })
                        })
                    })
                })
            })
            emit("selectsure", res.pageList[0])
            data.selectData=res.pageList
            data.selectedKeys=[res.pageList[0].key]
          }else{
            data.selectData=[]
          }
        })
      }
      gettype()
      getlist()
      return { ...toRefs(data),getlist,onSekect }
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .linetabbox {
    width: 100%;
    color: #EFEFEF;
    .boxlefttitle {
      padding: 0 20px;
      height: 50px;
      align-items: center;
      font-size: 18px;
    }
  
    .querybox {
      padding: 0 20px;
      flex-direction: column;
    }
  
    .scrollbars{
        height: calc(100vh - 300px);
        padding: 0 20px;
    }
  
    :deep().el-select {
      margin-bottom: 12px;
    }
  }
  </style>
  