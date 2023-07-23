<template>
  <el-dialog
    title="上传文件"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    :destroy-on-close="true"
    width="600"
  >
    <el-form :model="dialogform" label-width="120px">
      <el-form-item label="文件：">
        <el-upload
          multiple
          :action="uploadaction"
          :headers="uploadheader"
          :http-request="handlerequest"
          :file-list="dialogform.fileList"
        >
          <el-button size="small" type="primary">上传文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          type="textarea"
          v-model="dialogform.remark"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          style="background: #e2e2e2; color: #000000"
          @click="dialogclick('cancel')"
          >取 消</el-button
        >
        <el-button
          style="background: #1890ff; color: #ffffff"
          @click="dialogclick('sure')"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import storage from "@/utils/storage";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash";
const baseURL = process.env.VUE_APP_TRACK_URL
import service from "@/api/index";
export default defineComponent({
  name: "AddFileDialog",
  emits: ["addfilesure"],
  props: {
    uploadaction: {
      type: String,
      default: "",
    },
    limit:{
      type: Number,
      default: 1,
    }
  },
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    const dialogform = reactive({
      fileList: [],
      remark: "",
    });
    const refreshFn = () => {
      dialogform.remark = "";
      dialogform.fileList = [];
    };
    const dialogclick = (type) => {
      if (type == "sure") {
        if(!dialogform.fileList?.length){
          return  ElMessage.error("请上传文件");
        }
        console.log(dialogform.fileList);
        emit("addfilesure",{...dialogform});
      } else {
        dialogVisible.value = false;
        refreshFn();
      }
    };
    const handlerequest=(parames)=>{
      service.upload({ url: parames.action, data: { files: parames.file } }).then((res)=>{
        console.log(res)
        if(res?.length){
          res.map((item)=>{
            let arr = item.filePath.split(".");
            item.fileType = arr[arr.length - 1];
            item.name=item.fileName+"."+item.fileType
            item.url=baseURL+"/"+item.filePath
          })
          dialogform.fileList =cloneDeep(dialogform.fileList).concat(res);
          ElMessage.success("上传成功");
        }else{
          ElMessage.error("上传失败");
        }
      })
    }
    return {
      dialogVisible,
      dialogform,
      dialogclick,
      uploadheader: {
        token: storage.getStorage("_token"),
      },
      handlerequest
    };
  },
});
</script>

<style lang="scss" scoped>
:deep().el-upload-list {
  min-height: 0px;
  width: 400px;
}
</style>
