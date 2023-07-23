<template>
  <el-dialog :title="title" v-model="dialogVisible" :close-on-click-modal="false" :show-close="true" :destroy-on-close="true" width="600" @close="closedialog">
    <div class="selectbox flexbox" v-if="currentRow">
      <div class="selectline">
        <span>{{ currentRow.lineName }}</span>
      </div>
    </div>
    <div class="querybox flexbox">
      <div class="queryleft flexbox">
        <el-input placeholder="请输入关键字" clearable v-model="query.key" style="margin-left:10px" @clear="refreshdata">
          <template #suffix>
            <el-icon style="cursor: pointer;" @click.stop="refreshdata">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <div class="tablebox">
      <el-table ref="tabledom" :data="tableData" :border="false" highlight-current-row @current-change="selectionChange" v-loading="columObj.loading" :empty-text="columObj.loading?' ':'暂无数据'" element-loading-text="加载中...">
        <el-table-column type="index" align="center" width="55"></el-table-column>
        <el-table-column v-for="(item, columindex) in columObj.columData" :key="columindex" :prop="item.prop" :label="item.label" :align="item.align || 'center'"></el-table-column>
      </el-table>
      <div class="tablepagination flexbox" v-if="pageobj.total>0">
        <el-pagination background layout="prev, pager, next" :current-page="pageobj.page" :page-size="pageobj.pagesize" :total="pageobj.total" @current-change="pagechange"></el-pagination>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button style="background:#E2E2E2;color:#000000" @click="dialogclick('cancel')">取 消</el-button>
        <el-button style="background:#1890FF;color:#ffffff" @click="dialogclick('sure')">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
  <script>
import { defineComponent, ref, toRefs, reactive, watch, computed } from "vue";
import { GetTbLineByPage } from "@/api/interface/basic-data";
export default defineComponent({
  name: "SelectLine",
  emits: ["closeselect", "returnline", "update:isVisible"],
  props: {
    title: {
      type: String,
      default: "选择关联线路",
    },
    lineId: {
      type: Number || null,
      default: () => null,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // 弹窗显示隐藏
    const dialogVisible = computed({
      get: () => props.isVisible,
      set: () => emit("update:isVisible"),
    });
    const currentRow = ref();
    const tabledom = ref(null);
    const data = reactive({
      tableheight: "400px",
      query: {
        key: "",
        DW: null,
      },
      pageobj: {
        page: 1,
        pagesize: 10,
        total: 0,
      },
      columObj: {
        loading: true,
        showselection: true,
        showindex: false,
        showaction: false,
        columData: [{ prop: "name", label: "线路名称", align: "left" }],
      },
      tableData: [],
      editData: {},
    });
    const refreshdata = () => {
      data.pageobj.page = 1;
      data.pageobj.total = 0;
      getdata();
    };
    const pagechange = (page) => {
      data.pageobj.page = page;
      getdata();
    };
    const selectionChange = (current) => {
      currentRow.value = current;
    };

    const dialogclick = (type) => {
      if (type == "sure") {
        emit("returnline", currentRow.value);
        dialogVisible.value = false;
      } else {
        dialogVisible.value = false;
      }
    };
    const closedialog = () => {
      emit("closeselect");
    };

    // 获取列表数据
    const getdata = () => {
      data.tableData = [];
      data.columObj.loading = true;
      GetTbLineByPage({
        key: data.query.key,
        pageindex: data.pageobj.page,
        pagesize: data.pageobj.pagesize,
      })
        .then((res) => {
          if (res.pageList && res.pageList.length) {
            res.pageList.map((item) => {
              item.lineName = item.name;
              item.lineId = item.id;
              item.id = null;
            });
            data.tableData = res.pageList;
            data.pageobj.total = res.allCounts;
          } else {
            data.pageobj.total = 0;
            data.tableData = [];
          }
          data.columObj.loading = false;
        })
        .catch(() => {
          data.columObj.loading = false;
        });
    };
    getdata();
    watch(
      () => props.lineId,
      (val) => {
        !props.lineId ??
          (currentRow.value = data.tableData.find((res) => res?.lineId == val));
      }
    );

    return {
      dialogVisible,
      currentRow,
      ...toRefs(data),
      refreshdata,
      pagechange,
      selectionChange,
      tabledom,
      closedialog,
      dialogclick,
    };
  },
});
</script>
  
  <style lang="scss" scoped>
.selectbox {
  width: calc(100% - 36px);
  flex-wrap: wrap;
  margin: 0 auto;
  padding-bottom: 10px;
  border: dashed 1px #1890ff;
  .selectline {
    padding: 0 10px;
    background: #3f5094;
    height: 32px;
    line-height: 32px;
    border-radius: 6px;
    margin-left: 10px;
    margin-top: 10px;
    color: #ffffff;
    font-size: 14px;
    position: relative;
    .delicon {
      position: absolute;
      right: -6px;
      top: -12px;
      cursor: pointer;
    }
  }
}
.querybox {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;

  .queryleft {
    align-items: center;
    margin-left: 10px;
  }

  .queryright {
    align-items: center;
    margin-right: 20px;
  }
}
.tablebox {
  padding: 0 20px;
  margin-top: 16px;
  .tablepagination {
    width: 100%;
    justify-content: center;
    padding: 30px 0;
  }
  :deep() {
    .el-table {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
  