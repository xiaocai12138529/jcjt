<template>
    <div class="projectBox">
        <div class="protitlebox flexbox">
            <font-awesome-icon icon="fas fa-outdent" />
            <div class="smtitle">项目列表</div>
            <!-- <span style="margin-left: 8px">当前项目：{{ activeproject?.projectName }}</span> -->
        </div>
        <div class="prolistbox">
            <div class="prolist" v-for="item in projectlist" :key="item.projectId"
                :class="activeproject.projectId == item.projectId ? 'activespan' : ''" @click.stop="proclick(item)">
                <span>{{ item.projectName }}</span>
            </div>
        </div>
        <div class="sliderbox" v-if="pointlist?.length">
            <DragScrollBox ref="dragdom" @lcrow="lcrow" :pointlist="pointlist"></DragScrollBox>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, reactive, toRefs, watch,ref } from "vue";
// import { GetAllList_ProjectLine } from "@/api/interface/map"
import DragScrollBox from "./dragScroll.vue"
export default defineComponent({
    name: "ProjectBox",
    emits: ["getprojectrow", "lcClick"],
    components: {
        DragScrollBox
    },
    props: {
        prolines: {
            default: []
        }
    },
    setup(props, { emit }) {
        const dragdom=ref(null)
        const data = reactive({
            activeproject: {},
            projectlist: [],
            pointlist:[]
        })
        const proclick = (row) => {
            data.activeproject = row
            if (row.listLineData?.length) {
                data.pointlist = row.listLineData
            } else {
                data.pointlist = []
            }
            emit("getprojectrow", data.activeproject)
            if(dragdom.value){
                dragdom.value.activeindex=0
            }
        }
        watch(() => props.prolines, () => {
            if (props.prolines) {
                data.projectlist = props.prolines
                data.activeproject = props.prolines[0]
                data.pointlist= props.prolines[0].listLineData
                emit("getprojectrow", data.activeproject)
            } else {
                data.projectlist = []
                data.pointlist=[]
                data.activeproject = {}
            }
        })
        const lcrow = (row) => {
            emit("lcClick", row)
        }
        return {
            ...toRefs(data), proclick, lcrow,dragdom
        };
    },
});
</script>
  
<style lang="scss" scoped>
.projectBox {
    width: 300px;
    background: #08275d;

    .protitlebox {
        padding: 0 20px;
        height: 50px;
        align-items: center;
        font-size: 16px;
        cursor: pointer;
        color: #ffffff;
        font-weight: 600;
        border-bottom: solid 1px #39527d;
    }

    .prolistbox {
        padding: 0px 20px;
        padding-bottom: 20px;

        .smtitle {
            height: 50px;
            line-height: 50px;
            color: #17becf;
            font-size: 16px;
            border-bottom: solid 1px #39527d;
        }

        .prolist {
            width: 100%;
            height: 40px;
            padding: 0 10px;
            line-height: 40px;
            font-size: 14px;
            color: #ffffff;
            border-bottom: solid 1px #39527d;
            cursor: pointer;
        }

        .activespan {
            background: #115278;
        }
    }

    .sliderbox {
        width: 100%;
        height: 100px;
        position: fixed;
        left: 0px;
        bottom: 10px;
        background: rgba(11, 42, 74, 0.5);
        z-index: 2;
    }
}
</style>
  