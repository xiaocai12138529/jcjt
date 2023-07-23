<template>
  <div>
    <el-dialog :title="title" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false" :destroy-on-close="true" width="600">
      <el-form ref="dialogforms" :model="dialogform" label-width="100px">
        <el-form-item label="所属线路：" prop="lineName" :rules="Rules.Require">
          <div class="numberinput flexbox">
            <el-input v-model="dialogform.lineName" placeholder="请选择所属线路" disabled></el-input>
            <a-button style="color: #ffffff; border: solid 1px #1890ff" ghost @click="addline">+
              添加所属线路</a-button>
          </div>
        </el-form-item>

        <el-form-item label="行别：" prop="goType">
          <el-input v-model="dialogform.goType" placeholder="请输入行别"></el-input>
        </el-form-item>

        <el-form-item label="起止日期：" prop="time">
          <el-date-picker v-model="dialogform.time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="至" value-format="YYYY-MM-DD"></el-date-picker>
        </el-form-item>
        <el-form-item label="开始里程：" prop="start_M">
          <div class="numberinput flexbox">
            <el-input-number v-model="dialogform.start_M" :placeholder="'请输入'" style="flex:1" :controls="false"></el-input-number>
            <div class="appendbox">公里</div>
          </div>
        </el-form-item>
        <el-form-item label="结束里程：" prop="end_M">
          <div class="numberinput flexbox">
            <el-input-number v-model="dialogform.end_M" :placeholder="'请输入'" style="flex:1" :controls="false"></el-input-number>
            <div class="appendbox">公里</div>
          </div>
        </el-form-item>

        <el-form-item label="捣固车型号：" prop="trackCode">
          <el-input v-model="dialogform.trackCode" placeholder="请输入捣固车型号"></el-input>
        </el-form-item>
        <el-form-item label="捣固车数量：" prop="trackNumber">
          <el-input-number :controls="false" v-model="dialogform.trackNumber" placeholder="请输入捣固车数量" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="所属单位：" prop="dwId" :rules="Rules.Require">
          <el-select v-model="dialogform.dwId" clearable placeholder="请选择" @change="handleChange">
            <el-option v-for="item in DWlist" :key="item.name" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门：" prop="depName">
          <el-cascader v-model="dialogform.depName" :options="bmlist" :props="bmprops" style="width:100%"></el-cascader>
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button style="background:#E2E2E2;color:#000000" @click="dialogclick('cancel')">取 消</el-button>
          <el-button style="background:#1890FF;color:#ffffff" @click="dialogclick('sure')">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <SelectLine ref="SelectLinedom" v-model:isVisible="isVisible" v-if="isVisible" :lineId="dialogform?.lineId" @returnline="returnline"></SelectLine>

  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref } from "vue";
import { Rules } from "@/views/validate";
import SelectLine from "./selectline.vue";
import { GetTbDepartChild } from "@/api/interface/basic-data";
import moment from "moment";
import { optionUrl } from "@/utils/utils";

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
    const resultlist = ref([]);
    const bmlist = ref([]);
    const bmprops = reactive({
      value: "name",
      label: "name",
      children: "childrens",
    });
    // 表单数据
    const dialogform = reactive({
      lineId: null, // 所属线路
      lineName: "", // 所属线路名称
      goType: "", // 行别
      time: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")], // 开始时间结束时间
      trackCode: "", // 捣固车型号
      trackNumber: null, // 捣固车数量
      dwName: "", // 单位名称
      start_M: 0, // 开始里程
      end_M: 0, // 结束里程
      dwId: null, // 单位
      depName: null, // 部门
    });

    // 重置表单
    const refreshFn = () => {
      dialogform.lineId = null;
      dialogform.lineName = [];
      dialogform.goType = "";
      dialogform.time = [
        moment().format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD"),
      ];
      dialogform.trackCode = "";
      dialogform.trackNumber = null;
      dialogform.dwName = "";
      dialogform.start_M = 0;
      dialogform.end_M = 0;
      dialogform.dwId = null;
      dialogform.depName = null;
    };
    // 设置所属线路数据
    const returnline = (list) => {
      dialogform.lineId = list?.lineId;
      dialogform.lineName = list?.lineName;
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
              dwName: props.DWlist.find((res) => res.id == dialogform?.dwId)
                .name,
              depName: dialogform?.depName
                ? dialogform?.depName[dialogform?.depName.length - 1]
                : null,
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
      getbmlist(val);
    };
    const getbmlist = (dwid) => {
      bmlist.value = [];
      if (dwid) {
        GetTbDepartChild({ dwid: dwid }).then((res) => {
          if (res?.pageList?.length) {
            bmlist.value = res.pageList;
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
          dialogform.lineId = props.editData.lineId;
          dialogform.lineName = props.editData.lineName;
          dialogform.goType = props.editData.goType;
          dialogform.start_M = props.editData.start_M;
          dialogform.end_M = props.editData.end_M;
          dialogform.trackCode = props.editData.trackCode;
          dialogform.trackNumber = props.editData.trackNumber;
          dialogform.dwId = props.DWlist.find(
            (res) => res.name == props.editData.dwName
          )?.id;
          props.editData.dwName
            ? getbmlist(
                props.DWlist.find((res) => res.name == props.editData.dwName).id
              )
            : "";
          setTimeout(() => {
            dialogform.depName = optionUrl(
              props.editData.depName,
              bmlist.value
            );
          }, 100);
          console.log("depName", dialogform.depName);
          if (props.editData.startTime && props.editData.endTime) {
            dialogform.time = [
              props.editData.startTime.split("T")[0],
              props.editData.endTime.split("T")[0],
            ];
          }
          resultlist.value = props.editData.tbProjectLine
            ? props.editData.tbProjectLine
            : [];
        } else {
          resultlist.value = [];
          refreshFn();
        }
      }
    );

    return {
      isVisible,
      bmprops,
      handleChange,
      bmlist,
      Rules,
      dialogVisible,
      dialogform,
      dialogclick,
      dialogforms,
      addline,
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
