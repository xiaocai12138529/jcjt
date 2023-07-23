<template>
  <div class="linetabbox">
    <div class="boxlefttitle flexbox" @click.stop="titleclick">
      <font-awesome-icon icon="fas fa-indent" />
      <span style="margin-left: 8px">当前项目</span>
    </div>
    <div class="querybox flexbox">
      <el-select
        v-model="dwtypeid"
        clearable
        placeholder="请选择类型"
        @change="dwtypechange"
      >
        <el-option
          v-for="item in LXlist"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        v-model="querydwid"
        clearable
        placeholder="请选择单位"
        @change="refreshdata"
      >
        <el-option
          v-for="item in querydwlist"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input placeholder="关键字" clearable v-model="key"  @clear="refreshdata">
        <template #suffix
          ><el-icon style="cursor: pointer" @click.stop="refreshdata"
            ><Search /></el-icon
        ></template>
      </el-input>
    </div>
    <div class="xllistbox">
      <div
        v-for="(item, index) in XLlist"
        :key="index"
        :class="
          activeXL == index ? 'xllist flexbox activexllist' : 'xllist flexbox'
        "
        @click.stop="xlclick(index)"
      >
        <span>{{ Number(currentpageXL - 1) * pagesizeXL + index + 1 }}</span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="paginationbox flexbox">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentpageXL"
        :page-size="pagesizeXL"
        :total="totalXL"
        @current-change="currentchangeXL"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import {
  GetTbDwByPage,
  GetTbProjectByPage,
  GetTbDwTypeByPage,
} from "@/api/interface/basic-data";
export default defineComponent({
  name: "LineTab",
  emits: ["linechange","titleclick"],
  props: {},
  setup(props, { emit }) {
    const data = reactive({
      dwtypeid: null,
      LXlist: [],
      querydwid: null,
      querydwlist: [],
      key: "",
      activeXL: 0,
      XLlist: [],
      pagesizeXL: 6,
      currentpageXL: 1,
      totalXL: 10,
    });
    const titleclick=()=>{
      emit("titleclick");
    }
    const currentchangeXL = (page) => {
      data.currentpageXL = page;
      getdata();
    };
    const refreshdata = () => {
      data.currentpageXL = 1;
      data.totalXL = 0;
      getdata();
    };
    const dwtypechange = () => {
      if (!data.dwtypeid) {
        data.querydwlist = [];
        data.querydwid = null;
      }else{
        getdwlist(data.dwtypeid);
      }
      refreshdata();
    };
    const xlclick = (index) => {
      data.activeXL = index;
      emit("linechange", data.XLlist[index]);
    };
    const getdwlist = (dwtypeid) => {
      data.querydwlist = [];
      GetTbDwByPage({
        pageindex: 1,
        pagesize: 1000,
        key: "",
        dwtypeid: dwtypeid ? dwtypeid : null,
      }).then((res) => {
        if (res?.pageList?.length) {
          data.querydwlist = res.pageList;
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
    const getdata = () => {
      GetTbProjectByPage({
        key: data.key,
        dwType: data.dwtypeid ? data.dwtypeid : null,
        dwId: data.querydwid ? data.querydwid : null,
        pageindex: data.currentpageXL,
        pagesize: data.pagesizeXL,
      }).then((res) => {
        if (res.pageList && res.pageList.length) {
          res.pageList.map((item) => {
            if (item.startTime) {
              item.startTime = item.startTime.split("T")[0];
            }
            if (item.startTime) {
              item.endTime = item.endTime.split("T")[0];
            }
          });
          data.XLlist = res.pageList;
          data.totalXL = res.allCounts ? res.allCounts : 0;
          emit("linechange", data.XLlist[0]);
        } else {
          data.totalXL = 0;
          data.XLlist = [];
          emit("linechange", {id:null});
        }
      });
    };
    gettype();
    getdata();
    return {
      ...toRefs(data),
      xlclick,
      currentchangeXL,
      dwtypechange,
      refreshdata,
      titleclick
    };
  },
});
</script>

<style lang="scss" scoped>
.linetabbox {
  width: 100%;
  .boxlefttitle {
    padding: 0 20px;
    height: 50px;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
  }
  .querybox {
    padding: 0 20px;
    flex-direction: column;
  }

  .xllistbox {
    padding: 0 20px;
    margin-top: 20px;

    .xllist {
      height: 50px;
      border-bottom: solid 1px #bbbbbb;
      font-size: 14px;
      line-height: 50px;
      color: #ffffff;
      cursor: pointer;

      span:nth-child(1) {
        width: 39px;
        text-align: center;
      }

      span:nth-child(2) {
        flex: 1;
        margin-left: 20px;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .xllist:nth-child(1) {
      border-top: solid 1px #bbbbbb;
    }

    .activexllist {
      background: rgba(57, 253, 232, 0.2);
    }
  }

  .paginationbox {
    justify-content: center;
    margin-top: 100px;
  }
  :deep().el-select {
    margin-bottom: 12px;
  }
}
</style>
