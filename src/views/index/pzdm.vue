<template>
  <div class="boxdiv">
    <RTITLE :title="'平纵断面优化'"></RTITLE>
    <div class="boxcon1">
      <vue3-seamless-scroll
        :list="pzdmlist"
        class="pzdmbox"
        :step="0.5"
        :hover="true"
        :limit-scroll-num="limitnum"
      >
        <div class="pzdmboxdiv">
          <div
            class="dtitembox flexbox"
            v-for="item in pzdmlist"
            :key="item.ID"
          >
            <div class="red-dot"></div>
            <div class="newscon">
                <span>{{ item.projectName }}</span>
                <span style="padding-left:10px">{{ item.name }}（{{item.startTime}}-{{item.endTime}}）</span>
                <span>{{ item.real_M?item.real_M:0 }}公里</span>
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
import RTITLE from "./rtitle.vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import {Static_DataGroup} from "@/api/interface/home"
export default defineComponent({
  name: "PZDM",
  components: {
    RTITLE,
    Vue3SeamlessScroll,
  },
  setup() {
    const limitnum = ref(6);
    const pzdmlist = ref([]);
    const getlist=()=>{
      Static_DataGroup().then((res)=>{
        if(res?.length){
          res.map((item)=>{
            if(item.startTime){
              item.startTime=item.startTime.split("T")[0]
            }
            if(item.endTime){
              item.endTime=item.endTime.split("T")[0]
            }
          })
          pzdmlist.value=res
        }else{
          pzdmlist.value=[]
        }
      })
    }
    getlist()
    return { pzdmlist, limitnum };
  },
});
</script>
<style lang="scss" scoped>
.boxdiv {
  width: 100%;

  .boxcon1 {
    width: 100%;
    margin-top: 15px;
    background: rgba(11, 42, 74, 0.5);
    height: 300px;
    .pzdmbox {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .pzdmboxdiv {
        width: 100%;
        .dtitembox {
          width: 100%;
          height: 40px;
          line-height: 40px;
          align-items: center;
          margin-top: 10px;

          .red-dot {
            width: 6px;
            height: 40px;
            background: #3a4e72;
          }

          .newscon {
            // flex: 1;
            max-width: 450px;
            color: #fefefe;
            font-size: 14px;
            margin-left: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
          }
        }

        .dtitembox:nth-child(odd) {
          background: rgba(50, 161, 255, 0.2);
        }

        .dtitembox:nth-child(even) {
          background: rgba(99, 113, 113, 0.3);
        }

        .dtitembox:nth-child(1) {
          .red-dot {
            background: #ee2f4a;
          }
        }

        .dtitembox:nth-child(2) .red-dot {
          background: #f68d05;
        }

        .dtitembox:nth-child(3) .red-dot {
          background: #f6c606;
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
