<template>
  <div class="contentbox">
    <div class="querybox flexbox">
      <div class="queryleft">
        <span v-if="activetab == '线路表'">路局总数：{{ allCounts_Dw }}个</span>
        <span v-else-if="activetab == '车站表'"
          >路局总数：{{ allCounts_Dw }}个，线总数：{{ allCounts_Line }}个</span
        >
        <span v-else>数据成果列表</span>
      </div>
      <div class="lrbtn flexbox">
        <el-select
          v-model="dwName"
          clearable
          placeholder="请选择路局"
          @change="refreshdata"
          v-if="activetab != '线路允许速度' && activetab != '线路里程表'"
        >
          <el-option
            v-for="item in LJlist"
            :key="item.dwName"
            :label="item.dwName"
            :value="item.dwName"
          ></el-option>
        </el-select>
        <el-input
          placeholder="关键字"
          clearable
          v-model="key"
          style="margin: 0 12px"
          @clear="refreshdata"
        >
          <template #suffix
            ><el-icon style="cursor: pointer" @click.stop="refreshdata"
              ><Search /></el-icon
          ></template>
        </el-input>
        <el-button class="dcbtn" @click.stop="handleclick('dcexcel')"
          >导出EXCEL</el-button
        >
        <el-button class="pldelbtn" @click.stop="handleclick('pldel')"
          >批量删除</el-button
        >
        <el-button type="primary" @click.stop="handleclick('add')"
          >单个录入</el-button
        >
        <el-button type="primary" @click.stop="handleclick('pladd')"
          >批量录入</el-button
        >
      </div>
    </div>
    <div class="tablebox">
      <PublickTable
        :height="tableheight"
        :tableData="tableData"
        :columObj="columObj"
        :pageobj="pageobj"
        @selectionChange="selectionChange"
        @pagechange="pagechange"
        @handleedit="handleedit"
        @handledel="handledel"
      ></PublickTable>
    </div>
    <PublicDialog
      ref="AddDialogdom"
      @addsure="addsure"
      :activetab="activetab"
      :editData="editData"
      :formItems="formItems"
      :labelwidth="labelwidth"
    ></PublicDialog>
    <BachUpload
      ref="bachupload"
      :showsurebtn="false"
      @uploadsuccess="refreshdata"
      :actionurl="actionurl"
    ></BachUpload>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, watch, computed } from "vue";
import service from "@/api/index";
import { GetListAll_Dw } from "@/api/interface/account-management";
import { ElMessage, ElMessageBox } from "element-plus";
import PublicDialog from "@/components/publicmodel/publickmodel.vue";
import BachUpload from "@/components/batchupload/batchupload.vue";
import PublickTable from "@/components/publictable/publictable.vue";
import { columData, formItems, apiurls } from "./options";
import storage from "@/utils/storage";
import { downloadFn } from "@/utils/exportFile";
export default defineComponent({
  name: "TABLINE",
  components: { PublicDialog, BachUpload, PublickTable },
  props: {
    activetab: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const AddDialogdom = ref(null);
    const bachupload = ref(null);
    const data = reactive({
      tableheight: "calc(100vh - 310px)",
      dwName: null,
      LJlist: [],
      allCounts_Dw: "",
      allCounts_Line: "",
      pageobj: {
        page: 1,
        pagesize: 50,
        total: 0,
      },
      columObj: {
        loading: true,
        showselection: true,
        showindex: true,
        showaction: true,
        columData: columData[props.activetab],
      },
      selectids: [],
      tableData: [],
      editData: {},
      formItems: formItems[props.activetab],
      labelwidth: computed(() =>
        props.activetab == "公路与铁路并行地段防护设施"
          ? "160px"
          : props.activetab == "线路允许速度" ||
            props.activetab == "线路里程表" ||
            props.activetab == "道口表" ||
            props.activetab == "交点法曲线要素表" ||
            props.activetab == "各线形区段平面偏差统计表" ||
            props.activetab == "设计坡度表"
          ? "180px"
          : props.activetab == "桥涵限高防护架"
          ? "280px"
          : "140px"
      ),
      linename: "",
      key: "",
      currentapiurl: apiurls[props.activetab],
    });
    const actionurl = computed(
      () =>
        data.currentapiurl?.upload +
        "?peopleName=" +
        storage.getStorage("userinfo").realName
    );
    const addsure = (formdata) => {
      if (formdata.id) {
        service
          .post({ url: data.currentapiurl.editurl, data: { ...formdata,editPeopleName:storage.getStorage("userinfo").realName } })
          .then(() => {
            ElMessage.success("编辑成功");
            AddDialogdom.value.dialogVisible = false;
            getdata();
          });
      } else {
        service
          .post({ url: data.currentapiurl.addurl, data: { ...formdata,editPeopleName:storage.getStorage("userinfo").realName } })
          .then(() => {
            ElMessage.success("添加成功");
            AddDialogdom.value.dialogVisible = false;
            refreshdata();
          });
      }
    };
    const pagechange = (page) => {
      data.pageobj.page = page;
      getdata();
    };
    const refreshdata = () => {
      data.pageobj.page = 1;
      data.pageobj.total = 0;
      getdata();
    };
    const handleedit = (row) => {
      data.editData = { ...row };
      AddDialogdom.value.dialogVisible = true;
    };
    const handledel = (row) => {
      ElMessageBox.confirm("确认删除此条记录及其数据", "提示", {
        type: "warning",
        cancelButtonText: "取消",
        confirmButtonText: "确认",
      })
        .then(() => {
          service
            .post({ url: data.currentapiurl.delurl, params: { ids: row.id } })
            .then(() => {
              ElMessage.success("删除成功");
              getdata();
            });
        })
        .catch(() => {});
    };
    const handleclick = (type) => {
      if (type == "add") {
        data.editData = {};
        AddDialogdom.value.dialogVisible = true;
      } else if (type == "pladd") {
        bachupload.value.dialogVisible = true;
      } else if (type == "dcexcel") {
        service
          .download({
            url: data.currentapiurl.dowload,
            params: { linename: data.linename ? data.linename : null },
          })
          .then((res) => {
            // console.log(res)
            downloadFn(res, props.activetab);
          });
      } else if (type == "pldel") {
        if (!data.selectids.length) {
          return ElMessage.error("至少选择一条数据");
        }
        ElMessageBox.confirm("确认删除选中的数据？", "提示", {
          type: "warning",
          cancelButtonText: "取消",
          confirmButtonText: "确认",
        })
          .then(() => {
            let ids = data.selectids.join(",");
            service
              .post({ url: data.currentapiurl.delurl, params: { ids: ids } })
              .then(() => {
                ElMessage.success("删除成功");
                getdata();
              });
          })
          .catch(() => {});
      }
    };
    const selectionChange = (selections) => {
      data.selectids = [];
      selections.map((item) => {
        data.selectids.push(item.id);
      });
    };
    const getdata = () => {
      data.tableData = [];
      data.columObj.loading = true;
      data.selectids = [];
      if (data.currentapiurl) {
        service
          .get({
            url: data.currentapiurl.listurl,
            params: {
              linename: data.linename,
              key: data.key,
              pageindex: data.pageobj.page,
              pagesize: data.pageobj.pagesize,
              dw: data.dwName,
            },
          })
          .then((res) => {
            if (res.pageList && res.pageList.length) {
              res.pageList.map((item) => {
                if (item.editTime) {
                  item.editTime = item.editTime.split("T")[0];
                }
              });
              data.tableData = res.pageList;
              data.pageobj.total = res.allCounts;
            } else {
              data.pageobj.total = 0;
              data.tableData = res.pageList;
            }
            data.allCounts_Dw = res.allCounts_Dw ? res.allCounts_Dw : 0;
            data.allCounts_Line = res.allCounts_Line ? res.allCounts_Line : 0;

            data.columObj.loading = false;
          })
          .catch(() => {
            data.columObj.loading = false;
          });
      } else {
        data.columObj.loading = false;
      }
    };
    const getLJlist = () => {
      GetListAll_Dw().then((res) => {
        if (res?.pageList?.length) {
          data.LJlist = res.pageList;
        } else {
          data.LJlist = [];
        }
      });
    };
    getLJlist();
    getdata();
    watch(
      () => props.activetab,
      (val) => {
        if (val) {
          data.key = "";
          data.dwName = null;
          data.pageobj.page = 1;
          data.pageobj.total = 0;
          data.columObj.columData = columData[val];
          data.formItems = formItems[val];
          data.currentapiurl = apiurls[val];
          getdata();
        }
      }
    );
    return {
      actionurl,
      refreshdata,
      handleedit,
      handledel,
      selectionChange,
      handleclick,
      addsure,
      ...toRefs(data),
      AddDialogdom,
      bachupload,
      pagechange,
      getdata,
    };
  },
});
</script>
<style lang="scss" scoped>
.contentbox {
  width: 100%;
  .querybox {
    margin: 14px 0;
    margin-left: 22px;
    height: 50px;
    background: rgba(33, 84, 118, 0.4);
    align-items: center;
    justify-content: space-between;

    .queryleft {
      margin-left: 12px;
      font-size: 14px;
      color: #fcca00;
    }

    .lrbtn {
      padding-right: 12px;
      align-items: center;
      button {
        height: 32px;
        background: #1890ff;
        border: none;
      }

      .mbbtn {
        background: #d9eaff;
        border: solid 1px #1890ff;
        color: #1890ff;
      }

      .dcbtn {
        background: #f4b84b;
        color: #ffffff;
      }

      .pldelbtn {
        background: #ed7276;
        color: #ffffff;
      }
    }
  }
  .tablebox {
    padding-left: 22px;

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
        color: #ff4b51;
      }
    }
    .tablepagination {
      width: 100%;
      justify-content: center;
      padding: 30px 0;
    }
  }
}
</style>
