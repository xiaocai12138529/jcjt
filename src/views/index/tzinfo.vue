<template>
  <div class="boxdiv">
    <TITLES :title="'台账信息'"></TITLES>
    <div class="boxcon">
      <img
        class="boxconbg"
        src="../../assets/images/bigscreen/lineimg.png"
        alt=""
      />
      <div class="tzbox">
        <div class="tzinfo">
          <div class="tzinfolist flexbox">
            <span>{{ info.dwCount }}个</span><span>铁路局</span>
          </div>
          <div class="tzinfolist flexbox">
            <span>{{ info.lineCount }}个</span><span>线路</span>
          </div>
          <div class="tzinfolist flexbox">
            <span>{{ info.stationCount }}个</span><span>车站</span>
          </div>
          <div class="tzinfolist flexbox">
            <span>{{ info.bridgeCount }}个</span><span>桥梁</span>
          </div>
          <div class="tzinfolist flexbox">
            <span>{{ info.tunnelCount }}个</span><span>隧道</span>
          </div>
        </div>
      </div>
    </div>
    <img
      class="bottomline"
      src="../../assets/images/bigscreen/dibukuangjia.png"
      alt=""
    />
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import TITLES from "./title.vue";
import { Static_Info } from "@/api/interface/account-management";
export default defineComponent({
  name: "TzInfo",
  components: { TITLES },
  setup() {
    const info = reactive({
      dwCount: 0,
      lineCount: 0,
      stationCount: 0,
      bridgeCount: 0,
      tunnelCount: 0,
    });
    const getlist = () => {
      Static_Info().then((res) => {
        if (res) {
          info.dwCount = res.dwCount ? res.dwCount : 0;
          info.lineCount = res.lineCount ? res.lineCount : 0;
          info.stationCount = res.stationCount ? res.stationCount : 0;
          info.bridgeCount = res.bridgeCount ? res.bridgeCount : 0;
          info.tunnelCount = res.tunnelCount ? res.tunnelCount : 0;
        }
      });
    };
    getlist();
    return { info };
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
    .tzbox {
      width: calc(100% - 44px);
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .tzinfo {
        padding-top: 37px;
        .tzinfolist {
          height: 39px;
          justify-content: flex-end;
          font-size: 14px;
          color: #ffffff;
          span:nth-child(2) {
            color: #00e4ef;
            width: 120px;
            text-align: right;
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
