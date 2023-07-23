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
        <el-option v-for="item in LXlist" :key="item.id" :label="item.name" :value="item.id">{{ item.name }}
        </el-option>
      </el-select>
    </div>
    <div class="xllistbox">
      <el-table :data="selectData" :border="false"
        row-key="key" :tree-props="{ children: 'childrens' }" :indent="20">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column label="单位名称">
          <template #default="scope">
            <span :style="scope.row.level==1?'color:#FCCA00':''">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="action" label=" " align="center" width="70">
          <template #default="scope">
            <div class="tablebtn flexbox" :class="activeline==scope.row.id?'activebtn':''" @click.stop="handleclick(scope.row)">
              <span>{{ btnname }}</span>
              <el-icon><caret-right /></el-icon>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs ,ref} from "vue";
import {GetTbDwTypeByPage,GetListAllWithDepartment} from "@/api/interface/basic-data"
export default defineComponent({
  name: "DWformSelect",
  emits: ["selectsure"],
  props: {
    btnname: {
      type: String,
      default:"",
    }
  },
  setup(props,{emit}) {
    const activeline=ref(null)
    const data = reactive({
      dwtypeid:null,
      LXlist: [],
      activeXL: 0,
      selectData: [],
    })
    const handleclick=(row)=>{
      activeline.value=row.id
      emit("selectsure", row)
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
    const getlist=()=>{
      GetListAllWithDepartment({dwtypeid:data.dwtypeid}).then((res)=>{
        if(res?.pageList.length){
          data.selectData=res.pageList
        }else{
          data.selectData=[]
        }
      })
    }
    gettype()
    getlist()
    return { ...toRefs(data),handleclick,activeline,getlist }
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

  .xllistbox {
    padding: 0 20px;
    margin-top: 20px;

    .tablebtn {
      width: 58px;
      height: 28px;
      border-radius: 3px;
      background-color: rgba(34, 255, 250, 0.2);
      color: #39FBFD;
      font-size: 12px;
      border: 1px solid rgba(34, 255, 250, 0.8);
      align-items: center;
      justify-content: center;
      cursor: pointer;
      span{
        line-height: 30px;
      }
    }
    .activebtn{
      background: #1890FF;
      border: 1px solid #1890FF;
    }
    :deep(){
      .el-table{
        width: 100%;
        height: calc(65vh);
      }
      .el-icon{
        color: #EFEFEF;
      }
      .el-table__placeholder{
        display: none;
      }
    }
  }

  .paginationbox {
    justify-content: center;
    margin-top: 100px;
  }

  :deep().el-select {
    margin-bottom: 12px;
  }
}
</style>
