<template>
    <el-dialog title="批量录入" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false" :destroy-on-close="true" width="600px">
      <el-upload
        class="uploadbox"
        drag
        :limit="1"
        :headers="headers"
        :action="actionurl"
        :on-success="onsuccess"
        >
        <el-icon size="90" color="#ffffff"><UploadFilled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button style="background:#E2E2E2;color:#000000" @click="dialogclick('cancel')">取 消</el-button>
          <el-button v-if="showsurebtn" style="background:#1890FF;color:#ffffff" @click="dialogclick('sure')">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script>
  import { defineComponent,ref } from "vue";
  import storage from "@/utils/storage";
  import { ElMessage } from "element-plus";
  export default defineComponent({
      name: "BatchUpload",
      components: {},
      props: {
        isEdit: {
          type: Boolean,
          default: false
        },
        actionurl:{
          type: String,
          default: ""
        },
        showsurebtn:{
          type: Boolean,
          default: false
        }
      },
      setup(props,{emit}) {
        const dialogVisible=ref(false)
        const headers=ref({
          Authorization:`Bearer ${storage.getStorage("_token")}`
        })
        const onsuccess=(response)=>{
          console.log(response)
          if(response.success){
            emit("uploadsuccess")
            dialogVisible.value=false
            ElMessage.success(response.message);
          }else{
            ElMessage.error(response.message);
          }
         
        }
        const dialogclick=(type)=> {
          if(type=="sure"){
            dialogVisible.value=false
          }else{
            dialogVisible.value=false
          }
        }
        return {dialogVisible,dialogclick,headers,onsuccess}
      }
  })
  </script>
  
  <style lang="scss" scoped>
  .uploadbox{
    width: 445px;
    margin: 0 auto;
  }
  :deep(){
    .el-upload-list__item .el-progress{
      top:-58px;
      left:0px;
    }
    .el-progress-bar__outer{
      height: 4px !important;
    }
    .el-progress__text{
      color: #ffffff;
    }
  }
  </style>
  