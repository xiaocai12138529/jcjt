<template>
  <div>
    <el-dialog :title="title" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false" :destroy-on-close="true" width="800">
      <el-form ref="dialogforms" :model="dialogform" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="起止日期：" prop="time">
              <el-date-picker v-model="dialogform.time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="至" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否长链：" prop="ifLongChain">
              <el-select v-model="dialogform.ifLongChain" clearable placeholder="请选择">
                <el-option label="Y" value="Y"></el-option>
                <el-option label="N" value="N"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车站：" prop="station">
              <el-input v-model="dialogform.station" placeholder="请输入车站" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岔区：" prop="cQ">
              <el-input v-model="dialogform.cQ" placeholder="请输入岔区" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工班：" prop="getWork">
              <el-input v-model="dialogform.getWork" placeholder="请输入工班"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测量方式：" prop="gageModel">
              <el-input v-model="dialogform.gageModel" placeholder="请输入测量方式"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作业方式：" prop="workModel">
              <el-input v-model="dialogform.workModel" placeholder="请输入作业方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业设备：" prop="workModel">
              <el-input v-model="dialogform.workModel" placeholder="请输入作业设备"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="操作手：" prop="workModel">
              <el-input v-model="dialogform.workModel" placeholder="请输入操作手"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车号：" prop="workModel">
              <el-input v-model="dialogform.workModel" placeholder="请输入车号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="稳定方式：" prop="workModel">
              <el-input v-model="dialogform.workModel" placeholder="请输入稳定方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="稳定车振动频率：" prop="workModel" label-width="130px">
              <el-input v-model="dialogform.workModel" placeholder="请输入稳定车振动频率"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注：" prop="remark">
              <el-input type="textarea" :controls="false" v-model="dialogform.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属线路：" prop="lineName">
              <div class="numberinput flexbox">
                <el-input v-model="dialogform.lineName" placeholder="请选择所属线路" disabled></el-input>
                <a-button style="color: #ffffff; border: solid 1px #1890ff" ghost @click="addline">+
                  添加所属线路</a-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择计划：" prop="dgPlanId">
              <el-select v-model="dialogform.dgPlanId" clearable placeholder="请选择" @change="handleChange">
                <el-option v-for="item in planOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button style="background:#E2E2E2;color:#000000" @click="dialogclick('cancel')">取 消</el-button>
          <el-button style="background:#1890FF;color:#ffffff" @click="dialogclick('sure')">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <SelectLine ref="SelectLinedom" v-model:isVisible="isVisible" :lineId="dialogform?.lineId" @returnline="returnline"></SelectLine>

  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref } from "vue";
import { Rules } from "@/views/validate";
import SelectLine from "./selectline.vue";
import { GetListByLine, GetTbDepartChild } from "@/api/interface/basic-data";
import { findParentIds } from "@/utils/utils";
import moment from "moment";

export default defineComponent({
  name: "AddDialog",
  components: { SelectLine },
  emits: ["addsure"],
  props: {
    title: {
      type: String,
      default: "",
    },
    editData: {
      type: Object,
      default: () => {},
    },
    DWlist: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const isVisible = ref(false);
    const dialogVisible = ref(false);
    const showselect = ref(false);
    const dialogforms = ref(null);
    const SelectLinedom = ref(null);
    const selectlist = ref([]);
    const resultlist = ref([]);
    const bmlist = ref([]);
    const planOption = ref([]);
    // 表单数据
    const dialogform = reactive({
      time: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")], // 开始时间结束时间
      ifLongChain: "", // 是否长链（Y、N）
      length: "", // 长度
      getWork: "", // 工班
      gageModel: "", // 测量方式
      workModel: "", // 作业方式
      remark: "", // 备注
      start_M: 0, // 开始里程
      end_M: 0, // 结束里程
      dgPlanId: null, // 计划
      station: "", //车站：
      cQ: "", //岔区：
      workDevice: "", //作业设备
      driver: "", //操作手
      trackNum: "", //车号
      stableMode: "", //稳定方式
      wDCZDPL: "", //稳定车振动频率
    });
    const refreshFn = () => {
      dialogform.time = [
        moment().format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD"),
      ];
      dialogform.lineId = null;
      dialogform.lineName = [];
      dialogform.goType = "";
      dialogform.trackCode = "";
      dialogform.trackNumber = null;
      dialogform.dwName = "";
      dialogform.start_M = "";
      dialogform.end_M = 0;
      dialogform.dgPlanId = null;
      dialogform.station = null;
      dialogform.cQ = null;
      dialogform.workDevice = null;
      dialogform.driver = null;
      dialogform.trackNum = null;
      dialogform.stableMode = null;
      dialogform.wDCZDPL = null;
      selectlist.value = 0;
    };
    // 设置所属线路数据
    const returnline = (list) => {
      dialogform.lineId = list?.lineId;
      dialogform.lineName = list?.lineName;
      getPlanList(list?.lineId);
    };
    const addline = () => {
      isVisible.value = true;
    };
    const dialogclick = (type) => {
      if (type == "sure") {
        dialogforms.value.validate((res) => {
          if (res) {
            dialogVisible.value = false;
            emit("addsure", {
              ...dialogform,
              startDate: dialogform.time ? dialogform.time[0] : null,
              endDate: dialogform.time ? dialogform.time[1] : null,
            });
            refreshFn();
          }
        });
      } else {
        dialogVisible.value = false;
        refreshFn();
      }
    };

    const removeline = (row) => {
      resultlist.value.map((item, index) => {
        if (row.lineId == item.lineId) {
          resultlist.value.splice(index, 1);
        }
      });
    };
    const handleChange = (val) => {
      console.log(val);
      getbmlist(val);
    };
    const getbmlist = (dwid) => {
      bmlist.value = [];
      if (dwid) {
        GetTbDepartChild({ dwid: dwid }).then((res) => {
          if (res?.pageList?.length) {
            bmlist.value = res.pageList;
            if (props.editData.departmentId) {
              let arr = findParentIds(
                res.pageList,
                props.editData.departmentId
              );
              dialogform.department = [...arr, props.editData.departmentId];
            } else {
              dialogform.department = [];
            }
          }
        });
      }
    };
    watch(
      () => props.editData,
      (val) => {
        console.log("val", val);
        if (val != {}) {
          dialogform.id = props.editData.id;
          dialogform.dwId = props.editData.dwId;
          getbmlist(dialogform.dwId);
          dialogform.name = props.editData.name;
          dialogform.remark = props.editData.remark;

          dialogform.startTime = props.editData.startTime
            ? props.editData.startTime.split("T")[0]
            : "";
          dialogform.endTime = props.editData.endTime
            ? props.editData.endTime.split("T")[0]
            : "";

          if (dialogform.startTime && dialogform.endTime) {
            dialogform.time = [dialogform.startTime, dialogform.endTime];
          }
          resultlist.value = props.editData.tbProjectLine
            ? props.editData.tbProjectLine
            : [];
          dialogform.station = props.editData.station;
          dialogform.cQ = props.editData.cQ;
          dialogform.workDevice = props.editData.workDevice;
          dialogform.driver = props.editData.driver;
          dialogform.trackNum = props.editData.trackNum;
          dialogform.stableMode = props.editData.stableMode;
          dialogform.wDCZDPL = props.editData.wDCZDPL;
        } else {
          resultlist.value = [];
          refreshFn();
        }
      }
    );

    // 获取计划
    const getPlanList = (LineId) => {
      GetListByLine({ LineId }).then((res) => {
        console.log(res);
        planOption.value = res;
      });
    };
    getPlanList(-1);

    return {
      planOption,
      isVisible,
      handleChange,
      bmlist,
      Rules,
      dialogVisible,
      dialogform,
      dialogclick,
      dialogforms,
      addline,
      selectlist,
      SelectLinedom,
      resultlist,
      showselect,
      removeline,
      returnline,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-form--inline .el-form-item {
  // display: ;
}
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
