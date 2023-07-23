<template>
    <div class="tablebox">
        <el-table :data="tableData" style="width: 100%" height="calc(100vh - 190px)" :border="false">
            <el-table-column label="序号" type="index" :index="indexMethod" align="center"></el-table-column>
            <el-table-column prop="lj" label="IP地址" align="center"></el-table-column>
            <el-table-column prop="ljbh" label="操作系统" align="center"></el-table-column>
            <el-table-column prop="lc" label="浏览器版本" align="center"></el-table-column>
            <el-table-column prop="xm" label="用户" align="center"></el-table-column>
        </el-table>
        <div class="tablepagination flexbox">
            <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="pagesize" :total="total"
                @current-change="pagechange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
    name: 'TableBox',
    components: {},
    props: {
        tableData: {
            type: Array,
            default: () => []
        }
    },
    setup() {
        const pagedata = reactive({
            page: 1,
            pagesize: 50,
            total: 0,
        })
        const pagechange = (page) => {
            pagedata.page = page
        }
        const indexMethod = (index) => {
            return Number(pagedata.page - 1) * pagedata.pagesize + index + 1;
        }
        return { ...toRefs(pagedata), pagechange, indexMethod }
    }
})
</script>

<style lang="scss" scoped>
.tablebox {
    padding:0 14px;

    .tablebtn {
        width: 100%;
        justify-content: center;

        i {
            font-size: 16px;
            margin-left: 16px;
            cursor: pointer;
        }

        i:nth-child(1) {
            margin-left: 0px;
        }

        .delbtn {
            color: #FF4B51;
        }
    }
}

.tablepagination {
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
}</style>
