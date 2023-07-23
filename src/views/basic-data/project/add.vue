<template>
  <div>
    <el-dialog :title="title" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false"
      :destroy-on-close="true" width="600">
      <el-form ref="dialogforms" :model="dialogform" label-width="100px">
        <el-form-item label="项目名称：" prop="name" :rules="Rules.Text(true)">
          <el-input v-model="dialogform.name" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="所属单位：" prop="dwId" :rules="Rules.Require">
          <el-select v-model="dialogform.dwId" clearable placeholder="请选择" @change="handleChange">
            <el-option v-for="item in DWlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门：" prop="department" :rules="Rules.Require">
          <el-cascader v-model="dialogform.department" :options="bmlist" :props="bmprops" style="width:100%"></el-cascader>
        </el-form-item>
        <el-form-item label="起止日期：" prop="time">
          <el-date-picker v-model="dialogform.time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
            range-separator="至" value-format="YYYY-MM-DD"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="dialogform.remark" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="关联线路：">
          <a-button style="color: #ffffff; border: dashed 1px #1890ff" type="dashed" ghost @click="addline">+
            添加关联线路</a-button>
        </el-form-item>
        <el-form-item label=" ">
          <div class="seclectlines flexbox" v-for="item in resultlist" :key="item.lineId">
            <span> {{ item.lineName }}</span>
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
    <SelectLine v-if="showselect" ref="SelectLinedom" :list="selectlist" @closeselect="closeselect"
      @returnline="returnline"></SelectLine>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref } from "vue";
import { Rules } from '@/views/validate'
import SelectLine from "./selectline.vue"
import { cloneDeep } from "lodash";
import { GetTbDepartChild } from "@/api/interface/basic-data"
import {findParentIds} from "@/utils/utils"
export default defineComponent({
  name: "AddDialog",
  components: { SelectLine },
  emits: ["addsure"],
  props: {
    title: {
      type: String,
      default: ""
    },
    editData: {
      type: Object,
      default: () => { }
    },
    DWlist: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const showselect = ref(false)
    const dialogforms = ref(null)
    const SelectLinedom = ref(null)
    const selectlist = ref([])
    const resultlist = ref([])
    const bmlist = ref([])
    const bmprops=reactive({
      value:"id",
      label:"name",
      children:"childrens"
    })
    const dialogform = reactive({
      name: "",
      dwId: null,
      department:[],
      time: [],
      remark: "",
      startTime: "",
      endTime: "",
    })
    const refreshFn = () => {
      dialogform.name = ""
      dialogform.time = []
      dialogform.remark = ""
      dialogform.startTime = ""
      dialogform.endTime = ""
      dialogform.dwId = null
      dialogform.department=[]
      selectlist.value = []
    }
    const returnline = (list) => {
      console.log(list)
      resultlist.value = []
      resultlist.value = list
    }
    const addline = () => {
      showselect.value = true
      setTimeout(() => {
        selectlist.value = resultlist.value
        SelectLinedom.value.dialogVisible = true
      }, 100);
    }
    const dialogclick = (type) => {
      if (type == 'sure') {
        dialogforms.value.validate((res) => {
          if (res) {
            dialogVisible.value = false
            if (dialogform.time?.length) {
              dialogform.startTime = dialogform.time[0]
              dialogform.endTime = dialogform.time[1]
            }
            emit("addsure", { ...dialogform, selectlist: cloneDeep(resultlist.value) })
            refreshFn()
          }
        })
      } else {
        dialogVisible.value = false
        refreshFn()
      }
    }
    const closeselect = () => {
      selectlist.value = []
      showselect.value = false
    }
    const removeline = (row) => {
      resultlist.value.map((item, index) => {
        if (row.lineId == item.lineId) {
          resultlist.value.splice(index, 1)
        }
      })
    }
    const handleChange = (val) => {
      console.log(val)
      getbmlist(val)
    }
    const getbmlist = (dwid) => {
      bmlist.value = []
      if (dwid) {
        GetTbDepartChild({ dwid: dwid }).then((res) => {
          if (res?.pageList?.length) {
            bmlist.value = res.pageList
            if(props.editData.departmentId){
              let arr=findParentIds(res.pageList,props.editData.departmentId)
              dialogform.department=[...arr,props.editData.departmentId]
            }else{
              dialogform.department=[]
            }
          }
        })
      }
    }
    watch(
      () => props.editData,
      (val) => {
        if (val != {}) {
          dialogform.id = props.editData.id;
          dialogform.dwId = props.editData.dwId;
          getbmlist(dialogform.dwId)
          dialogform.name = props.editData.name;
          dialogform.remark = props.editData.remark;
          dialogform.startTime = props.editData.startTime ? props.editData.startTime.split("T")[0] : "";
          dialogform.endTime = props.editData.endTime ? props.editData.endTime.split("T")[0] : "";
          if (dialogform.startTime && dialogform.endTime) {
            dialogform.time = [dialogform.startTime, dialogform.endTime]
          }
          resultlist.value = props.editData.tbProjectLine ? props.editData.tbProjectLine : []

        } else {
          resultlist.value = []
          refreshFn()
        }
      }
    );

    return { bmprops,handleChange, bmlist, Rules, dialogVisible, dialogform, dialogclick, dialogforms, addline, selectlist, SelectLinedom, resultlist, closeselect, showselect, removeline, returnline }
  }
})
</script>

<style lang="scss" scoped>
.seclectlines {
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
</style>
