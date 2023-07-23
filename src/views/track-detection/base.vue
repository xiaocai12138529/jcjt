<template>
  <div class="vertivalNetbox">
    <div class="bottombox flexbox">
      <div class="sectionleft">
        <YearLy @getYearly="getYearly" :linelist="linelist" :projectid="projectid" :activetype="activetype" :activetab="activetab"></YearLy>
      </div>
      <div class="sectionright">
        <div class="righttopbox flexbox">
          <div class="yearLyname">成果列表（{{ yearLyname }}）</div>
          <div class="yearLyquery flexbox">
            <el-select v-model="type" placeholder="请选择类型" style="margin-right: 10px" v-if="activetab == '轨道线形检测数据'" @change="typechange">
              <el-option label="查看全部属性" :value="-1"></el-option>
              <el-option label="仅看线路中心线属性" :value="1"></el-option>
              <el-option label="仅看左右轨属性" :value="2"></el-option>
            </el-select>

            <div style="margin-right: 10px">
              <el-cascader :props='propsSelect' placeholder="请选择单位/部门" style="width:180px" @change="cascaderDW" clearable></el-cascader>
            </div>
            <div>
              <el-select v-model="LineId" default-first-option placeholder="所属线路" clearable style="margin-right: 10px;width: 180px" @change="search">
                <el-option v-for="item in XLlist" :key="item.id" :label="item.name" :value="item.id">{{ item.name }}
                </el-option>
              </el-select>
            </div>
            <div>
              <el-date-picker v-model='staterAndEndTime' type='daterange' start-placeholder="开始时间" end-placeholder="结束时间" style="margin-right: 10px;width: 240px" @change="timeChange"></el-date-picker>
            </div>

            <el-input placeholder="请输入点号关键字" clearable v-model="key" @clear="search" style="margin-right: 10px">
              <template #suffix>
                <el-icon style="cursor: pointer" @click.stop="search">
                  <Search />
                </el-icon>
              </template>
            </el-input>
            <el-button class="dcbtn" @click.stop="handleclick('dcexcel', {})" :disabled="!DataPeridId">导出EXCEL</el-button>
            <el-button type="primary" @click.stop="handleclick('add', {})" :disabled="!DataPeridId">单个录入</el-button>
            <el-button type="primary" @click.stop="handleclick('pladd', {})" :disabled="!DataPeridId">批量录入</el-button>
            <el-button type="primary" danger style="background:#fc575d" @click.stop="handleclick('delall', {})" :disabled="!DataPeridId">批量删除</el-button>
          </div>
        </div>
        <div class="tablebox">
          <PublickTable :height="tableheight" :tableData="tableData" :columObj="columObj" :pageobj="pageobj" @pagechange="pagechange" @handleedit="handleedit" @handledel="handledel"></PublickTable>
        </div>
      </div>
    </div>

    <PublicDialog ref="AddDialogdom" @addsure="addsure" :title="addtitle" :editData="editData" :formItems="formItems" :labelwidth="labelwidth" :activetab="activetab"></PublicDialog>
    <BachUpload ref="bachupload" :showsurebtn="false" @uploadsuccess="refreshdata" :actionurl="actionurl"></BachUpload>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, watch, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PublickTable from "@/components/publictable/publictable.vue";
import PublicDialog from "@/components/publicmodel/publickmodel.vue";
import BachUpload from "@/components/batchupload/batchupload.vue";
import YearLy from "./yearly/index.vue";
import { columData, formItems, apiurls } from "./options";
import { cloneDeep } from "lodash";
import service from "@/api/index";
import { downloadFn } from "@/utils/exportFile";
import storage from "@/utils/storage";
import { GetTbDepartChild, GetTbDwByPage } from "@/api/interface/basic-data";
export default defineComponent({
  name: "BASEBOX",
  components: { PublickTable, PublicDialog, YearLy, BachUpload },
  props: {
    projectid: {
      default: null,
    },
    activetab: {
      default: "",
    },
    activetype: {
      default: "",
    },
    linelist: {
      default: [],
    },
    showleftType: {
      default: 1,
    },
  },
  setup(props) {
    const AddDialogdom = ref(null);
    const bachupload = ref(null);
    const actionurl = computed(
      () =>
        data.currentapiurl?.upload +
        "?PeopleName=" +
        storage.getStorage("userinfo").realName +
        "&DataPeridId=" +
        data.DataPeridId
    );
    const data = reactive({
      zbline: [],
      key: "",
      type: -1,
      yearLyname: "",
      DataPeridId: null,
      tableheight: computed(() =>
        props.showleftType == 3 ? "calc(100vh - 300px)" : "calc(100vh - 340px)"
      ),
      tableData: [],
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
        columData:
          props.activetab != "轨道线形检测数据"
            ? columData[props.activetab]
            : columData["-1"],
      },
      editData: {},
      addtitle: "",
      formItems: formItems[props.activetab],
      labelwidth: computed(() =>
        props.activetab == "轨道线形检测数据" ||
        props.activetab == "限界/导高/拉出值"
          ? "180px"
          : "120px"
      ),
      currentapiurl: apiurls[props.activetab],
    });
    const typechange = () => {
      if (props.activetab == "轨道线形检测数据") {
        data.columObj.columData = columData[data.type + ""];
      }
      search();
    };
    const pagechange = (page) => {
      data.pageobj.page = page;
      getdata();
    };
    const search = () => {
      data.pageobj.page = 1;
      data.pageobj.total = 0;
      getdata();
    };
    const handleedit = (row) => {
      data.editData = cloneDeep({ ...row });
      data.addtitle = "编辑" + props.activetab + "成果";
      setTimeout(() => {
        AddDialogdom.value.dialogVisible = true;
      }, 200);
    };
    const handleclick = (type) => {
      if (type == "add") {
        data.editData = {};
        data.addtitle = "新增" + props.activetab + "成果";
        AddDialogdom.value.dialogVisible = true;
      } else if (type == "dcexcel") {
        service
          .download({
            url: data.currentapiurl.dowload,
            params: {
              ProjectId: props.projectid ? props.projectid : -1,
              DataPeridId: data.DataPeridId ? data.DataPeridId : -1,
              type: props.activetab == "轨道线形检测数据" ? data.type : null,
            },
          })
          .then((res) => {
            if (props.activetab == "轨道线形检测数据") {
              if (data.type == 1) {
                downloadFn(res, "线路中心线坐标及高程");
              } else if (data.type == 2) {
                downloadFn(res, "轨检仪左右轨数据");
              } else {
                downloadFn(res, props.activetab);
              }
            } else {
              downloadFn(res, props.activetab);
            }
          });
      } else if (type == "pladd") {
        bachupload.value.dialogVisible = true;
      } else if (type == "delall") {
        ElMessageBox.confirm("确认删除此期次所有数据", "提示", {
          type: "warning",
          cancelButtonText: "取消",
          confirmButtonText: "确认",
        }).then(() => {
          service
            .post({
              url: data.currentapiurl.delallurl,
              params: { DataPeridMonitorId: data.DataPeridId },
            })
            .then(() => {
              ElMessage.success("删除成功");
              getdata();
            });
        });
      }
    };
    const refreshdata = () => {
      data.pageobj.page = 1;
      data.pageobj.total = 0;
      getdata();
    };
    const handledel = (row) => {
      ElMessageBox.confirm("确认删除此条记录及其数据", "提示", {
        type: "warning",
        cancelButtonText: "取消",
        confirmButtonText: "确认",
      }).then(() => {
        service
          .post({ url: data.currentapiurl.delurl, params: { id: row.id } })
          .then(() => {
            ElMessage.success("删除成功");
            getdata();
          });
      });
    };
    const addsure = (formdata) => {
      if (formdata.id) {
        service
          .post({
            url: data.currentapiurl.editurl,
            data: {
              ...formdata,
              projectId: props.projectid,
              createPeopleName: storage.getStorage("userinfo").realName,
              DataPeridMonitorId: data.DataPeridId,
            },
          })
          .then(() => {
            ElMessage.success("编辑成功");
            AddDialogdom.value.dialogVisible = false;
            getdata();
          });
      } else {
        service
          .post({
            url: data.currentapiurl.addurl,
            data: {
              ...formdata,
              projectId: props.projectid,
              createPeopleName: storage.getStorage("userinfo").realName,
              DataPeridMonitorId: data.DataPeridId,
            },
          })
          .then(() => {
            ElMessage.success("添加成功");
            AddDialogdom.value.dialogVisible = false;
            getdata();
          });
      }
    };
    const getYearly = (e) => {
      if (e.id) {
        data.DataPeridId = e.id;
        data.yearLyname = e.name;
        getdata();
      } else {
        data.DataPeridId = null;
        data.yearLyname = "";
        data.tableData = [];
        data.pageobj.total = 0;
        data.columObj.loading = false;
      }
    };
    const getdata = () => {
      if (props.projectid && data.DataPeridId) {
        data.columObj.loading = true;
        service
          .get({
            url: data.currentapiurl.listurl,
            params: {
              ProjectId: props.projectid ? props.projectid : null,
              DataPeridMonitorId: data.DataPeridId ? data.DataPeridId : null,
              key: data.key ? data.key : "",
              type: props.activetab == "轨道线形检测数据" ? data.type : null,
              pageindex: data.pageobj.page,
              pagesize: data.pageobj.pagesize,
            },
          })
          .then((res) => {
            if (res?.pageList.length) {
              data.tableData = res.pageList;
              data.pageobj.total = res.allCounts ? res.allCounts : 0;
            } else {
              data.tableData = [];
              data.pageobj.total = 0;
            }
            data.columObj.loading = false;
          });
      } else {
        data.tableData = [];
        data.pageobj.total = 0;
        data.columObj.loading = false;
      }
    };
    watch(
      () => props.activetab,
      (val) => {
        if (val) {
          data.key = "";
          data.pageobj.page = 1;
          data.pageobj.total = 0;
          data.columObj.columData = columData[val];
          data.formItems = formItems[val];
          data.currentapiurl = apiurls[val];
          data.type = -1;
          if (props.activetab == "轨道线形检测数据") {
            data.columObj.columData = columData["-1"];
          }
          if (val != "轨道线形检测数据" && val != "限界/导高/拉出值") {
            getdata();
          }
        }
      }
    );

    //动态获取数据
    const propsSelect = {
      lazy: true,
      checkStrictly: true,
      lazyLoad(node, resolve) {
        const { level, data } = node;
        // 一级为单位
        if (level == 0) {
          const nodes = [];
          GetTbDwByPage().then((res) => {
            data.DWlist = res.pageList;
            res.pageList.map((item) => {
              nodes.push({
                value: item.id + "-" + item.name,
                label: item.name,
                leaf: false,
              });
            });
            resolve(nodes);
          });
        } else if (level == 1) {
          // 二级处理部门
          GetTbDepartChild({ dwid: node.value.split("-")[0] }).then((res) => {
            const nodes = [];
            res?.pageList.map((item) => {
              nodes.push({
                value: item.id + "-" + item.name,
                label: item.name,
                leaf: !item?.childrens.length,
                childrens: item?.childrens,
              });
            });

            resolve(nodes);
          });
        } else {
          // N级处理后面的部门
          const nodes = [];
          data.childrens.map((item) => {
            nodes.push({
              value: item.id + "-" + item.name,
              label: item.name,
              leaf: !item?.childrens.length,
              childrens: item?.childrens,
            });
          });

          resolve(nodes);
        }
      },
    };

    return {
      propsSelect,
      actionurl,
      addsure,
      ...toRefs(data),
      pagechange,
      AddDialogdom,
      handleclick,
      handleedit,
      handledel,
      search,
      getYearly,
      bachupload,
      refreshdata,
      typechange,
    };
  },
});
</script>
<style lang="scss" scoped>
.vertivalNetbox {
  width: calc(100% - 20px);
  margin-top: 14px;
  .bottombox {
    width: 100%;
    height: calc(100vh - 220px);

    .sectionleft {
      width: 280px;
      height: 100%;
      margin-left: 20px;
    }

    .sectionright {
      width: calc(100% - 300px);

      .righttopbox {
        width: 100%;
        height: 50px;
        background-color: rgba(33, 84, 118, 0.4);
        justify-content: space-between;
        align-items: center;

        .yearLyname {
          color: rgba(27, 241, 253, 0.89);
          font-size: 14px;
          margin-left: 20px;
        }

        .yearLyquery {
          align-items: center;
          margin-right: 10px;
          button {
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
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>
