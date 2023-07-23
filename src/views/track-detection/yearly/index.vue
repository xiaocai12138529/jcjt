<template>
  <div class="yearlybox">
    <div class="yeartitle flexbox">
      <div class="titlename">任务</div>
      <div class="titlebtn flexbox">
        <el-icon class="addbtn" @click.stop="yearclick('add', {})">
          <Plus />
        </el-icon>
      </div>
    </div>
    <el-scrollbar class="treebox">
      <a-tree v-if="treeData?.length" :tree-data="treeData" :fieldNames="fieldNames" @select="onSekect" :showLine="true" :blockNode="true" :autoExpandParent="true" v-model:selectedKeys="selectedlist" :defaultExpandAll="true">
        <template #title="{ dataRef, expanded }">
          <div class="treetitle flexbox">
            <div class="titlediv">
              <template v-if="dataRef.level == 1">
                <FolderOpenFilled v-if="expanded" style="color: #ffca03" />
                <FolderFilled v-else style="color: #ffca03" />
              </template>
              <font-awesome-icon v-else icon="fas fa-calendar-alt" />
              <el-tooltip effect="light" :content="dataRef.name" placement="right">
                <span style="padding-left: 4px">{{ dataRef.name }}</span>
              </el-tooltip>
            </div>
            <div class="deleteOutlined flexbox" v-if="dataRef.level != 1">
              <el-icon style="color: #f5f5f5; margin-right: 4px" @click.stop="yearclick('edit', dataRef)">
                <edit />
              </el-icon>
              <delete-outlined style="color: #f5f5f5; margin-right: 4px" @click.stop="yearclick('del', dataRef)" />
            </div>
          </div>
        </template>
      </a-tree>
      <div class="emptybox flexbox" v-if="showloading">
        <a-spin></a-spin>
      </div>
      <div class="emptybox flexbox" v-if="!treeData?.length && !showloading">
        <img src="@/assets/images/empty.png" alt="empty" />
        <span>暂无数据...</span>
      </div>
    </el-scrollbar>
    <AddDialog ref="addDialogdom" @addsure="addsure" :zbxlist="zbxlist" :editData="editData" :linelist="linelist"></AddDialog>
  </div>
</template>
<script>
import { defineComponent, toRefs, reactive, ref, watch, onMounted } from "vue";
import { FolderFilled, FolderOpenFilled } from "@ant-design/icons-vue";
import { XzjlCoordinateProject } from "@/api/interface/track";
import { yearlyApi } from "../options";
import service from "@/api/index";
import AddDialog from "./add.vue";
import storage from "@/utils/storage";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  name: "YearLy",
  components: { AddDialog, FolderFilled, FolderOpenFilled },
  emits: ["getYearly"],
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
  },
  setup(props, { emit }) {
    const addDialogdom = ref(null);
    const showloading = ref(true);
    const data = reactive({
      zbxlist: [],
      fieldNames: { children: "child", title: "name", key: "id" },
      selectedlist: [],
      currentselected: [],
      treeData: [],
      editData: {},
      currentapiurl:
        props.activetype == "轨道检测数据"
          ? yearlyApi["轨道线形检测数据"]
          : yearlyApi["精测网数据"],
    });
    const addsure = (formdata) => {
      if (formdata.startTime && formdata.startTime?.indexOf("T") < 0) {
        formdata.startTime = formdata.startTime + "T00:00:00.000Z";
      }
      if (formdata.endTime && formdata.endTime?.indexOf("T") < 0) {
        formdata.endTime = formdata.endTime + "T00:00:00.000Z";
      }
      if (formdata.id) {
        service
          .post({
            url: data.currentapiurl.editurl,
            data: {
              ...formdata,
              projectId: props.projectid,
              createPeopleName: storage.getStorage("userinfo").realName,
            },
          })
          .then(() => {
            ElMessage.success("编辑成功");
            addDialogdom.value.dialogVisible = false;
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
            },
          })
          .then(() => {
            ElMessage.success("添加成功");
            addDialogdom.value.dialogVisible = false;
            getdata();
          });
      }
    };
    const yearclick = (type, row) => {
      console.log(row);
      if (type == "add") {
        data.editData = {};
        addDialogdom.value.dialogVisible = true;
      } else if (type == "edit") {
        data.editData = row;
        addDialogdom.value.dialogVisible = true;
      } else if (type == "del") {
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
      }
    };
    // 节点点击事件
    const onSekect = (selectedKey, e) => {
      console.log(selectedKey, e);
      if (selectedKey.length && e.node.dataRef.level != 1) {
        data.selectedlist[0] = selectedKey[0];
        data.currentselected[0] = selectedKey[0];
        emit("getYearly", e.node.dataRef);
      } else {
        data.selectedlist[0] = data.currentselected[0];
      }
    };
    const getdata = () => {
      if (props.projectid) {
        showloading.value = true;
        data.treeData = [];
        service
          .get({
            url: data.currentapiurl.listurl,
            params: { ProjectId: props.projectid },
          })
          .then((res) => {
            if (res?.length) {
              res.map((item, index) => {
                item.level = 1;
                item.name = item.year;
                item.id = 0 - index;
                if (item.child?.length) {
                  item.child?.map((item2) => {
                    item2.level = 2;
                    if (item2.child?.length) {
                      item2.child?.map((item3) => {
                        item3.level = 3;
                      });
                    }
                  });
                }
              });
              console.log(res);
              data.treeData = res;
              if (res[0].child?.length) {
                console.log(res[0].child);
                emit("getYearly", res[0].child[0]);
                data.selectedlist[0] = res[0].child[0].id;
                data.currentselected[0] = res[0].child[0].id;
              }
            } else {
              data.treeData = [];
              emit("getYearly", {});
            }
            showloading.value = false;
          });
      } else {
        data.treeData = [];
        showloading.value = false;
        emit("getYearly", {});
      }
    };
    const getzbx = () => {
      XzjlCoordinateProject({
        ProjectId: props.projectid,
        pageindex: 1,
        pagesize: 1000,
      }).then((res) => {
        if (res?.pageList?.length) {
          data.zbxlist = res.pageList;
        } else {
          data.zbxlist = [];
        }
      });
    };
    watch(
      () => props.projectid,
      () => {
        getdata();
        getzbx();
      }
    );
    watch(
      () => props.activetype,
      (val) => {
        if (val) {
          if (val == "精测网数据") {
            data.currentapiurl = yearlyApi[val];
            getdata();
            getzbx();
          }
        }
      }
    );
    watch(
      () => props.activetab,
      (val) => {
        if (val) {
          if (
            val == "轨道线形检测数据" ||
            val == "轨道中心线" ||
            val == "限界/导高/拉出值"
          ) {
            data.currentapiurl = yearlyApi[props.activetab];
            getdata();
            getzbx();
          }
          // else{
          //   if(props.activetype=="精测网数据"){
          //     data.currentapiurl = yearlyApi[props.activetype];
          //     console.log(data.currentapiurl)
          //     getdata();
          //     getzbx();
          //   }
          // }
        }
      }
    );
    onMounted(() => {
      getdata();
      getzbx();
    });
    return {
      ...toRefs(data),
      onSekect,
      addDialogdom,
      yearclick,
      addsure,
      showloading,
    };
  },
});
</script>

<style lang="scss" scoped>
.yearlybox {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(33, 84, 118, 0.65);

  .yeartitle {
    width: 100%;
    height: 49px;
    background: rgba(33, 84, 118, 0.4);
    align-items: center;
    justify-content: space-between;

    .titlename {
      color: rgba(27, 241, 253, 0.89);
      font-size: 16px;
      margin-left: 12px;
    }

    .titlebtn {
      align-items: center;

      i {
        font-size: 20px;
        margin-right: 10px;
      }

      .addbtn {
        color: #ffffff;
        cursor: pointer;
      }

      .delbtn {
        color: #ff4b51;
        margin-right: 18px;
        cursor: pointer;
      }
    }
  }

  .treebox {
    width: 100%;
    height: calc(100% - 67px);
    .treetitle {
      align-items: center;
      .titlediv {
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .deleteOutlined {
      position: absolute;
      right: 3px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .emptybox {
    align-items: center;
    padding-top: 160px;
    flex-direction: column;
    img {
      width: 100px;
    }
    span {
      font-size: 14px;
      color: #0997ff;
      margin-top: 10px;
    }
  }
}
</style>
