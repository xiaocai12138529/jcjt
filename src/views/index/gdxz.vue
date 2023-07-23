<template>
  <div class="boxdiv">
    <TITLES :title="'轨道现状检测'"></TITLES>
    <div class="boxcon">
      <div class="gdxzbox">
        <div class="gdxzrow flexbox">
          <div class="gdjclist ml22">
            <img
              class="gdjclistbg"
              src="../../assets/images/bigscreen/gdjcbg.png"
              alt=""
            />
            <div class="gdjcname">铁路局</div>
            <div class="gdjcnum">{{gdinfo.dwCount}}个</div>
          </div>
          <div class="gdjclist mr25">
            <img
              class="gdjclistbg"
              src="../../assets/images/bigscreen/gdjcbg.png"
              alt=""
            />
            <div class="gdjcname">线路</div>
            <div class="gdjcnum">{{gdinfo.lineCount}}个</div>
          </div>
        </div>
        <div class="gdxzrow flexbox">
          <div class="gdjclist ml22">
            <img
              class="gdjclistbg"
              src="../../assets/images/bigscreen/gdjcbg.png"
              alt=""
            />
            <div class="gdjcname">期次</div>
            <div class="gdjcnum">{{gdinfo.qcCount}}次</div>
          </div>
          <div class="gdjclist mr25">
            <img
              class="gdjclistbg"
              src="../../assets/images/bigscreen/gdjcbg.png"
              alt=""
            />
            <div class="gdjcname">总里程数</div>
            <div class="gdjcnum1">{{gdinfo.sumMileage?Number(gdinfo.sumMileage/10000).toFixed(2):""}}万公里</div>
          </div>
        </div>
      </div>
    </div>
    <img
      class="bottomline"
      src="../../assets/images/bigscreen/dibukuangjia.png"
      alt=""
    />
    <TITLES :title="'项目最新动态'"></TITLES>
  </div>
</template>

<script>
import { defineComponent,reactive } from "vue";
import TITLES from "./title.vue";
import {Static_TrackInspet} from "@/api/interface/home"
export default defineComponent({
  name: "GDXZ",
  components: {
    TITLES,
  },
  setup() {
    const gdinfo=reactive({
      dwCount: 0,
      lineCount: 0,
      qcCount: 0,
      sumMileage: 0
    })
    const getlist=()=>{
      Static_TrackInspet().then((res)=>{
        if(res){
          gdinfo.dwCount=res.dwCount?res.dwCount:0
          gdinfo.lineCount=res.lineCount?res.lineCount:0
          gdinfo.qcCount=res.qcCount?res.qcCount:0
          gdinfo.sumMileage=res.sumMileage?Number(res.sumMileage).toFixed(2):0
        }
      })
    }
    getlist()
    return {gdinfo};
  },
});
</script>
<style lang="scss" scoped>
.boxdiv {
  width: 100%;

  .boxcon {
    width: 100%;
    margin-top: 15px;
    background: rgba(11, 42, 74, 0.5);
    height: 250px;
    position: relative;
    .boxconbg {
      width: 396px;
      height: 162px;
      position: absolute;
      top: 56px;
      left: 26px;
      z-index: 1;
    }
    .gdxzbox {
      width: 100%;
      height: 100%;
      .gdxzrow {
        width: 100%;
        justify-content: space-between;
        padding-top: 20px;
        .gdjclist {
          width: 180px;
          height: 84px;
          position: relative;
          .gdjclistbg {
            height: 84px;
            display: block;
          }
          .gdjcname {
            height: 26px;
            line-height: 26px;
            color: #f3ce3a;
            font-size: 14px;
            position: absolute;
            top: 0;
            left: 102px;
          }
          .gdjcnum {
            font-size: 26px;
            color: #ffffff;
            font-weight: 600;
            height: 52px;
            line-height: 52px;
            position: absolute;
            bottom: 0;
            left: 87px;
          }
          .gdjcnum1 {
            font-size: 16px;
            color: #ffffff;
            height: 52px;
            line-height: 52px;
            position: absolute;
            bottom: 0;
            left: 87px;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .bottomline {
    width: 100%;
    margin-top: -22px;
  }
}
</style>
