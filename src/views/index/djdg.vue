<template>
  <div class="boxdiv">
    <RTITLE :title="'大机捣固作业'"></RTITLE>
    <div class="boxcon">
      <vue3-seamless-scroll
        :list="djdglist"
        class="djdgbox"
        :step="0.5"
        :hover="true"
        :limit-scroll-num="limitnum"
      >
        <div class="djdglistbox">
          <div
            class="listbox flexbox"
            v-for="(item, index) in djdglist"
            :key="item.ID"
          >
            <div class="numbox">
              <span>NO.</span><span>{{ index + 1 }}</span>
            </div>
            <div class="linename">
              <span>{{ item.projectName }}</span>
            </div>
            <div class="kqdate">
              <span>{{ item.workdate?item.workdate:"" }}</span>
            </div>
            <div class="kqnum">
              <span>{{ item.real_M?item.real_M:0}}公里</span>
            </div>
          </div>
        </div>
      </vue3-seamless-scroll>
    </div>
    <img
      class="bottomline"
      src="../../assets/images/bigscreen/dibukuangjia.png"
      alt=""
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import {Static_DeviationMan} from "@/api/interface/home"
import RTITLE from "./rtitle.vue";
export default defineComponent({
  name: "DJDG",
  components: {
    RTITLE,
    Vue3SeamlessScroll,
  },
  setup() {
    const limitnum = ref(6);
    const djdglist = ref([]);
    const getlist=()=>{
      Static_DeviationMan().then((res)=>{
        if(res?.length){
          res.map((item)=>{
            if(item.workdate){
              item.workdate=item.workdate.split("T")[0]
            }
          })
          djdglist.value=res
        }else{
          djdglist.value=[]
        }
      })
    }
    getlist()
    return { djdglist, limitnum };
  },
});
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "BebasNeueCyrillic";
  src: url("~@/assets/typeface/BebasNeueCyrillic.ttf");
}
.boxcon {
  width: 100%;
  margin-top: 15px;
  background: rgba(11, 42, 74, 0.5);
  height: 250px;
  position: relative;
  .djdgbox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .djdglistbox {
      width: 100%;
      .listbox {
        width: 100%;
        height: 30px;
        background: url("../../assets/images/bigscreen/djgdbg4.png");
        background-repeat: no-repeat;
        background-size: cover;
        margin-top: 13px;
        align-items: center;
        font-size: 16px;
        color: #bcf0fe;
        .numbox {
          width: 62px;
          text-align: center;
          margin-left: 7px;
          font-family: BebasNeueCyrillic;
          font-style: italic;
        }
        .linename {
          margin-left: 20px;
        }
        .kqdate {
          padding-left: 27px;
        }
        .kqnum {
          padding-left: 10px;
        }
      }
      .listbox:nth-child(1) {
        background: url("../../assets/images/bigscreen/djgdbg1.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
      .listbox:nth-child(2) {
        background: url("../../assets/images/bigscreen/djgdbg2.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
      .listbox:nth-child(3) {
        background: url("../../assets/images/bigscreen/djgdbg3.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
}
.bottomline {
  width: 100%;
  margin-top: -22px;
}
</style>
