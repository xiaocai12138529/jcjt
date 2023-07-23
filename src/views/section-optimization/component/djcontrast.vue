<template>
  <div class="contrastbox">
    <div class="querybox flexbox">
      <div class="boxtitle">期次：</div>
      <el-select v-model="qcM" placeholder="请选择期次" style="width: 300px">
        <el-option v-for="item in resultM" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <div style="padding: 0 20px">VS</div>
      <el-select v-model="qcTQI" placeholder="请选择期次" style="width: 300px">
        <el-option v-for="item in resultTQI" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary" style="margin-left:20px" @click.stop="onPK">查询</el-button>
    </div>

    <EmptyBox v-if="showempty" titles="暂无对比数据"></EmptyBox>
    <div id="chartbox" v-else v-loading="isloading"></div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
import {
  GetList_TQIDataPerid,
  GetList_TQICompare,
} from "@/api/interface/section-optimization";
import { message } from "ant-design-vue";
import * as echarts from "echarts";
import EmptyBox from "@/components/emptybox/emptybox.vue"
export default defineComponent({
  name: "ContrastBox",
  components: { EmptyBox },
  props: {
    projectid: {
      default: null,
    },
    activetab: {
      default: "",
    },
    showleftType: {
      default: 0,
    },
  },
  setup(props) {
    var myChart = null;
    const data = reactive({
      showempty: false,
      isloading: false,
      alldata: [],
      qcM: null,
      resultM: [],
      qcTQI: null,
      resultTQI: [],
      pageindex: 1,
      pagesize: 50000,
    });
    const getQC = () => {
      GetList_TQIDataPerid({ projectID: props.projectid }).then((res) => {
        if (res?.resultM.length) {
          data.resultM = res.resultM;
          data.qcM = res.resultM[0].id;
        } else {
          data.resultM = [];
          data.qcM = null;
        }
        if (res?.resultTQI?.length) {
          data.resultTQI = res.resultTQI;
          data.qcTQI = res.resultTQI[0].id;
        } else {
          data.resultTQI = [];
          data.qcTQI = null;
        }
        getdata();
      });
    };
    const dataform = (alllist) => {
      let xdata = [];
      let jtdata = [];
      let dtdata = [];
      alllist.map((item) => {
        xdata.push(item.mileage);
        if (props.activetab == "左高低") {
          jtdata.push(item.lprf_M);
          dtdata.push(item.lprf_D);
        } else if (props.activetab == "右高低") {
          jtdata.push(item.rprf_M);
          dtdata.push(item.rprf_D);
        } else if (props.activetab == "左轨向") {
          jtdata.push(item.laln_M);
          dtdata.push(item.laln_D);
        } else if (props.activetab == "右轨向") {
          jtdata.push(item.raln_M);
          dtdata.push(item.raln_D);
        } else if (props.activetab == "轨距") {
          jtdata.push(item.gage_M);
          dtdata.push(item.gage_D);
        } else if (props.activetab == "超高") {
          jtdata.push(item.cant_M);
          dtdata.push(item.cant_D);
        } else if (props.activetab == "水平") {
          jtdata.push(item.xlvl_M);
          dtdata.push(item.xlvl_D);
        } else if (props.activetab == "三角坑") {
          jtdata.push(item.warp_1_M);
          dtdata.push(item.warp_1_D);
        }
      });
      echartFn(xdata, jtdata, dtdata);
    };
    const getdata = () => {
      data.isloading = true;
      data.showempty = false
      if (myChart) {
        myChart.dispose();
        myChart = null;
      }
      if (data.qcM && data.qcTQI) {
        GetList_TQICompare({
          DataGroupId: data.qcM,
          dataPeridId_D: data.qcTQI,
          pageindex: data.pageindex,
          pagesize: data.pagesize,
        }).then((res) => {
          console.log(res);
          //左高低：lprf，右高低：rprf，左轨向：laln，右轨向：raln，轨距：gage，超高：cant，水平：xlvl，三角坑：warp_1
          if (res?.pageList?.length) {
            data.alldata = res.pageList;
            dataform(data.alldata)
          } else {
            data.alldata = [];
            data.showempty = true
          }
          data.isloading = false;

        });
      } else {
        message.info("无对比数据");
        data.isloading = false;
        data.showempty = true
      }
    };
    const echartFn = (xdata, jtdata, dtdata) => {
      if (myChart) {
        myChart.dispose();
        myChart = null;
      }
      document.getElementById("chartbox").removeAttribute("_echarts_instance_");
      let chartDom = document.getElementById("chartbox");
      myChart = echarts.init(chartDom);
      let option = {
        tooltip: {
          trigger: "axis",
          borderColor: "#239aff",
          backgroundColor: "rgba(35,154,255,0.4)",
          borderWidth: 1,
          extraCssText: "box-shadow: none",
          textStyle: {
            color: "#ffffff",
          },
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#fe6d8a",
            },
          },
        },
        legend: {
          data: ["静态", "动态"],
          textStyle: {
            color: "#06fbf4",
          },
          left: "right",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#ffffff",
            },
            splitLine: {
              show: false,
            },
            data: xdata,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位：mm",
            nameTextStyle: {
              color: "#ffffff",
            },
            axisLabel: {
              color: "#709fd9",
              margin: 20,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#163F91"],
                type: "dotted",
              },
            },
          },
        ],
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "静态",
            type: "line",
            lineStyle: {
              width: 2,
              color: "#EF6B3D",
            },
            emphasis: {
              focus: "series",
            },
            data: jtdata,
          },
          {
            name: "动态",
            type: "line",
            lineStyle: {
              width: 2,
              color: "#00ecf2",
            },
            emphasis: {
              focus: "series",
            },
            data: dtdata,
          },
        ],
      };
      option && myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    };
    getQC();
    const onPK = () => {
      getdata()
    }
    watch(
      () => props.activetab,
      () => {
        if (data.alldata?.length) {
          dataform(data.alldata)
        }
      }
    );
    watch(
      () => props.projectid,
      (val) => {
        console.log(val);
        getQC();
      }
    );
    watch(
      () => props.showleftType, 
      () => {
        setTimeout(() => {
          dataform(data.alldata)
        }, 200);
    })
    return {
      ...toRefs(data), onPK
    };
  },
});
</script>
<style lang="scss" scoped>
.contrastbox {
  width: calc(100% - 20px);
  margin-top: 10px;
  color: #ffffff;

  .boxtitle {
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
  }

  .querybox {
    width: 100%;
    align-items: center;
  }

  #chartbox {
    width: 100%;
    height: calc(100vh - 320px);
  }
}
</style>
