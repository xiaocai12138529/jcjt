<template>
    <div class="contentbox">
        <TableBox :tableData="tableData"></TableBox>
    </div>
</template>

<script>
import { defineComponent, toRefs, reactive } from "vue";
import TableBox from "./table.vue"
export default defineComponent({
    name: 'DailyRecord',
    components: { TableBox },
    setup() {
        const data = reactive({
            tableData: [{
                lj: '2022  第1期',
                ljbh: '2022-08-01 ~ 2022-08-07',
                lc: 'dk23-dk45',
                xm: "dk23-dk45",
                xbh: "王小虎",
                bz: ""
            }, {}, {}, {}, {}, {}, {}, {}, {}],
        })

        return { ...toRefs(data) }
    }
})
</script>
<style lang="scss" scoped>
.contentbox {
    width: calc(100% - 40px);
    height: calc(100% - 70px);
    margin: 0 auto;
    margin-top: 20px;
    box-shadow: 0px 10px 30px 14px rgba(1, 11, 51, 100);
}
</style>
