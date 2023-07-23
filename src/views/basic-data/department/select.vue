<template>
  <div class="linetabbox">
    <div class="boxlefttitle flexbox">
      <el-icon>
        <Fold />
      </el-icon>
      <span style="margin-left:12px">单位列表</span>
    </div>
    <div class="querybox flexbox">
      <el-select v-model="dwtypeid" clearable placeholder="请选择单位类型" @change="clearfn">
        <el-option v-for="item in LXlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input placeholder="关键字" clearable v-model="key" @clear="clearfn">
        <template #suffix><el-icon style="cursor: pointer;" @click.stop="clearfn">
            <Search />
          </el-icon></template>
      </el-input>
    </div>
    <el-scrollbar class="xllistbox">
      <div v-for="(item, index) in unitlist" :key="index"
        :class="activeunit == item.id ? 'xllist flexbox activexllist' : 'xllist flexbox'" @click.stop="xlclick(item)">
        <span>{{ Number(currentpage - 1) * pagesize + index + 1 }}</span>
        <span>{{ item.name }}</span>
      </div>
    </el-scrollbar>
    <div class="paginationbox flexbox">
      <el-pagination background layout="prev, pager, next" :current-page="currentpage" :page-size="pagesize"
        :total="total" @current-change="currentchange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import { GetTbDwByPage, GetTbDwTypeByPage } from "@/api/interface/basic-data"
export default defineComponent({
  name: "UNITLIST",
  emits: ["selectsure"],
  props: {},
  setup(props, { emit }) {
    const data = reactive({
      dwtypeid: null,
      key: "",
      LXlist: [],
      unitlist: [],
      pagesize: 10,
      currentpage: 1,
      total: 0,
      activeunit: null
    })
    const clearfn = () => {
      data.currentpage = 1
      getdata()
    }
    const currentchange = (page) => {
      data.currentpage = page
      getdata()
    }
    const xlclick = (row) => {
      data.activeunit = row.id
      emit("selectsure", row)
    }
    const getdata = () => {

      GetTbDwByPage({ pageindex: data.currentpage, pagesize: data.pagesize, key: data.key, dwtypeid: data.dwtypeid ? data.dwtypeid : null }).then((res) => {
        if (res?.pageList?.length) {
          data.unitlist = res.pageList
          if (data.currentpage == 1) {
            data.activeunit = res.pageList[0].id
            emit("selectsure", res.pageList[0])
          }
        } else {
          data.unitlist = []
          data.total = 0
        }
        data.total = res.allCounts ? res.allCounts : 0
      })
    }
    const gettype = () => {
      GetTbDwTypeByPage({ pageindex: 1, pagesize: 1000 }).then((res) => {
        if (res?.pageList?.length) {
          data.LXlist = res.pageList
        } else {
          data.LXlist = []
        }
      })
    }
    gettype()
    getdata()
    return { ...toRefs(data), xlclick, currentchange, getdata, clearfn }
  }
})
</script>

<style lang="scss" scoped>
.linetabbox {
  width: 320px;

  .boxlefttitle {
    padding: 0 20px;
    height: 50px;
    align-items: center;
    font-size: 18px;
  }

  .querybox {
    padding: 0 20px;
    flex-direction: column;
  }

  .xllistbox {
    padding: 0 20px;
    margin-top: 20px;
    height: calc(100vh - 400px);

    .xllist {
      height: 50px;
      border-bottom: solid 1px #BBBBBB;
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
      border-top: solid 1px #BBBBBB;
    }

    .activexllist {
      background: rgba(57, 253, 232, 0.2);
    }
  }

  .paginationbox {
    justify-content: center;
    margin-top: 30px;
  }

  :deep().el-select {
    margin-bottom: 12px;
  }
}</style>
