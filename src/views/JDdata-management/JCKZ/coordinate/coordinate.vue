<template>
  <div class="coordinatebox">
    <PublickTable :height="tableheight" :tableData="tableData" :columObj="columObj" :pageobj="pageobj" @handleedit="handleedit" @handledel="handledel"></PublickTable>
    <el-dialog :title="addtitle" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false" :append-to-body="true" :destroy-on-close="true" :width="600" top="100px">
      <el-form ref="dialogforms" :model="formdata" label-width="120">
        <el-form-item label="*类型：" prop="typeId">
          <el-select v-model="formdata.typeId" clearable placeholder="请选择" @change="typechange">
            <el-option v-for="item in typelist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*参考椭球：" prop="coordId" v-if="formdata.typeName == '工程独立坐标系'">
          <el-select v-model="formdata.coordId" clearable placeholder="请选择">
            <el-option v-for="item in tqlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中央子午线：" prop="centralMeridianIs">
          <el-input-number v-model="formdata.centralMeridianIs" placeholder="请输入" :controls="false" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="正常高：" prop="normalHeight">
          <el-input-number v-model="formdata.normalHeight" placeholder="请输入" :controls="false" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="投影面大地高：" prop="projectionHeight">
          <el-input-number v-model="formdata.projectionHeight" placeholder="请输入" :controls="false" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="高程异常：" prop="eleveationAnomaly">
          <el-input-number v-model="formdata.eleveationAnomaly" placeholder="请输入" :controls="false" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="偏移(X)：" prop="off_X">
          <el-input-number v-model="formdata.off_X" placeholder="请输入" :controls="false" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="偏移(Y)：" prop="off_Y">
          <el-input-number v-model="formdata.off_Y" placeholder="请输入" :controls="false" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" v-model="formdata.remark" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button style="background: #e2e2e2; color: #000000" @click="dialogclick('cancel')">取 消</el-button>
          <el-button style="background: #1890ff; color: #ffffff" @click="dialogclick('sure')">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PublickTable from '@/components/publictable/publictable.vue'
import { columData } from './options'
import storage from '@/utils/storage'
import { GetList_CoordType, XzjlCoordinateProject, Add_XzjlCoordinateProject, Edit_XzjlCoordinateProject, Del_XzjlCoordinateProject } from '@/api/interface/track'
export default defineComponent({
  name: 'CoordinateBox',
  components: { PublickTable },
  props: {
    projectid: {
      default: null,
    },
  },
  setup(props) {
    const AddDialogdom = ref(null)
    const key = ref('')
    const formdata = reactive({
      name: '',
      typeId: null,
      typeName: '',
      coordId: null,
      centralMeridianIs: '',
      normalHeight: '',
      projectionHeight: '',
      eleveationAnomaly: '',
      off_X: '',
      off_Y: '',
      remark: '',
    })
    const data = reactive({
      tableheight: 'calc(100vh - 300px)',
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
        columData: columData,
      },
      addtitle: '新增坐标系',
      dialogVisible: false,
      typelist: [],
      tqlist: [],
      clicktype: '',
      currentrow: {},
    })
    const pagechange = (page) => {
      data.pageobj.page = page
      getdata()
    }
    const refreshform = () => {
      formdata.name = ''
      formdata.typeId = null
      formdata.typeName = ''
      formdata.coordId = null
      formdata.centralMeridianIs = null
      formdata.normalHeight = null
      formdata.projectionHeight = null
      formdata.eleveationAnomaly = null
      formdata.off_X = null
      formdata.off_Y = null
      formdata.remark = ''
    }
    const handleedit = (row) => {
      data.clicktype = 'edit'
      data.currentrow = row
      formdata.typeId = row.typeId
      formdata.typeName = row.typeName
      formdata.coordId = row.coordId
      formdata.centralMeridianIs = row.centralMeridianIs
      formdata.normalHeight = row.normalHeight
      formdata.projectionHeight = row.projectionHeight
      formdata.eleveationAnomaly = row.eleveationAnomaly
      formdata.off_X = row.off_X
      formdata.off_Y = row.off_Y
      formdata.remark = row.remark
      data.addtitle = '编辑坐标系'
      data.dialogVisible = true
    }
    const addcoordFn = () => {
      data.clicktype = 'add'
      refreshform()
      data.addtitle = '新增坐标系'
      data.dialogVisible = true
    }
    const handledel = (row) => {
      ElMessageBox.confirm('确认删除此条记录及其数据', '提示', {
        type: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '确认',
      }).then(() => {
        Del_XzjlCoordinateProject({ id: row.id }).then(() => {
          ElMessage.success('删除成功')
          getdata()
        })
      })
    }
    const dialogclick = (type) => {
      if (type == 'sure') {
        data.typelist.map((item) => {
          if (item.id == formdata.typeId) {
            formdata.name = item.name
          }
        })
        if (!formdata.typeId) {
          return ElMessage.error('请选择类型')
        }
        if (formdata.typeName == '工程独立坐标系') {
          if (!formdata.coordId) {
            return ElMessage.error('请选择参考椭球')
          }
        } else {
          formdata.coordId = formdata.typeId
        }
        if (data.clicktype == 'edit') {
          Edit_XzjlCoordinateProject({
            ...formdata,
            id: data.currentrow.id,
            projectId: props.projectid,
            createPeopleName: storage.getStorage('userinfo').realName,
          }).then(() => {
            ElMessage.success('编辑成功')
            data.dialogVisible = false
            getdata()
          })
        } else {
          Add_XzjlCoordinateProject({
            ...formdata,
            projectId: props.projectid,
            createPeopleName: storage.getStorage('userinfo').realName,
          }).then(() => {
            ElMessage.success('添加成功')
            data.dialogVisible = false
            getdata()
          })
        }
      } else if (type == 'cancel') {
        data.dialogVisible = false
        refreshform()
      }
    }
    const typechange = () => {
      if (formdata.typeId) {
        data.typelist.map((item) => {
          if (item.id == formdata.typeId) {
            formdata.typeName = item.name
          }
        })
      }
    }
    const getdata = () => {
      if (props.projectid) {
        data.columObj.loading = true
        XzjlCoordinateProject({
          ProjectId: props.projectid,
          key: key.value ? key.value : '',
          pageindex: data.pageobj.page,
          pagesize: data.pageobj.pagesize,
        }).then((res) => {
          if (res?.pageList?.length) {
            data.tableData = res.pageList
          } else {
            data.tableData = []
          }
          data.pageobj.total = res.allCounts ? res.allCounts : 0
          data.columObj.loading = false
        })
      } else {
        data.tableData = []
        data.pageobj.total = 0
        data.columObj.loading = false
      }
    }
    const gettype = () => {
      GetList_CoordType().then((res) => {
        console.log(res)
        if (res.listCoordType?.length) {
          data.typelist = res.listCoordType
        } else {
          data.typelist = []
        }
        if (res.listCoord?.length) {
          data.tqlist = res.listCoord
        } else {
          data.tqlist = []
        }
      })
    }
    gettype()
    onMounted(() => {
      getdata()
    })
    watch(
      () => props.projectid,
      () => {
        getdata()
      }
    )
    return {
      ...toRefs(data),
      typechange,
      pagechange,
      AddDialogdom,
      addcoordFn,
      handleedit,
      handledel,
      getdata,
      formdata,
      dialogclick,
      key,
    }
  },
})
</script>
<style lang="scss" scoped>
.coordinatebox {
  width: calc(100% - 40px);
  margin-top: 20px;
  margin-left: 20px;
}
</style>
