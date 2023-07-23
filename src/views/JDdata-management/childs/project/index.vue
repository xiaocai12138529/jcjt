<template>
  <div class="contentbox">
    <div class="querybox flexbox">
      <div class="queryleft flexbox">
        <el-select
          v-model="dwtypeid"
          clearable
          placeholder="请选择单位类型"
          @change="dwtypechange"
        >
          <el-option
            v-for="item in LXlist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="querydwid" clearable placeholder="请选择所属单位" @change="refreshdata" style="margin:0 10px">
          <el-option
            v-for="item in querydwlist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入关键字"
          clearable
          v-model="key"
          @clear="refreshdata"
        >
          <template #suffix
            ><el-icon style="cursor: pointer" @click.stop="refreshdata">
              <Search /> </el-icon
          ></template>
        </el-input>
      </div>
      <div class="queryright">
        <el-button type="primary" @click.stop="handleclick('add', {})"
          >新增项目</el-button
        >
      </div>
    </div>
    <div class="tablebox">
      <PublickTable
        :height="tableheight"
        :tableData="tableData"
        :columObj="columObj"
        :pageobj="pageobj"
        @pagechange="pagechange"
        @handleedit="handleedit"
        @handledel="handledel"
      ></PublickTable>
    </div>
    <AddDialog
      ref="AddDialogdom"
      :DWlist="DWlist"
      :title="addtitle"
      @addsure="addsure"
      :editData="editData"
    ></AddDialog>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PublickTable from "@/components/publictable/publictable.vue";
import {
  GetTbDwByPage,
  GetTbProjectByPage,
  Del_TbProject,
  Add_TbProject,
  Edit_TbProject,
  GetTbDwTypeByPage,
} from "@/api/interface/basic-data";
import { columData } from "./options";
import AddDialog from "./add.vue";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";
export default defineComponent({
  name: "PROJECT",
  components: { PublickTable, AddDialog },
  setup() {
    const AddDialogdom = ref(null);
    const data = reactive({
      showAddDialog: false,
      clicktype: "",
      selectlist: [],
      tableheight:"calc(100vh - 245px)",
      addtitle: "",
      key: "",
      dwtypeid: null,
      LXlist: [],
      querydwid: null,
      querydwlist: [],
      pageobj: {
        page: 1,
        pagesize: 50,
        total: 0,
      },
      columObj: {
        loading: true,
        showselection: false,
        showindex: true,
        showaction: true,
        columData: columData,
      },
      DWlist: [],
      tableData: [],
      editData: {},
    });
    const pagechange = (page) => {
      data.pageobj.page = page;
      getdata();
    };
    const handleedit = (row) => {
      data.editData = cloneDeep({ ...row });
      data.addtitle = "编辑项目";
      data.clicktype = "edit";
      setTimeout(() => {
        AddDialogdom.value.dialogVisible = true;
      }, 200);
    };
    const handledel = (row) => {
      ElMessageBox.confirm("确认删除此条记录及其数据", "提示", {
        type: "warning",
        cancelButtonText: "取消",
        confirmButtonText: "确认",
      })
        .then(() => {
          Del_TbProject({ id: row.id }).then(() => {
            ElMessage.success("删除成功");
            refreshdata();
          });
        })
        .catch(() => {});
    };
    const refreshdata = () => {
      data.pageobj.page = 1;
      data.pageobj.total = 0;
      getdata();
    };
    const addsure = (formdata) => {
      console.log(formdata);
      if (formdata.startTime) {
        formdata.startTime = dayjs(formdata.startTime).format("YYYY-MM-DD");
        formdata.endTime = dayjs(formdata.endTime).format("YYYY-MM-DD");
      }
      let departmentId=null
      if(formdata.department?.length){
        departmentId=formdata.department[formdata.department.length-1]
      }
      if (formdata.id) {
        let linelist = [];
        formdata.selectlist?.map((item) => {
          linelist.push({
            id: item.id ? item.id : 0,
            LineName: item.lineName,
            projectId: formdata.id,
            lineId: item.lineId,
          });
        });
        let req = {
          id: formdata.id,
          dwId: formdata.dwId,
          departmentId:departmentId,
          name: formdata.name,
          endTime: formdata.endTime ? formdata.endTime : null,
          startTime: formdata.startTime ? formdata.startTime : null,
          remark: formdata.remark ? formdata.remark : null,
          tbProjectLine: linelist,
        };
        Edit_TbProject(req).then(() => {
          ElMessage.success("编辑成功");
          AddDialogdom.value.dialogVisible = false;
          getdata();
        });
      } else {
        let linelist = [];
        formdata.selectlist?.map((item) => {
          linelist.push({
            id: 0,
            LineName: item.lineName,
            lineId: item.lineId,
          });
        });
        let req = {
          dwId: formdata.dwId,
          departmentId:departmentId,
          name: formdata.name,
          endTime: formdata.endTime ? formdata.endTime : null,
          startTime: formdata.startTime ? formdata.startTime : null,
          remark: formdata.remark ? formdata.remark : null,
          tbProjectLine: linelist,
        };
        console.log(req);
        Add_TbProject(req).then(() => {
          ElMessage.success("添加成功");
          AddDialogdom.value.dialogVisible = false;
          refreshdata();
        });
      }
    };
    const handleclick = (type, row) => {
      console.log(row);
      if (type == "add") {
        data.editData = {};
        data.addtitle = "添加项目";
        data.clicktype = "add";
        setTimeout(() => {
          AddDialogdom.value.dialogVisible = true;
        }, 100);
      }
    };
    const dwtypechange = () => {
      getdwlist(data.dwtypeid);
      refreshdata();
    };
    const getdata = () => {
      data.tableData = [];
      data.columObj.loading = true;
      GetTbProjectByPage({
        key: data.key,
        dwType:data.dwtypeid?data.dwtypeid:null,
        dwId:data.querydwid?data.querydwid:null,
        pageindex: data.pageobj.page,
        pagesize: data.pageobj.pagesize,
      })
        .then((res) => {
          if (res.pageList && res.pageList.length) {
            res.pageList.map((item) => {
              if (item.startTime) {
                item.startTime = item.startTime.split("T")[0];
              }
              if (item.startTime) {
                item.endTime = item.endTime.split("T")[0];
              }
            });
            data.tableData = res.pageList;
            data.pageobj.total = res.allCounts ? res.allCounts : 0;
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
    const getdwlist = (dwtypeid) => {
      data.DWlist = [];
      data.querydwlist=[]
      GetTbDwByPage({
        pageindex: 1,
        pagesize: 1000,
        key: "",
        dwtypeid: dwtypeid ? dwtypeid : null,
      }).then((res) => {
        if (res?.pageList?.length) {
            if(!dwtypeid){
                data.DWlist = res.pageList;
            }else{
                data.querydwlist = res.pageList; 
            }
        }
      });
    };
    const gettype = () => {
      GetTbDwTypeByPage({ pageindex: 1, pagesize: 1000 }).then((res) => {
        if (res?.pageList?.length) {
          data.LXlist = res.pageList;
        } else {
          data.LXlist = [];
        }
      });
    };
    getdwlist(null);
    gettype();
    getdata();
    return {
      ...toRefs(data),
      pagechange,
      handleedit,
      handledel,
      refreshdata,
      AddDialogdom,
      addsure,
      handleclick,
      dwtypechange
    };
  },
});
</script>
<style lang="scss" scoped>
.contentbox {
  width: calc(100% - 40px);
  height: calc(100% - 50px);
  margin: 0 auto;
  box-shadow: 0px 10px 30px 14px rgba(1, 11, 51, 100);

  .querybox {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-top: 14px;

    .queryleft {
      align-items: center;
      margin-left: 20px;
    }

    .queryright {
      align-items: center;
      margin-right: 20px;
    }
  }
  .tablebox {
    padding: 0 20px;
    margin-top: 16px;
  }
}
</style>
