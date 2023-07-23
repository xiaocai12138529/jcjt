<template>
    <div v-dragscroll class="list flexbox">
        <div v-for="(item,index) in pointlist" :key="index" class="list-item">
            <div class="listinfo">
                <div class="sliders"><span></span><span @click.stop="lcFn(item,index)" :class="activeindex == index ? 'activespan' : ''"></span></div>
                <div class="slidersname" @click.stop="lcFn(item,index)">{{ item.mileage_K }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
    name: "DragScrollBox",
    emits: ["lcrow"],
    props: {
        pointlist:{
            default:[]
        }
    },
    setup(props,{emit}) {
        const data=reactive({
            activeindex:0
        })
        const lcFn=(row,index)=>{
            console.log(row)
            data.activeindex=index
            emit("lcrow",row)
        }
        return {
            ...toRefs(data),lcFn
        };
    },
});
</script>
  
<style lang="scss" scoped>
.list {
    width: 100%;
    height: 100%;
    overflow: hidden;
    align-items: center;
    color: #ffffff;
    cursor: pointer;

    .listinfo {
        width: 100px;
        height: 50px;

        .sliders {
            width: 100%;
            height: 20px;
            margin-top: 10px;
            position: relative;

            span:nth-child(1) {
                display: block;
                width: 100%;
                height: 10px;
                background: #274d69;
                position: absolute;
                top: 5px;
                left: 0;
            }

            span:nth-child(2) {
                display: block;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                position: absolute;
                background: #60d2d3;
                left: calc(50% - 10px);
                top: 0px;
            }

            .activespan {
                background: #fcca00 !important;
            }
        }

        .slidersname {
            text-align: center;
            margin-top: 6px;
            font-size: 16px;
        }
    }
}</style>
  