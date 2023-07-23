<template>
  <div class="vertivalNetbox">
    <div class="bottombox flexbox">
      <div class="sectionleft">
        <YearLy @getYearly="getYearly" :activetype="activetype" :activetab="activetab" :linelist="linelist" :projectid="projectid"></YearLy>
      </div>
      <div class="sectionright" v-if="(activetab != '静态TQI超标区段统计') && (activetab != '动态TQI超标区段统计')">
        <div class="righttopbox flexbox">
          <div>
            <div class="righttitle flexbox" v-if="activetab == '平面测点拨距' || activetab == '纵断面测点抬落量'">
              <div class="rigthradio">
                <el-radio-group v-model="tablemodel">
                  <el-radio-button label="列表视图"></el-radio-button>
                  <el-radio-button label="统计视图"></el-radio-button>
                </el-radio-group>
              </div>
              <div class="titlespan">成果{{ tablemodel == "列表视图" ? "列表" : "统计" }}（{{ yearLyname }}）</div>
            </div>
            <div class="righttitle" v-else>
              <div class="titlespan">成果列表（{{ yearLyname }}）<span v-if="activetab == '动态TQI管理值' || activetab == '静态TQI管理值'" style="color:#fcca00;margin-left:20px">超限数：{{ overnum }}个</span></div>
            </div>
          </div>
          <div v-if="tablemodel == '列表视图'">
            <div class="yearLyquery flexbox" v-if="activetab == '优化大机作业文件'">
              <el-input placeholder="请输入点号关键字" clearable v-model="key" @clear="search" style="margin-right: 10px">
                <template #suffix>
                  <el-icon style="cursor: pointer" @click.stop="search">
                    <Search />
                  </el-icon>
                </template>
              </el-input>

              <el-button type="primary" @click.stop="handleclick('addFA', {})" :disabled="!DataGroupId">上传文件</el-button>
            </div>
            <div class="yearLyquery flexbox" v-else>
              <el-select v-model="ishave" clearable placeholder="请选择有无超限" @change="search" v-if="activetab == '静态TQI管理值' || activetab == '动态TQI管理值'" style="margin-right:10px;">
                <el-option label="有" value="有"></el-option>
                <el-option label="无" value="无"></el-option>
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
              <el-button class="dcbtn" @click.stop="handleclick('dcexcel', {})" :disabled="!DataGroupId">导出EXCEL</el-button>
              <el-button type="primary" @click.stop="handleclick('add', {})" :disabled="!DataGroupId">单个录入</el-button>
              <el-button type="primary" @click.stop="handleclick('pladd', {})" :disabled="!DataGroupId">批量录入</el-button>
              <el-button type="primary" danger style="background: #fc575d" @click.stop="handleclick('delall', {})" :disabled="!DataGroupId">批量删除</el-button>
            </div>
          </div>
        </div>
        <div class="tablebox" v-if="activetab == '平面测点拨距' || activetab == '纵断面测点抬落量'">
          <PublickTable v-if="tablemodel == '列表视图'" :height="tableheight" :tableData="tableData" :columObj="columObj" :pageobj="pageobj" @pagechange="pagechange" @handleedit="handleedit" @handledel="handledel" @handledownload="handledownload">
          </PublickTable>
          <StaticBox v-if="tablemodel == '统计视图'" :showleftType="showleftType" :activetab="activetab" :DataGroupId="DataGroupId" :projectid="projectid"></StaticBox>
        </div>
        <div class="tablebox" v-else>
          <PublickTable :height="tableheight" :tableData="tableData" :columObj="columObj" :pageobj="pageobj" @pagechange="pagechange" @handleedit="handleedit" @handledel="handledel" @handledownload="handledownload">
          </PublickTable>
        </div>
      </div>
      <div class="sectionright" v-else>
        <div class="righttopbox flexbox">
          <div class="righttitle">
            <div class="titlespan">超标区段统计（{{ yearLyname }}）</div>
          </div>
        </div>
        <CBSTATIV :showleftType="showleftType" :activetab="activetab" :DataGroupId="DataGroupId" :projectid="projectid">
        </CBSTATIV>
      </div>
    </div>

    <PublicDialog ref="AddDialogdom" @addsure="addsure" :title="addtitle" :editData="editData" :formItems="formItems" :labelwidth="labelwidth" :activetab="activetab"></PublicDialog>
    <BachUpload ref="bachupload" :showsurebtn="false" @uploadsuccess="refreshdata" :actionurl="actionurl"></BachUpload>
    <!-- 添加优化方案的窗口 -->
    <AddFileDialog ref="addFileDom" :uploadaction="FAactionurl" @addfilesure="addfilesure"></AddFileDialog>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, watch, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PublickTable from "@/components/publictable/publictable.vue";
import PublicDialog from "@/components/publicmodel/publickmodel.vue";
import BachUpload from "@/components/batchupload/batchupload.vue";
import AddFileDialog from "@/components/addFile/addFile.vue";
import YearLy from "./yearly/index.vue";
import { columData, formItems, apiurls } from "./options";
import { cloneDeep } from "lodash";
import service from "@/api/index";
import { downloadFn } from "@/utils/exportFile";
import storage from "@/utils/storage";
const baseURL = process.env.VUE_APP_TRACK_URL;
import StaticBox from "./component/staticbox.vue";
import CBSTATIV from "./component/cbstatic.vue";
import { GetList_JtOrDt } from "@/api/interface/section-optimization";
export default defineComponent({
  name: "BASEBOX",
  components: {
    PublickTable,
    PublicDialog,
    YearLy,
    BachUpload,
    AddFileDialog,
    StaticBox,
    CBSTATIV,
  },
  props: {
    projectid: {
      default: null,
    },
    activetype: {
      default: "",
    },
    activetab: {
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
    const addFileDom = ref(null);
    const data = reactive({
      tablemodel: "列表视图",
      FAactionurl: "",
      overnum: 0,
      key: "",
      ishave: null,
      yearLyname: "",
      DataGroupId: null,
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
        hideEditAction: computed(() =>
          props.activetab == "优化大机作业文件" ? true : false
        ),
        showloadAction: computed(() =>
          props.activetab == "优化大机作业文件" ? true : false
        ),
        loading: true,
        showselection: false,
        showindex: true,
        showaction: true,
        columData: columData[props.activetab],
      },
      editData: {},
      addtitle: "",
      formItems: formItems[props.activetab],
      labelwidth: computed(() =>
        props.activetab == "交点法曲线要素"
          ? "160px"
          : props.activetab == "设计坡度"
          ? "180px"
          : "120px"
      ),
      currentapiurl: apiurls[props.activetab],
    });

    const actionurl = computed(
      () =>
        data.currentapiurl.upload +
        "?peopleName=" +
        storage.getStorage("userinfo").realName +
        (props.activetype == "动态TQI管理"
          ? "&DataPeridDynamicTQIId=" + data.DataGroupId
          : "&DataGroupId=" + data.DataGroupId)
    );
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
        let redata = {};
        if (props.activetype == "动态TQI管理") {
          redata = {
            DataPeridDynamicTQIId: data.DataGroupId ? data.DataGroupId : -1,
          };
        } else {
          redata = {
            DataGroupId: data.DataGroupId ? data.DataGroupId : -1,
          };
        }
        service
          .download({
            url: data.currentapiurl.dowload,
            params: redata,
          })
          .then((res) => {
            downloadFn(res, props.activetab);
          });
      } else if (type == "pladd") {
        bachupload.value.dialogVisible = true;
      } else if (type == "addFA") {
        data.FAactionurl = data.currentapiurl.uploadFile;
        addFileDom.value.dialogform.remark = "";
        addFileDom.value.dialogform.fileList = [];
        addFileDom.value.dialogVisible = true;
      } else if (type == "delall") {
        ElMessageBox.confirm("确认删除此期次所有数据", "提示", {
          type: "warning",
          cancelButtonText: "取消",
          confirmButtonText: "确认",
        }).then(() => {
          service
            .post({
              url: data.currentapiurl.delallurl,
              params: { DataGroupId: data.DataGroupId },
            })
            .then(() => {
              ElMessage.success("删除成功");
              getdata();
            });
        });
      }
    };
    const addfilesure = (filedata) => {
      console.log(filedata);
      let files = [];
      if (filedata.fileList?.length) {
        filedata.fileList.map((item) => {
          files.push({
            fileName: item.fileName,
            filePath: item.filePath,
            fileSize: item.fileSize,
            fileType: item.fileType,
            remark: filedata.remark,
            dataGroupId: data.DataGroupId,
          });
        });
      }
      service
        .post({
          url: data.currentapiurl.addurl,
          data: files,
        })
        .then(() => {
          ElMessage.success("添加成功");
          addFileDom.value.dialogVisible = false;
          getdata();
        });
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
    const handledownload = (row) => {
      downloadFn(baseURL + "/" + row.filePath, row.fileName);
    };
    const addsure = (formdata) => {
      if (formdata.id) {
        service
          .post({
            url: data.currentapiurl.editurl,
            data: {
              ...formdata,
              projectId: props.projectid,
              dataGroupId: data.DataGroupId,
              createPeopleName: storage.getStorage("userinfo").realName,
              DataPeridDynamicTQIId: data.DataGroupId,
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
              dataGroupId: data.DataGroupId,
              DataPeridDynamicTQIId: data.DataGroupId,
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
        data.DataGroupId = e.id;
        data.yearLyname = e.name;
        getdata();
      } else {
        data.DataGroupId = null;
        data.yearLyname = "";
        data.tableData = [];
        data.pageobj.total = 0;
        data.columObj.loading = false;
      }
    };
    const getdata = () => {
      if (
        props.activetab == "静态TQI超标区段统计" ||
        props.activetab == "动态TQI超标区段统计"
      ) {
        return;
      } else {
        if (props.projectid && data.DataGroupId) {
          data.columObj.loading = true;
          let paramsdata = {};
          if (props.activetype == "动态TQI管理") {
            paramsdata = {
              ProjectId: props.projectid ? props.projectid : null,
              DataPeridDynamicTQIId: data.DataGroupId ? data.DataGroupId : null,
              LimitItem:
                props.activetab == "静态TQI管理值" ||
                props.activetab == "动态TQI管理值"
                  ? data.ishave
                  : null,
              key: data.key ? data.key : "",
              pageindex: data.pageobj.page,
              pagesize: data.pageobj.pagesize,
            };
          } else {
            paramsdata = {
              ProjectId: props.projectid ? props.projectid : null,
              DataGroupId: data.DataGroupId ? data.DataGroupId : null,
              LimitItem:
                props.activetab == "静态TQI管理值" ||
                props.activetab == "动态TQI管理值"
                  ? data.ishave
                  : null,
              key: data.key ? data.key : "",
              pageindex: data.pageobj.page,
              pagesize: data.pageobj.pagesize,
            };
          }
          service
            .get({
              url: data.currentapiurl.listurl,
              params: paramsdata,
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

          let urls = "";
          if (props.activetab == "静态TQI管理值") {
            urls = "/Api/JcjdMan/XzjlTQICompare/Statistic_StaticMan";
          } else if (props.activetab == "动态TQI管理值") {
            urls = "/Api/JcjdMan/XzjlTQICompare/Statistic_DynamicMan";
          }
          if (urls) {
            GetList_JtOrDt(urls, {
              DataPeridId: props.DataGroupId ? props.DataGroupId : null,
            }).then((res) => {
              if (res?.trueCount) {
                data.overnum = res.trueCount;
              } else {
                data.overnum = 0;
              }
            });
          } else {
            data.overnum = 0;
          }
        } else {
          data.overnum = 0;
          data.tableData = [];
          data.pageobj.total = 0;
          data.columObj.loading = false;
        }
      }
    };
    watch(
      () => props.activetab,
      (val) => {
        if (val) {
          data.overnum = 0;
          data.ishave = null;
          data.tablemodel = "列表视图";
          data.key = "";
          data.pageobj.page = 1;
          data.pageobj.total = 0;
          data.columObj.columData = columData[val];
          data.formItems = formItems[val];
          data.currentapiurl = apiurls[val];
          data.tableData = [];
          data.pageobj.total = 0;
          getdata();
        }
      }
    );
    return {
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
      addFileDom,
      addfilesure,
      handledownload,
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
      flex: 1;

      .righttopbox {
        width: 100%;
        height: 50px;
        background-color: rgba(33, 84, 118, 0.4);
        justify-content: space-between;
        align-items: center;

        .righttitle {
          margin-left: 10px;
          align-items: center;

          .titlespan {
            color: rgba(27, 241, 253, 0.89);
            font-size: 14px;
            margin-left: 10px;
            // max-width: 350px;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
          }
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
        width: 100%;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>
