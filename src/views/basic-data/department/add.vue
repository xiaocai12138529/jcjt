<template>
  <el-dialog :title="title" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false"
    :destroy-on-close="true" width="600">
    <el-form ref="dialogforms" :model="dialogform" label-width="100px">
      <el-form-item label="名称：" prop="name" :rules="Rules.Text(true)">
        <el-input v-model="dialogform.name" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="职责：">
        <el-input type="textarea" v-model="dialogform.duty" placeholder="请输入"></el-input>
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
export default defineComponent({
  name: "AddDialog",
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    editData: {
      type: Object,
      default: () => { }
    },
    LXlist:{
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const dialogforms = ref(null)
    const dialogform = reactive({
      dwTypeId: null,
      name: "",
      duty: "",
      remark: "",
      parentId:null
    })
    const refreshFn = () => {
      dialogform.dwTypeId = null
      dialogform.name = ""
      dialogform.duty = ""
      dialogform.remark = ""
      dialogform.parentId=null
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
    watch(
      () => props.editData,
      (val) => {
        if (val != {}) {
          dialogform.id = props.editData.id
          dialogform.dwTypeId = props.editData.dwTypeId
          dialogform.name = props.editData.name
          dialogform.duty = props.editData.duty
          dialogform.remark = props.editData.remark
          dialogform.parentId = props.editData.parentId
        } else {
          refreshFn()
        }
      }
    );

    return { Rules, dialogVisible, dialogform, dialogclick, dialogforms }
  }
})
</script>

<style lang="scss" scoped></style>
