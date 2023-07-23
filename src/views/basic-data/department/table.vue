<template>
    <div class="tablebox">
        <el-table :data="tableData" style="width: 100%" :border="false" row-key="id"
        :tree-props="{ children: 'childrens' }" default-expand-all :indent="20">
            <el-table-column label="序号" type="index" align="center"></el-table-column>
            <el-table-column prop="name" label="部门名称"></el-table-column>
            <el-table-column prop="duty" label="职责" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column prop="action" label="操作" align="center" width="90">
                <template #default="scope">
                    <div class="tablebtn flexbox">
                        <el-icon style="color:#FCCA00" @click.stop="handleclick('addchild', scope.row)"><Plus /></el-icon>
                        <el-icon style="color:#55ADFF" @click.stop="handleclick('edit', scope.row)"><Edit /></el-icon>
                        <el-icon style="color:#FF4B51" @click.stop="handleclick('del', scope.row)"><Delete /></el-icon>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { defineComponent} from "vue";
export default defineComponent({
    name: 'TableBox',
    emits: ["delBM","editBM","addchild"],
    props: {
        tableData: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }) {
        const handleclick = (type, row) => {
            if (type == 'edit') {
                emit("editBM", row)
            }
            else if (type == 'del') {
                emit('delBM',row);
            }else if(type=="addchild"){
                emit('addchild',row);
            }
        }

        return { handleclick }
    }
})
</script>

<style lang="scss" scoped>
.tablebox {
    padding:0 20px;
    :deep(){
        .el-table{
            height: calc(100vh - 265px);
        }
        .el-table__placeholder {
            display: none;
        }
        .el-icon {
            color: #EFEFEF;
        }
    }
    .tablebtn {
        width: 100%;
        justify-content: center;
        i{
            font-size: 16px;
            margin-left: 16px;
            cursor: pointer;
        }
        i:nth-child(1){
            margin-left: 0px;
        }
    }
}


</style>
