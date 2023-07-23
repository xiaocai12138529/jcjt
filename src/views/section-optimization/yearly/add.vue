<template>
  <el-dialog title="数据录入" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false"
    :destroy-on-close="true" width="1000" :append-to-body="true">
    <el-form ref="dialogforms" :model="dialogform" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="期次名称：" prop="name">
            <el-input v-model="dialogform.name" placeholder="请输入期次名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属线路：" prop="lineId">
            <el-select v-model="dialogform.lineId" placeholder="请选择所属线路">
              <el-option v-for="item in linelist" :key="item.lineId" :label="item.lineName"
                :value="item.lineId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="坐标系：" prop="projectCoordId">
            <el-select v-model="dialogform.projectCoordId" clearable placeholder="请选择坐标系">
              <el-option v-for="item in zbxlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="activetype == '动态TQI管理'">
          <el-form-item label="检测车号：" prop="checkNum">
            <el-input v-model="dialogform.checkNum" placeholder="请输入检测车号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作业周期：" prop="dates">
            <el-date-picker v-model="dialogform.dates" type="daterange" range-separator="~" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="YYYY-MM-DD"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="activetype != '动态TQI管理'">
          <el-form-item label="线路类型：" prop="lineType">
            <el-select v-model="dialogform.lineType" clearable placeholder="请选择线路类型">
              <el-option label="左线" value="左线"></el-option>
              <el-option label="右线" value="右线"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开始里程：" prop="startMileage">
            <div class="numberinput flexbox">
              <el-input-number v-model="dialogform.startMileage" placeholder="请输入开始里程" style="flex:1" :controls="false"></el-input-number>
              <div class="appendbox">公里</div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束里程：" prop="endMileage">
            <div class="numberinput flexbox">
              <el-input-number v-model="dialogform.endMileage" placeholder="请输入开始里程" style="flex:1" :controls="false"></el-input-number>
              <div class="appendbox">公里</div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="测量单位：" prop="workUnits">
            <el-input v-model="dialogform.workUnits" placeholder="请输入测量单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="activetype == '动态TQI管理'">
          <el-form-item label="编写人员：" prop="peopleName">
            <el-input v-model="dialogform.peopleName" placeholder="请输入编写人员"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="activetype == '动态TQI管理'">
          <el-form-item label="审核人员：" prop="checkPeopleName">
            <el-input v-model="dialogform.checkPeopleName" placeholder="请输入审核人员"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="activetype == '动态TQI管理'">
          <el-form-item label="检测日期：" prop="checkDate">
            <el-date-picker v-model="dialogform.checkDate" type="date" placeholder="选择日期" value-format="YYYY-MM-DD">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12"> 
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="dialogform.remark" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button style="background: #e2e2e2; color: #000000" @click="dialogclick('cancel')">取 消</el-button>
        <el-button style="background: #1890ff; color: #ffffff" @click="dialogclick('sure')">确 定</el-button>
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
      default: () => { },
    },
    zbxlist: {
      type: Array,
      default: () => []
    },
    linelist: {
      type: Array,
      default: () => []
    },
    activetype: {
      default: ""
    }
  },
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    const dialogforms = ref(null);
    const dialogform = reactive({
      name: "",
      projectCoordId: null,
      lineId: null,
      dates: [],
      startTime: "",
      endTime: "",
      startMileage: null,
      endMileage: null,
      workUnits: "",
      lineType: "",
      remark: "",
      checkNum:"",
      peopleName:"",
      checkPeopleName:"",
      checkDate:""
    });
    const refreshFn = () => {
      dialogform.projectCoordId = null;
      dialogform.lineId = null;
      dialogform.name = "";
      dialogform.dates = [];
      dialogform.startTime = "";
      dialogform.endTime = "";
      dialogform.startMileage = null;
      dialogform.endMileage = null;
      dialogform.workUnits = ""
      dialogform.lineType = ""
      dialogform.remark = "";
      dialogform.checkNum=""
      dialogform.peopleName=""
      dialogform.checkPeopleName=""
      dialogform.checkDate=""
      
    };
    const dialogclick = (type) => {
      if (type == "sure") {
        if (!dialogform.name) {
          return ElMessage.error("请输入期次名称");
        }
        if (props.activetype == '动态TQI管理') {
          if (!dialogform.checkNum) {
            return ElMessage.error("请输入检测车号");
          }
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
          if (props.editData.lineId) {
            dialogform.lineId = props.editData.lineId;
          } else {
            if (props.linelist?.length) {
              dialogform.lineId = props.linelist[0].lineId
            } else {
              dialogform.lineId = null
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
          dialogform.workUnits = props.editData.workUnits;
          dialogform.remark = props.editData.remark;
          dialogform.lineType = props.editData.lineType;
          dialogform.checkNum=props.editData.checkNum;
          dialogform.peopleName=props.editData.peopleName;
          dialogform.checkPeopleName=props.editData.checkPeopleName;
          dialogform.checkDate=props.editData.checkDate;
          if (props.editData.startTime && props.editData.endTime) {
            dialogform.dates = [dialogform.startTime, dialogform.endTime];
          }
        } else {
          refreshFn();
          if (props.linelist?.length) {
            dialogform.lineId = props.linelist[0].lineId
          } else {
            dialogform.lineId = null
          }
        }
      }
    );

    return { dialogVisible, dialogform, dialogclick, dialogforms };
  },
});
</script>

<style lang="scss" scoped></style>
