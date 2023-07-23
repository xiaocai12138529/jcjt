<template>
  <el-dialog title="数据录入" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false"
    :destroy-on-close="true" width="600">
    <el-form ref="dialogforms" :model="dialogform" label-width="100px">
      <el-form-item label="权限类型：" prop="typeID" :rules="Rules.Require">
        <el-select v-model="dialogform.typeID" clearable placeholder="请选择权限类型">
          <el-option v-for="item in qxTypelist" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限名称：" prop="name" :rules="Rules.Text(true)">
        <el-input v-model="dialogform.name" placeholder="请输入权限名称"></el-input>
      </el-form-item>
      <el-form-item label="关键key：" prop="key" :rules="Rules.Text(true)">
        <el-input v-model="dialogform.key" placeholder="请输入key"></el-input>
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
import {GetTbQxTypeListAll} from "@/api/interface/basic-data"
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
    const qxTypelist=ref([])
    const dialogform = reactive({
      typeID:null,
      name: "",
      key: ""
    })
    const refreshFn = () => {
      dialogform.typeID=null
      dialogform.name = ""
      dialogform.key = ""
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
    const getQXtype=()=>{
        GetTbQxTypeListAll({pageindex:1,pagesize:1000}).then((res)=>{
            console.log(res)
            if(res?.pageList?.length){
                qxTypelist.value=res.pageList
            }else{
                qxTypelist.value=[]
            }
        })
    }
    watch(
      () => props.editData,
      (val) => {
        if (val != {}) {
          dialogform.name = props.editData.name
          dialogform.typeID = props.editData.typeID
          dialogform.key = props.editData.key
          dialogform.id = props.editData.name?props.editData.id:null
          getQXtype()
        } else {
          refreshFn()
          getQXtype()
        }
      }
    );

    return { Rules, dialogVisible, dialogform, dialogclick, dialogforms,qxTypelist }
  }
})
</script>

<style lang="scss" scoped></style>
