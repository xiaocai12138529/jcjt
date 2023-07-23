<template>
    <div class="staticbox">
        <EmptyBox v-if="showempty"></EmptyBox>
        <div id="chartbox" v-else v-loading="isloading" class="chartboxs" :class="showleftType == 3 ? 'showleft' : ''"></div>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import {
    GetList_JtOrDt,
} from "@/api/interface/section-optimization";
import EmptyBox from "@/components/emptybox/emptybox.vue"
import * as echarts from "echarts";
export default defineComponent({
    name: "StaticBox",
    components: { EmptyBox },
    props: {
        DataGroupId: {
            default: null,
        },
        activetab: {
            default: "",
        },
        projectid: {
            default: null,
        },
        showleftType: {
            default: 1
        }
    },
    setup(props) {
        var myChart = null;
        const data = reactive({
            showempty: false,
            isloading: false,
            pageindex: 1,
            pagesize: 50000,
        });

        const getdata = () => {
            data.isloading = true;
            data.showempty = false
            let urls = ""
            if (props.activetab == "静态TQI管理值") {
                urls = "/Api/JcjdMan/XzjlTQICompare/Statistic_StaticMan"
            } else if (props.activetab == "动态TQI管理值") {
                urls = "/Api/JcjdMan/XzjlTQICompare/Statistic_DynamicMan"
            }
            GetList_JtOrDt(urls, {
                DataPeridId: props.DataGroupId ? props.DataGroupId : null,
            }).then((res) => {
                console.log(res)
                let xdata = [];
                if(res){
                    xdata.push({
                            value: res.trueCount,
                            name: "超限"
                        },{
                            value: res.flaseCount,
                            name: "未超限"
                        })
                        echartFn(xdata)
                }else {
                    if (myChart) {
                        myChart.dispose();
                        myChart = null;
                    }
                    data.showempty = true
                }
                data.isloading = false
            })
        };
        const echartFn = (listdata) => {
            if (myChart) {
                myChart.dispose();
                myChart = null;
            }
            document.getElementById("chartbox").removeAttribute("_echarts_instance_");
            let chartDom = document.getElementById("chartbox");
            myChart = echarts.init(chartDom);
            let option = {
                title: {
                    text: "超限数量统计",
                    left: "center",
                    textStyle:{
                        color:"#ffffff"
                    }
                },
                legend: {
                    y: "bottom",
                    textStyle:{
                        color:"#ffffff"
                    }
                },
                color: ["#4155c6", "#ff7e79", "#fecc53", "#8dc0ff"],
                tooltip: {
                    trigger: "item",
                },
                series: [
                    {
                        name: "超限数量统计",
                        type: "pie", // 设置图表类型为饼图
                        label: {
                            show: true,
                            formatter:"{name|{b}：}{name|{c}个}\n{name|{d}%}",
                            rich:{
                                name:{
                                    fontSize:14,
                                    color:"#ffffff",
                                    lineHeight:20
                                }
                            }
                        },
                        data: listdata
                    }
                ]
            };
            option && myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        };
        onMounted(() => {
            getdata();
            watch(
                () => props.DataGroupId,
                () => {
                    getdata()
                }
            );
        })
        watch(
            () => props.showleftType,
            () => {
                getdata()
            }
        );

        return {
            ...toRefs(data)
        };
    },
});
</script>
<style lang="scss" scoped>
.staticbox {
    width: 100%;
    margin-top: 10px;

    .chartboxs {
        width: calc(50vw);
        height: 500px;
        margin: 0 auto;
        margin-top:40px;
    }

    .showleft {
        width: calc(100vw - 720px);
        height: calc(100vh - 320px);
    }
}
</style>
