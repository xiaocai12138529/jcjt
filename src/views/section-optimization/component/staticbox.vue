<template>
    <div class="staticbox">
        <EmptyBox v-if="showempty"></EmptyBox>
        <div id="chartbox" v-else v-loading="isloading" class="chartboxs" :class="showleftType==3?'showleft':''"></div>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import {
    GetList_XzjlDistanceOrXzjlFalling,
} from "@/api/interface/section-optimization";
import EmptyBox from "@/components/emptybox/emptybox.vue"
import * as echarts from "echarts";
export default defineComponent({
    name: "StaticBox",
    components: {EmptyBox},
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
            showempty:false,
            isloading: false,
            pageindex: 1,
            pagesize: 50000,
        });

        const getdata = () => {
            data.isloading = true;
            data.showempty=false
            let urls=""
            if(props.activetab=="平面测点拨距"){
                urls="/Api/JcjdMan/XzjlStatistics/Statistic_Dis"
            }else if(props.activetab=="纵断面测点抬落量"){
                urls="/Api/JcjdMan/XzjlStatistics/Statistic_Falling"
            }
            GetList_XzjlDistanceOrXzjlFalling(urls,{
                DataGroupId: props.DataGroupId ? props.DataGroupId : null,
            }).then((res) => {
                console.log(res)
                if (res?.length) {
                    let xdata = [];
                    let ydata = [];
                    res?.map((item) => {
                        xdata.push(item.mileage)
                        if(props.activetab=="平面测点拨距"){
                            ydata.push(item.deflectionDistance)
                        }else if(props.activetab=="纵断面测点抬落量"){
                            ydata.push(item.fallingValue)
                        }
                    })
                    echartFn(xdata, ydata)
                }else{
                    if (myChart) {
                        myChart.dispose();
                        myChart = null;
                    }
                    data.showempty=true
                }
                data.isloading = false
            })
        };
        const echartFn = (xdata, ydata) => {
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
                    textStyle: {
                        color: "#06fbf4",
                    },
                    left: "center",
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
                        end: 20,
                    },
                ],
                series: [
                    {
                        name: props.activetab,
                        type: "line",
                        lineStyle: {
                            width: 2,
                            color: "#00ecf2",
                        },
                        emphasis: {
                            focus: "series",
                        },
                        data: ydata,
                    }
                ],
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
        width: calc(100vw - 340px);
        height: calc(100vh - 320px);
    }

    .showleft {
        width: calc(100vw - 720px);
        height: calc(100vh - 320px);
    }
}
</style>
