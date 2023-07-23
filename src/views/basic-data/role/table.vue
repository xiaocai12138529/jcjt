<template>
  <div class="tablebox">
    <div class="righttop flexbox">
      <div class="righttopleft flexbox">
        <el-icon><Fold /></el-icon>
        <div class="gjfw">
          角色的权限配置<span>{{ JSname }}</span>
        </div>
      </div>
      <div class="righttopright flexbox">
        <el-button type="primary" @click.stop="keepFn" v-if="activejsid"
          >保存</el-button
        >
      </div>
    </div>
    <el-table
      :data="rolelist"
      style="width: 100%"
      :border="false"
      height="calc(100vh - 200px)"
    >
      <el-table-column prop="lj" label="权限类型" width="200">
        <template #default="scope">
          <el-checkbox
            :indeterminate="scope.row.isIndeterminate"
            v-model="scope.row.checkAll"
            @change="handleCheckAllChange(scope.row)"
          >
            {{ scope.row.name }}
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="权限内容">
        <template #default="scope">
          <el-checkbox-group
            v-model="scope.row.checkList"
            @change="checkchange(scope.row)"
          >
            <el-row :gutter="20" type="flex">
              <el-col
                :span="6"
                v-for="item in scope.row.childrens"
                :key="item.key"
              >
                <el-checkbox :label="item.id">{{ item.name }}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { ElMessage } from "element-plus";
// import { cloneDeep } from "lodash";
import {
  GetTbQxListAll,
  GetJsPow,
  UpdateJsPow,
} from "@/api/interface/basic-data";
export default defineComponent({
  name: "TableBox",
  props: {
    JSname: {
      type: String,
      default: "",
    },
    activejsid: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const rolelist = ref(props.tableData);
    const activeRoleList = ref([]);
    const keepFn = () => {
      if (props.activejsid) {
        let arrs = [];
        rolelist.value.map((item) => {
          if (item.checkList?.length) {
            arrs = arrs.concat(item.checkList);
          }
        });
        console.log(arrs);
        let qxids = arrs.join(",");
        UpdateJsPow({ jsid: props.activejsid, qxids: qxids }).then(() => {
          ElMessage.success("保存成功");
          getJsPowlist(props.activejsid);
        });
      } else {
        ElMessage.error("请在左侧列表选择角色");
      }
    };
    const handleCheckAllChange = (row) => {
      console.log(row);
      rolelist.value.map((item) => {
        if (item.id == row.id) {
          if (item.checkAll) {
            item.checkAll = true;
            item.isIndeterminate = false;
            item.checkList = [];
            if (item.childrens?.length) {
              item.childrens.map((i) => {
                item.checkList.push(i.id);
              });
            }
          } else {
            item.checkAll = false;
            item.isIndeterminate = false;
            item.checkList = [];
          }
        }
      });
    };
    const checkchange = (row) => {
      console.log(row);
      rolelist.value.map((item) => {
        if (item.id == row.id) {
          if (item.checkList?.length) {
            if (item.checkList.length == item.childrens?.length) {
              item.checkAll = true;
              item.isIndeterminate = false;
            } else {
              item.checkAll = false;
              item.isIndeterminate = true;
            }
          } else {
            item.checkAll = false;
            item.isIndeterminate = false;
          }
        }
      });
    };
    const getlist = () => {
      GetTbQxListAll().then((res) => {
        console.log(res);
        if (res?.length) {
          if (activeRoleList.value?.length) {
            res.map((item) => {
              item.checkList = [];
              if (item.childrens?.length) {
                item.childrens.map((i) => {
                  activeRoleList.value.map((items) => {
                    if (i.id == items) {
                      item.checkList.push(items);
                    }
                  });
                });
              }
              if (item.checkList.length) {
                if (item.checkList.length == item.childrens?.length) {
                  item.checkAll = true;
                  item.isIndeterminate = false;
                } else {
                  item.checkAll = false;
                  item.isIndeterminate = true;
                }
              } else {
                item.checkAll = false;
                item.isIndeterminate = false;
              }
            });
          }
          rolelist.value = res;
        } else {
          rolelist.value = [];
        }
      });
    };
    const getJsPowlist = (id) => {
      GetJsPow({ jsid: id }).then((res) => {
        console.log(res);
        if (res?.length) {
          activeRoleList.value = res;
        } else {
          activeRoleList.value = [];
        }
        getlist();
      });
    };
    getlist();
    watch(
      () => props.activejsid,
      () => {
        getJsPowlist(props.activejsid);
      }
    );
    return { checkchange, rolelist, handleCheckAllChange, keepFn };
  },
});
</script>

<style lang="scss" scoped>
.tablebox {
  padding: 0 20px;
  color: #39fbfd;
  .righttop {
    align-items: center;
    justify-content: space-between;
    .righttopleft {
      align-items: center;
      height: 50px;
      font-size: 18px;
      .gjfw {
        color: #1bf1fd;
        margin-left: 10px;
        span {
          color: #fcca00;
        }
      }
    }
  }

  :deep() {
    .el-table__header-wrapper th {
      padding-left: 10px !important;
      padding-right: 10px !important;
      border-top: solid 1px #197fc9 !important;
      border-right: solid 1px #197fc9 !important;
      border-bottom: solid 1px #197fc9 !important;
    }
    .el-table__header-wrapper th:nth-child(1) {
      border-left: solid 1px #197fc9 !important;
    }
    .el-table__body-wrapper td {
      padding-left: 10px !important;
      padding-right: 10px !important;
      border-right: solid 1px #197fc9 !important;
      border-bottom: solid 1px #197fc9 !important;
    }
    .el-table__body-wrapper td:nth-child(1) {
      border-left: solid 1px #197fc9 !important;
    }
    is-checked .el-checkbox__inner {
      background: transparent !important;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #39fbfd;
    }
    .el-checkbox-group {
      width: 100%;
    }
    .el-checkbox {
      color: #39fbfd;
    }
  }
}

.tablepagination {
  width: 100%;
  justify-content: center;
  margin-top: 62px;
}
</style>
