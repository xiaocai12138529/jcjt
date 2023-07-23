<template>
  <el-dialog title="数据录入" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false"
    :destroy-on-close="true" width="600">
    <el-form ref="dialogforms" :model="dialogform" label-width="100px">
      <el-form-item label="角色类型：" prop="typeID" :rules="Rules.Require">
        <el-select v-model="dialogform.typeID" clearable placeholder="请选择角色类型" disabled>
          <el-option v-for="item in typelist" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色名称：" prop="name" :rules="Rules.Text(true)">
        <el-input v-model="dialogform.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="dialogform.remark" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button style="background:#E2E2E2;color:#000000" @click="dialogclick('cancel')">取 消</el-button>
        <el-button style="background:#1890FF;color:#ffffff" @click="dialogclick('sure')">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, watch, ref } from "vue";
import { Rules } from '@/views/validate'
import {GetTbJsTypeListAll} from "@/api/interface/basic-data"
export default defineComponent({
  name: "AddDialog",
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => { }
    }
  },
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const dialogforms = ref(null)
    const typelist=ref([])
    const dialogform = reactive({
      typeID: null,
      name: "",
      remark: ""
    })
    const refreshFn = () => {
      dialogform.typeID = null
      dialogform.name = ""
      dialogform.remark = ""
    }
    const dialogclick = (type) => {
      if (type == 'sure') {
        dialogforms.value.validate((res) => {
          if (res) {
            dialogVisible.value = false
            emit("addsure", { ...dialogform })
            refreshFn()
          }
        })
      } else {
        dialogVisible.value = false
        refreshFn()
      }
    }
    const gettypelist=()=>{
      GetTbJsTypeListAll({pageindex:1,pagesize:1000}).then((res)=>{
        if(res?.pageList?.length){
          typelist.value=res.pageList
        }else{
          typelist.value=[]
        }
      })
    }
    gettypelist()
    watch(
      () => props.editData,
      () => {
        dialogform.typeID = props.editData.typeID?props.editData.typeID:null
        dialogform.name = props.editData.name?props.editData.name:""
        dialogform.remark = props.editData.remark? props.editData.remark:""
        dialogform.id = props.editData.id?props.editData.id:null
      }
    );

    return { Rules, dialogVisible, dialogform, dialogclick, dialogforms,typelist }
  }
})
</script>

<style lang="scss" scoped></style>
