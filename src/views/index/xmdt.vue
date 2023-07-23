<template>
  <div class="bottombox mt6">
    <div class="bottomcontent">
      <div class="titlebox flexbox">
        <div>线路名称</div><div>单位名称</div><div>现状检测</div
        ><div>平纵断面优化</div><div>大机捣固</div>
      </div>
      <vue3-seamless-scroll
        :list="xmdtlist"
        class="xmdtbox"
        :step="0.5"
        :hover="true"
        :limit-scroll-num="limitnum"
      >
        <div class="pzdmboxdiv">
          <div
            class="dtitembox flexbox"
            v-for="item in xmdtlist"
            :key="item.ID"
          >
            
            <div>{{ item.projectName }}</div>
            <div>{{ item.dwName }}</div>
            <div>
              <span v-if="item.dataPeridInfo?.name">{{ item.dataPeridInfo?.name }}</span>
              <span v-if="item.dataPeridInfo?.startTime">（{{ item.dataPeridInfo?.startTime+"~"+item.dataPeridInfo?.endTime }}）</span>
            </div>
            <div>
              <span v-if="item.dataGroupInfo?.name">{{ item.dataGroupInfo?.name }}</span>
              <span v-if="item.dataGroupInfo?.startTime">（{{ item.dataGroupInfo?.startTime+"~"+item.dataGroupInfo?.endTime }}）</span>
            </div>
            <div>
              <span v-if="item.deviationManInfo?.name">{{ item.deviationManInfo?.name }}</span>
              <span v-if="item.deviationManInfo?.workdate">（{{ item.deviationManInfo?.workdate }}）</span>
            </div>
          </div>
        </div>
      </vue3-seamless-scroll>
    </div>
    <div class="bottomboxline">
      <img src="../../assets/images/bigscreen/bigline.png" alt="" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import {Static_ProjectNews} from "@/api/interface/home"
export default defineComponent({
  name: "XMDT",
  components: { Vue3SeamlessScroll },
  setup() {
    const limitnum = ref(6);
    const xmdtlist = ref([]);
    const getlist=()=>{
      Static_ProjectNews().then((res)=>{
        if(res?.length){
          res.map((item)=>{
            if(item.dataPeridInfo){
              if(item.dataPeridInfo?.startTime){
                item.dataPeridInfo.startTime=item.dataPeridInfo.startTime.split("T")[0]
              }
              if(item.dataPeridInfo?.endTime){
                item.dataPeridInfo.endTime=item.dataPeridInfo.endTime.split("T")[0]
              }
            }
            if(item.dataGroupInfo){
              if(item.dataGroupInfo?.startTime){
                item.dataGroupInfo.startTime=item.dataGroupInfo.startTime.split("T")[0]
              }
              if(item.dataGroupInfo?.endTime){
                item.dataGroupInfo.endTime=item.dataGroupInfo.endTime.split("T")[0]
              }
            }
            if(item.deviationManInfo){
              if(item.deviationManInfo?.workdate){
                item.deviationManInfo.workdate=item.deviationManInfo.workdate.split("T")[0]
              }
            }
          })
          xmdtlist.value=res
        }else{
          xmdtlist.value=[]
        }
      })
    }
    getlist()
    return { xmdtlist, limitnum };
  },
});
</script>
<style lang="scss" scoped>
.bottombox {
  width: 100%;
  height: 280px;
  .bottomcontent {
    width: calc(100vw - 40px);
    height: 260px;
    margin: 0 auto;
    background: rgba(11, 42, 74, 0.5);
    .titlebox {
      width: calc(100% - 40px);
      margin: 0 auto;
      height: 48px;
      align-items: center;
      font-size: 16px;
      color: #45fffd;
      div:nth-child(1) {
        width: 15%;
        margin-left: 28px;
      }
      div:nth-child(2) {
        width: 15%;
      }
      div:nth-child(3) {
        width: 25%;
      }
      div:nth-child(4) {
        width: 30%;
      }
      div:nth-child(5) {
        width: 15%;
      }
    }
    .xmdtbox {
      width: calc(100% - 40px);
      margin: 0 auto;
      height: calc(100% - 48px);
      overflow: hidden;
      .pzdmboxdiv {
        width: 100%;
        .dtitembox {
          align-items: center;
          height: 36px;
          background: #09254f;
          border: solid 1px #15366a;
          font-size: 14px;
          color: #ffffff;
          margin-top: 5px;
          div:nth-child(1) {
            width: 15%;
            margin-left: 28px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          div:nth-child(2) {
            width: 15%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          div:nth-child(3) {
            width: 25%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          div:nth-child(4) {
            width: 30%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          div:nth-child(5) {
            width: 15%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .bottomboxline {
    width: calc(100vw - 40px);
    margin: 0 auto;
    margin-top: -3px;
    img {
      width: 100%;
      height: 10px;
      display: block;
    }
  }
}
</style>
