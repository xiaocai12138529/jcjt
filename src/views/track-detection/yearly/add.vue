<template>
  <el-dialog
    title="数据录入"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    :destroy-on-close="true"
    width="600"
    :append-to-body="true"
  >
    <el-form ref="dialogforms" :model="dialogform" label-width="100px">
      <el-form-item label="期次名称：" prop="name">
        <el-input
          v-model="dialogform.name"
          placeholder="请输入期次名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属线路：" prop="lineId">
        <el-select
          v-model="dialogform.lineId"
          placeholder="请选择所属线路"
        >
          <el-option v-for="item in linelist" :key="item.lineId" :label="item.lineName" :value="item.lineId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="坐标系：" prop="projectCoordId">
        <el-select
          v-model="dialogform.projectCoordId"
          clearable
          placeholder="请选择坐标系"
        >
          <el-option v-for="item in zbxlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作业周期：" prop="dates">
        <el-date-picker
          v-model="dialogform.dates"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="开始里程：" prop="startMileage">
        <div class="numberinput flexbox">
          <el-input-number v-model="dialogform.startMileage" placeholder="请输入开始里程" style="flex:1" :controls="false"></el-input-number>
          <div class="appendbox">公里</div>
        </div>
      </el-form-item>
      <el-form-item label="结束里程：" prop="endMileage">
        <div class="numberinput flexbox">
          <el-input-number v-model="dialogform.endMileage" placeholder="请输入开始里程" style="flex:1" :controls="false"></el-input-number>
          <div class="appendbox">公里</div>
        </div>
      </el-form-item>
      <el-form-item label="测量单位：" prop="workUnits">
        <el-input
          v-model="dialogform.workUnits"
          placeholder="请输入测量单位"
        ></el-input>
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
import { defineComponent, reactive, watch, ref } from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "AddDialog",
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: () => {},
    },
    zbxlist:{
      type: Array,
      default: () => []
    },
    linelist:{
      type: Array,
      default: () => []
    },
  },
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    const dialogforms = ref(null);
    const dialogform = reactive({
      name: "",
      projectCoordId: null,
      lineId:null,
      dates: [],
      startTime: "",
      endTime: "",
      startMileage: "",
      endMileage: "",
      workUnits: "",
      remark: "",
    });
    const refreshFn = () => {
      dialogform.projectCoordId = null;
      dialogform.lineId= null;
      dialogform.name = "";
      dialogform.dates = [];
      dialogform.startTime = "";
      dialogform.endTime = "";
      dialogform.startMileage = "";
      dialogform.endMileage = "";
      dialogform.workUnits=""
      dialogform.remark = "";
    };
    const dialogclick = (type) => {
      if (type == "sure") {
        if (!dialogform.name) {
          return ElMessage.error("请输入期次名称");
        }
        if (!dialogform.lineId) {
          return ElMessage.error("请选择所属线路");
        }
        
        if (dialogform.dates?.length) {
          dialogform.startTime = dialogform.dates[0];
          dialogform.endTime = dialogform.dates[1];
        }
        emit("addsure", { ...dialogform });
        refreshFn();
        dialogVisible.value = false;
      } else {
        refreshFn();
        dialogVisible.value = false;
      }
    };
    watch(
      () => props.editData,
      (val) => {
        if (val != {}) {
          dialogform.id = props.editData.id;
          dialogform.projectCoordId = props.editData.projectCoordId;
          if(props.editData.lineId){
            dialogform.lineId = props.editData.lineId;
          }else{
            if(props.linelist?.length){
              dialogform.lineId=props.linelist[0].lineId
            }else{
              dialogform.lineId=null
            }
          }
          dialogform.name = props.editData.name;
          dialogform.startTime = props.editData.startTime
            ? props.editData.startTime.split("T")[0]
            : "";
          dialogform.endTime = props.editData.endTime
            ? props.editData.endTime.split("T")[0]
            : "";
          dialogform.startMileage = props.editData.startMileage;
          dialogform.endMileage = props.editData.endMileage;
          dialogform.workUnits=props.editData.workUnits;
          dialogform.remark = props.editData.remark;
          if (props.editData.startTime && props.editData.endTime) {
            dialogform.dates = [dialogform.startTime, dialogform.endTime];
          }
        } else {
          refreshFn();
          if(props.linelist?.length){
            dialogform.lineId=props.linelist[0].lineId
          }else{
            dialogform.lineId=null
          }
        }
      }
    );

    return { dialogVisible, dialogform, dialogclick, dialogforms };
  },
});
</script>

<style lang="scss" scoped></style>
