<template>
  <div class="publickTable">
    <el-table :data="tableData" style="width: 100%" :height="height" :border="false" @selection-change="selectionChange" v-loading="columObj.loading" :empty-text="columObj.loading ? ' ' : '暂无数据'" element-loading-text="加载中...">
      <el-table-column v-if="columObj.showselection" type="selection" align="center" width="55"></el-table-column>
      <el-table-column v-if="columObj.showindex" label="序号" type="index" :index="indexMethod" align="center"></el-table-column>
      <el-table-column v-for="(item, columindex) in columObj.columData" :key="columindex" :prop="item.prop" :label="item.label" :align="item.align || 'center'" :width="item.width || ''">
        <template #default="scope">
          <template v-if="item.prop == 'offDirection'">
            <span v-if="scope.row.offDirection == '0'">无</span>
            <span v-else-if="scope.row.offDirection == 1">左偏</span>
            <span v-else-if="scope.row.offDirection == 2">右偏</span>
          </template>
          <template v-if="item.prop == 'curveType'">
            <span v-if="scope.row.offDirection == 1">直线</span>
            <span v-else-if="scope.row.offDirection == 2">圆</span>
            <span v-else-if="scope.row.offDirection == 3">缓和曲线</span>
          </template>
          <template v-if="item.prop == 'limitItem'">
            <span v-if="scope.row.limitItem == '有'" style="color: rgb(252, 87, 93)">{{ scope.row.limitItem }}</span>
            <span v-else>{{ scope.row.limitItem }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column v-if="columObj.showaction" prop="action" label="操作" align="center" :fixed="columObj.actionfixed || false" :width="columObj.actionwidth || '90px'">
        <template #default="scope">
          <div class="tablebtn flexbox">
            <el-icon @click.stop="handleclick('edit', scope.row)" v-if="!columObj.hideEditAction"><Edit /></el-icon>
            <el-icon class="delbtn" @click.stop="handleclick('del', scope.row)"><Delete /></el-icon>
            <el-icon @click.stop="handleclick('download', scope.row)" v-if="columObj.showloadAction"><Download /></el-icon>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="tablepagination flexbox" v-if="pageobj.total > 0">
      <el-pagination background :layout="pageobj.layouts ? pageobj.layouts : 'total,prev, pager, next'" :current-page="pageobj.page" :page-size="pageobj.pagesize" :total="pageobj.total" @current-change="pagechange" :small="pageobj.issmall"></el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PublickTable',
  emits: ['selectionChange', 'handledel', 'handleedit', 'pagechange', 'handledownload'],
  props: {
    height: {
      type: String,
      default: 'calc(100vh - 350px)',
    },
    pageobj: {
      type: Object,
      default: () => {},
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    columObj: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const indexMethod = (index) => {
      return Number(props.pageobj.page - 1) * props.pageobj.pagesize + index + 1
    }
    const selectionChange = (selections) => {
      emit('selectionChange', selections)
    }
    const pagechange = (page) => {
      emit('pagechange', page)
    }
    const handleclick = (type, row) => {
      if (type == 'edit') {
        emit('handleedit', row)
      } else if (type == 'del') {
        emit('handledel', row)
      } else if (type == 'download') {
        emit('handledownload', row)
      }
    }
    return { indexMethod, selectionChange, pagechange, handleclick }
  },
})
</script>

<style lang="scss" scoped>
:deep() .el-table .cell {
  padding: 0px 0px;
}
.publickTable {
  width: 100%;
  .tablebtn {
    width: 100%;
    justify-content: center;

    i {
      font-size: 16px;
      margin-left: 16px;
      cursor: pointer;
      color: #ffffff;
    }

    i:nth-child(1) {
      margin-left: 0px;
    }

    .delbtn {
      color: #fc575d;
    }
  }
  .tablepagination {
    width: 100%;
    justify-content: center;
    padding: 15px 0;
  }
}
</style>
