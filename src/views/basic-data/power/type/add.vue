<template>
  <el-dialog :title="title" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false"
    :destroy-on-close="true" width="600">
    <el-form ref="dialogforms" :model="dialogform" label-width="100px">
      <el-form-item label="类型名称：" prop="name" :rules="Rules.Text(true)">
        <el-input v-model="dialogform.name" placeholder="请输入类型名称"></el-input>
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
  name: "AddType",
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
      name: ""
    })
    const refreshFn = () => {
      dialogform.name = ""
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
          dialogform.name = props.editData.name
        } else {
          dialogform.name = ""
        }
      }
    );

    return { Rules, dialogVisible, dialogform, dialogclick, dialogforms }
  }
})
</script>

<style lang="scss" scoped></style>
