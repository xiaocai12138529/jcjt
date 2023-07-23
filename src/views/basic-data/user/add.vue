<template>
  <div>
    <el-dialog title="数据录入" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false"
      :destroy-on-close="true" width="600">
      <el-form ref="dialogforms" :model="dialogform" label-width="100px">
        <el-form-item label="用户名：" prop="userName" :rules="Rules.Text(true)">
          <el-input v-model="dialogform.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="realName">
          <el-input v-model="dialogform.realName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select v-model="dialogform.sex" placeholder="请选择性别">
            <el-option label="男" value="男">男</el-option>
            <el-option label="女" value="女">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话：" prop="telphone">
          <el-input v-model="dialogform.telphone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="dialogform.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="职责：">
          <el-input type="textarea" v-model="dialogform.duty" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="关联角色：">
          <a-button style="color: #ffffff; border: dashed 1px #1890ff" type="dashed" ghost @click="addJS">+ 添加关联角色</a-button>
          <div class="seclectlines flexbox" v-for="item in resultlist" :key="item.id">
            <span> {{ item.name }}</span>
            <span @click.stop="removeline(item)">移除</span>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button style="background:#E2E2E2;color:#000000" @click="dialogclick('cancel')">取 消</el-button>
          <el-button style="background:#1890FF;color:#ffffff" @click="dialogclick('sure')">确 定</el-button>
        </span>
      </template>
      
    </el-dialog>
    <SelectJs ref="SelectJSdom" @returnJSlist="returnJSlist"></SelectJs>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref ,toRefs} from "vue";
import { Rules } from '@/views/validate'
import SelectJs from "./selectJS.vue"
import { cloneDeep } from "lodash";
import {norepeat} from "@/utils/utils"
export default defineComponent({
  name: "AddDialog",
  components: {SelectJs},
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
    const SelectJSdom = ref(null)
    const data=reactive({
      resultlist:[]
    })
    const dialogform = reactive({
      userName: "",
      realName: "",
      sex: "男",
      telphone: "",
      email: "",
      duty: "",
    })
    const refreshFn = () => {
      dialogform.userName = ""
      dialogform.realName = ""
      dialogform.sex = "男"
      dialogform.telphone = ""
      dialogform.email = ""
      dialogform.duty = ""
      data.resultlist=[]
    }
    const dialogclick = (type) => {
      if (type == 'sure') {
        dialogforms.value.validate((res) => {
          if (res) {
            dialogVisible.value = false
            emit("addsure", { ...dialogform,resultlist:cloneDeep(data.resultlist) })
            refreshFn()
          }
        })
      } else {
        dialogVisible.value = false
        refreshFn()
      }
    }
    const returnJSlist=(list)=>{
      console.log(list)
      data.resultlist=data.resultlist.concat(list)
      data.resultlist=norepeat(data.resultlist,"id")
    }
    const addJS=()=>{
      data.ylist=[]
      SelectJSdom.value.dialogVisible=true
    }
    const removeline=(row)=>{
      data.resultlist.map((item,index)=>{
        if(item.id==row.id){
          data.resultlist.splice(index,1)
        }
      })
    }
    watch(
      () => props.editData,
      (val) => {
        if (val != {}) {
          dialogform.id = props.editData.id
          dialogform.userName = props.editData.userName
          dialogform.realName = props.editData.realName
          dialogform.sex = props.editData.sex
          dialogform.telphone = props.editData.telphone
          dialogform.email = props.editData.email
          dialogform.duty = props.editData.duty
          if(props.editData.tb_PeopleJsbDtos?.length){
            props.editData.tb_PeopleJsbDtos.map((item)=>{
              item.oldid=item.id
              item.id=item.jsbId
              item.name=item.jsbName
            })
            data.resultlist=props.editData.tb_PeopleJsbDtos
          }else{
            data.resultlist=[]
          }
        } else {
          refreshFn()
        }
      }
    );

    return {...toRefs(data), Rules, dialogVisible, dialogform, dialogclick, dialogforms,returnJSlist,SelectJSdom,addJS,removeline }
  }
})
</script>

<style lang="scss" scoped>
.seclectlines{
  width: 100%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  background: #3f5094;
  margin-bottom: 10px;
  span:nth-child(1) {
    font-size: 14px;
    color: #ffffff;
    margin-left: 14px;
  }

  span:nth-child(2) {
    font-size: 14px;
    color: #1989fa;
    margin-right: 14px;
    cursor: pointer;
  }
}
.seclectlines:nth-child(2){
  margin-top: 10px;
}
</style>
