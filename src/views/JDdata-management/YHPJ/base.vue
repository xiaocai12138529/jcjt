<template>
  <div class="vertivalNetbox">
    <div class="bottombox flexbox">
      <div class="sectionleft">
        <YearLy @getYearly="getYearly" :projectid="$props.planId" :activetab="activetab"></YearLy>
      </div>
      <div class="sectionright">
        <div class="righttopbox flexbox">
          <div class="rigthradio">
            <el-radio-group v-model="tablemodel" v-if="radiolist">
              <el-radio-button :label="item.name" v-for="item in radiolist" :key="item.id"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="yearLyquery flexbox">
            <div>
              <el-date-picker v-model="staterAndEndTime" type="daterange" start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD" style="margin-right: 10px; width: 240px" @change="getdata"></el-date-picker>
            </div>
            <el-input placeholder="请输入点号关键字" clearable v-model="key" @clear="search" style="margin-right: 10px; width: 200px">
              <template #suffix>
                <el-icon style="cursor: pointer" @click.stop="search">
                  <Search />
                </el-icon>
              </template>
            </el-input>
            <el-button class="dcbtn" @click.stop="handleclick('dcexcel', {})">导出EXCEL</el-button>
            <el-button type="primary" @click.stop="handleclick('add', {})">单个录入</el-button>
            <el-button type="primary" @click.stop="handleclick('pladd', {})">批量录入</el-button>
          </div>
        </div>
        <div class="tablebox">
          <PublickTable :height="tableheight" :tableData="tableData" :columObj="columObj" :pageobj="pageobj" @pagechange="pagechange" @handleedit="handleedit" @handledel="handledel"></PublickTable>
        </div>
      </div>
    </div>
    <PublicDialog ref="AddDialogdom" @addsure="addsure" :title="addtitle" :editData="editData" :formItems="formItems" :activetab="activetab" :labelwidth="labelwidth"></PublicDialog>
    <BachUpload ref="bachupload" :showsurebtn="false" @uploadsuccess="refreshdata" :actionurl="actionurl"></BachUpload>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, watch, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PublickTable from '@/components/publictable/publictable.vue'
import PublicDialog from '@/components/publicmodel/publickmodel.vue'
import BachUpload from '@/components/batchupload/batchupload.vue'
import YearLy from './yearly/index.vue'
import { accountoptions, columData, formItems, apiurls } from './option'
import { cloneDeep } from 'lodash'
import service from '@/api/index'
import { downloadFn } from '@/utils/exportFile'
import storage from '@/utils/storage'
import { dateDelT } from '@/utils/utils'

export default defineComponent({
  name: 'BASEBOX',
  components: { PublickTable, BachUpload, PublicDialog, YearLy },
  props: {
    activetab: {
      default: '',
    },
    planId: {
      default: null,
    },

    showleftType: {
      default: 1,
    },
  },
  setup(props) {
    const AddDialogdom = ref(null) // 表单dom
    const bachupload = ref(null) // 下载dom
    const actionurl = computed(() => data.currentapiurl?.upload + '?ProjectId=' + props.projectid + '&peoplename=' + storage.getStorage('userinfo').realName) // 上传路径

    const data = reactive({
      key: '',
      tableheight: computed(() => (props.showleftType == 3 ? 'calc(100vh - 300px)' : 'calc(100vh - 340px)')),
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
        columData: columData[props.activetab],
      },
      editData: {}, // 编辑数据
      addtitle: '', // 弹窗名字
      formItems: formItems[props.activetab], // 表单
      currentapiurl: apiurls[props.activetab], // 路径
      staterAndEndTime: '', // 时间搜索参数
      labelwidth: computed(() => (props.activetab == '轨道线形检测数据' || props.activetab == '限界/导高/拉出值' ? '180px' : '120px')),
      tablemodel: 'TQI管理值', //第三级名字
      radiolist: computed(() => accountoptions.find((res) => res.name == props.activetab)?.children),
    })

    // 表格分页切换事件
    const pagechange = (page) => {
      data.pageobj.page = page
      getdata()
    }

    // 搜索
    const search = () => {
      data.pageobj.page = 1
      data.pageobj.total = 0
      getdata()
    }
    // 编辑
    const handleedit = (row) => {
      console.log(row)
      data.editData = cloneDeep({ ...row })
      data.addtitle = '编辑' + props.activetab + '成果'
      setTimeout(() => {
        AddDialogdom.value.dialogVisible = true
      }, 200)
    }
    // 添加
    const handleclick = (type) => {
      if (type == 'add') {
        data.editData = {}
        data.addtitle = '新增' + props.activetab + '成果'
        AddDialogdom.value.dialogVisible = true
      } else if (type == 'dcexcel') {
        service
          .download({
            url: data.currentapiurl.dowload,
            params: {
              ProjectId: props.projectid ? props.projectid : -1,
            },
          })
          .then((res) => {
            downloadFn(res, props.activetab)
          })
      } else if (type == 'pladd') {
        bachupload.value.dialogVisible = true
      }
    }

    // 重置
    const refreshdata = () => {
      data.pageobj.page = 1
      data.pageobj.total = 0
      getdata()
    }

    //删除事件
    const handledel = (row) => {
      ElMessageBox.confirm('确认删除此条记录及其数据', '提示', {
        type: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '确认',
      }).then(() => {
        service.post({ url: data.currentapiurl.delurl, params: { id: row.id } }).then(() => {
          ElMessage.success('删除成功')
          getdata()
        })
      })
    }
    // 编辑
    const addsure = (formdata) => {
      if (formdata.workdate && formdata.workdate?.indexOf('T') < 0) {
        formdata.workdate = formdata.workdate + 'T00:00:00.000Z'
      }
      if (formdata.id) {
        service
          .post({
            url: data.currentapiurl.editurl,
            data: {
              ...formdata,
              projectId: props.projectid,
              createPeopleName: storage.getStorage('userinfo').realName,
            },
          })
          .then(() => {
            ElMessage.success('编辑成功')
            AddDialogdom.value.dialogVisible = false
            getdata()
          })
      } else {
        service
          .post({
            url: data.currentapiurl.addurl,
            data: {
              ...formdata,
              createPeopleName: storage.getStorage('userinfo').realName,
              projectId: props.projectid,
            },
          })
          .then(() => {
            ElMessage.success('添加成功')
            AddDialogdom.value.dialogVisible = false
            getdata()
          })
      }
    }

    // 获取数据
    const getdata = () => {
      data.columObj.loading = true
      service
        .get({
          url: data?.currentapiurl?.listurl,
          params: {
            // ProjectId: props.projectid ? props.projectid : -1,
            // renwu: -1 , 预留任务id
            key: data.key ? data.key : '',
            pageindex: data.pageobj.page,
            pagesize: data.pageobj.pagesize,
            StartDate: data.staterAndEndTime ? data.staterAndEndTime[0] : null,
            EndDate: data.staterAndEndTime ? data.staterAndEndTime[1] : null,
          },
        })
        .then((res) => {
          if (res?.pageList.length) {
            res.pageList.map((item) => {
              dateDelT(item)
            })
            data.tableData = res.pageList
            data.pageobj.total = res.allCounts ? res.allCounts : 0
          } else {
            data.tableData = []
            data.pageobj.total = 0
          }
          data.columObj.loading = false
        })
    }
    getdata()
    watch(
      () => [props.activetab, data.tablemodel],
      (val) => {
        if (val[0]) {
          data.key = ''
          data.pageobj.page = 1
          data.pageobj.total = 0
          if (val[0] == '测量TQI') {
            data.columObj.columData = columData[val[1]]
            data.formItems = formItems[val[1]]
            data.currentapiurl = apiurls[val[1]]
          } else {
            data.columObj.columData = columData[val[0]]
            data.formItems = formItems[val[0]]
            data.currentapiurl = apiurls[val[0]]
          }
          getdata()
        }
      }
    )
    const getYearly = (e) => {
      if (e.id) {
        data.DataPeridId = e.id
        data.yearLyname = e.name
        getdata()
      } else {
        data.DataPeridId = null
        data.yearLyname = ''
        data.tableData = []
        data.pageobj.total = 0
        data.columObj.loading = false
      }
    }

    watch(
      () => props.planId,
      () => {
        getdata()
      }
    )

    return { accountoptions, getYearly, getdata, actionurl, addsure, ...toRefs(data), pagechange, AddDialogdom, handleclick, handleedit, handledel, search, bachupload, refreshdata }
  },
})
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
        padding-left: 10px;

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
