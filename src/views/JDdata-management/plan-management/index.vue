<template>
  <div class="vertivalNetbox">
    <div class="tabbox flexbox">
      <FormTab :activetab="activetab" :tablist="tablist" @formchange="formchange"></FormTab>
    </div>
    <div class="bottombox flexbox" v-if="activetab == '计划录入'">
      <div class="sectionright">
        <div class="righttopbox flexbox">
          <div class="yearLyname"></div>
          <div class="yearLyquery flexbox">
            <div style="margin-right: 10px">
              <el-cascader :props="propsSelect" placeholder="请选择单位/部门" style="width: 180px" @change="cascaderDW" clearable></el-cascader>
            </div>
            <div>
              <el-select v-model="LineId" default-first-option placeholder="所属线路" clearable style="margin-right: 10px; width: 180px" @change="search">
                <el-option v-for="item in XLlist" :key="item.id" :label="item.name" :value="item.id">{{ item.name }} </el-option>
              </el-select>
            </div>
            <div>
              <el-date-picker v-model="staterAndEndTime" type="daterange" value-format="YYYY-MM-DD" start-placeholder="开始时间" end-placeholder="结束时间" style="margin-right: 10px; width: 240px" @change="timeChange"></el-date-picker>
            </div>
            <div class="flexbox">
              <el-input v-model="Start_M" placeholder="开始里程" style="margin-right: 10px; width: 200px">
                <template #append> 公里 </template>
              </el-input>
              <el-input v-model="End_M" placeholder="结束里程" style="margin-right: 10px; width: 200px">
                <template #append> 公里 </template>
              </el-input>
            </div>
            <el-input placeholder="请输入关键字" clearable v-model="key" @clear="search" style="margin-right: 10px; width: 200px">
              <template #suffix>
                <el-icon style="cursor: pointer" @click.stop="search">
                  <Search />
                </el-icon>
              </template>
            </el-input>
            <!-- 单位(二级联动)   线路  起止里程 起止时间  -->
            <el-button type="primary" @click.stop="handleclick('add', {})">添加计划</el-button>
          </div>
        </div>
        <div class="tablebox">
          <PublickTable :height="tableheight" :tableData="tableData" :columObj="columObj" :pageobj="pageobj" @pagechange="pagechange" @handleedit="handleedit" @handledel="handledel"></PublickTable>
        </div>
      </div>
    </div>

    <PublicDialog ref="AddDialogdom" @addsure="addsure" :title="addtitle" :DWlist="DWlist" :editData="editData" :formItems="formItems" :labelwidth="labelwidth" :activetab="activetab"></PublicDialog>
    <BachUpload ref="bachupload" :showsurebtn="false" @uploadsuccess="refreshdata" :actionurl="actionurl"></BachUpload>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PublickTable from '@/components/publictable/publictable.vue'
import PublicDialog from './add.vue'
import BachUpload from '@/components/batchupload/batchupload.vue'
import { columData, formItems, apiurls, accountoptions } from './options'
import { cloneDeep } from 'lodash'
import service from '@/api/index'
import { downloadFn } from '@/utils/exportFile'
import storage from '@/utils/storage'
import { GetTbDepartChild, GetTbDwByPage, GetTbLineByPage } from '@/api/interface/basic-data'
import FormTab from '@/components/component/formtab'
export default defineComponent({
  name: 'JHGL',
  components: { PublickTable, PublicDialog, BachUpload, FormTab },
  props: {
    projectid: {
      default: null,
    },

    projectname: {
      default: '',
    },
    showleftType: {
      default: 1,
    },
  },
  setup(props) {
    const AddDialogdom = ref(null)
    const bachupload = ref(null)
    const actionurl = computed(() => data.currentapiurl?.upload + '?ProjectId=' + props.projectid + '&peoplename=' + storage.getStorage('userinfo').realName)
    const data = reactive({
      key: '',
      tableheight: computed(() => (props.showleftType == 3 ? 'calc(100vh - 300px)' : 'calc(100vh - 340px)')),
      tableData: [],
      pageobj: {
        page: 1,
        pagesize: 20,
        total: 0,
      },
      columObj: {
        loading: true,
        showselection: false,
        showindex: true,
        showaction: true,
        columData: columData,
      },
      tablist: accountoptions,
      activetab: accountoptions[0].name,
      editData: {},
      addtitle: '',
      formItems: formItems,
      labelwidth: computed(() => (props.activetab == '交点法曲线要素' ? '160px' : props.activetab == '设计坡度' ? '180px' : '120px')),
      currentapiurl: apiurls,
      DWlist: [],
      XLlist: [],
      staterAndEndTime: '', // 时间搜索参数
      LineId: null, // 线路ID
      DWid: null, // 单位ID
      Start_M: null, //开始里程
      End_M: null, //结束里程
      DWName: null, // 单位
      DepName: null, // 部门
    })
    const pagechange = (page) => {
      data.pageobj.page = page
      getdata()
    }
    const search = () => {
      data.pageobj.page = 1
      data.pageobj.total = 0
      getdata()
    }
    const handleedit = (row) => {
      data.editData = cloneDeep({ ...row })
      data.addtitle = '编辑' + props.activetab + '计划'
      setTimeout(() => {
        AddDialogdom.value.dialogVisible = true
      }, 200)
    }
    const handleclick = (type) => {
      if (type == 'add') {
        data.editData = {}
        data.addtitle = '新增' + props.activetab + '计划'
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
    const refreshdata = () => {
      data.pageobj.page = 1
      data.pageobj.total = 0
      getdata()
    }
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
    // 添加接口
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
          url: data.currentapiurl.dataurl,
          params: {
            DWName: data.DWName,
            DepName: data.DepName,
            LineId: data.LineId ?? -1,
            Start_M: data.Start_M ?? -1,
            End_M: data.End_M ?? -1,
            StartDate: data.staterAndEndTime ? data.staterAndEndTime[0] : null,
            EndDate: data.staterAndEndTime ? data.staterAndEndTime[1] : null,
            key: data.key ? data.key : '',
            pageindex: data.pageobj.page,
            pagesize: data.pageobj.pagesize,
          },
        })
        .then((res) => {
          if (res?.pageList.length) {
            res.pageList.map((item) => {
              item.createTime ? (item.createTime = item.createTime.split('T')[0]) : ''
              item.endDate ? (item.endDate = item.endDate.split('T')[0]) : ''
              item.startDate ? (item.startDate = item.startDate.split('T')[0]) : ''

              item['time'] = item.startDate + '~' + item.endDate
              item['endStart_M'] = item.start_M + '~' + item.end_M
              item['diydwName'] = item.dwName ? `${item.dwName}(${item.depName ?? ''}) ` : ''
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

    // 获取单位
    const getdwlist = () => {
      data.DWlist = []
      GetTbDwByPage({
        pageindex: 1,
        pagesize: 1000,
        key: '',
      }).then((res) => {
        if (res?.pageList?.length) {
          data.DWlist = res.pageList
          console.log(data.DWlist)
        }
      })
    }

    // 获取线路类型
    const getXLList = () => {
      GetTbLineByPage({
        key: null,
        pageindex: 1,
        pagesize: 999,
      }).then((res) => {
        console.log(res)
        if (res?.pageList.length) {
          data.XLlist = res?.pageList
        }
      })
    }

    getXLList()
    getdwlist()

    //动态获取数据
    const propsSelect = {
      lazy: true,
      checkStrictly: true,
      lazyLoad(node, resolve) {
        const { level, data } = node
        // 一级为单位
        if (level == 0) {
          const nodes = []
          GetTbDwByPage().then((res) => {
            data.DWlist = res.pageList
            res.pageList.map((item) => {
              nodes.push({
                value: item.id + '-' + item.name,
                label: item.name,
                leaf: false,
              })
            })
            resolve(nodes)
          })
        } else if (level == 1) {
          // 二级处理部门
          GetTbDepartChild({ dwid: node.value.split('-')[0] }).then((res) => {
            const nodes = []
            res?.pageList.map((item) => {
              nodes.push({
                value: item.id + '-' + item.name,
                label: item.name,
                leaf: !item?.childrens.length,
                childrens: item?.childrens,
              })
            })

            resolve(nodes)
          })
        } else {
          // N级处理后面的部门
          const nodes = []
          data.childrens.map((item) => {
            nodes.push({
              value: item.id + '-' + item.name,
              label: item.name,
              leaf: !item?.childrens.length,
              childrens: item?.childrens,
            })
          })

          resolve(nodes)
        }
      },
    }

    const cascaderDW = (casVal) => {
      console.log(casVal)
      if (casVal?.length == 1) {
        data.DWName = casVal[0].split('-')[1]
        data.DepName = null
      } else if (casVal?.length > 1) {
        data.DWName = casVal[0].split('-')[1]
        data.DepName = casVal[casVal.length - 1].split('-')[1]
      } else {
        data.DWName = null
        data.DepName = null
      }
      getdata()
    }
    const timeChange = () => {
      getdata()
    }
    const formchange = (row) => {
      data.activetab = row.name
    }
    return { formchange, timeChange, cascaderDW, propsSelect, actionurl, addsure, ...toRefs(data), pagechange, AddDialogdom, handleclick, handleedit, handledel, search, bachupload, refreshdata }
  },
})
</script>
<style lang="scss" scoped>
.vertivalNetbox {
  width: 100%;
  height: calc(100vh - 120px);
  line-height: 20px;
  border-radius: 16px;
  color: rgba(90, 187, 243, 1);
  font-size: 14px;
  box-shadow: 0px 10px 30px 14px rgba(1, 11, 51, 100);
  .tabbox {
    padding-top: 14px;
    padding-left: 22px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }

  .bottombox {
    width: 100%;
    height: calc(100vh - 270px);
    padding-right: 14px;

    .sectionright {
      width: calc(100% - 20px);
      margin-left: 20px;
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
          :deep() .el-input-group__append {
            background: none;
            border: solid 1px #147d9d;
            box-shadow: none;
            padding: 0 10px;
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
      }
    }
  }
}
</style>
