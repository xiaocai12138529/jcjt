<template>
    <el-dialog :title="title" v-model="dialogVisible" :close-on-click-modal="false" :show-close="false" :append-to-body="true"
      :destroy-on-close="true" :width="formItems.length>19?1500:formItems.length>8?1000:600" top="100px">
      <el-form ref="dialogforms" :model="formdata" :label-width="labelwidth">
        <el-row>
          <el-col :span="formItems.length>20?6:formItems.length>8?11:23" v-for="(item,itemindex) in formItems" :key="itemindex">
            <el-form-item v-if="item.type=='select'" :label="item.label+'：'" :prop="item.prop" :rules="item.rules">
                <el-select v-model="formdata[item.prop]" clearable :placeholder="item.placeholder||'请选择'">
                    <el-option v-for="(items,idx) in item.optionlist" :key="idx" :label="items.name" :value="items.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="item.type=='date'" :label="item.label+'：'" :prop="item.prop" :rules="item.rules">
                <el-date-picker v-model="formdata[item.prop]" type="date" :placeholder="item.placeholder||'选择日期'" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="item.type=='daterange'" :label="item.label+'：'" :prop="item.prop" :rules="item.rules">
                <el-date-picker v-model="formdata[item.prop]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="item.type=='input'" :label="item.label+'：'" :prop="item.prop" :rules="item.rules">
                <el-input v-model="formdata[item.prop]" :placeholder="item.placeholder||'请输入'"></el-input>
            </el-form-item>
            <el-form-item v-if="item.type=='number'" :label="item.label+'：'" :prop="item.prop" :rules="item.rules">
              <div class="numberinput flexbox">
                <el-input-number v-model="formdata[item.prop]" :placeholder="item.placeholder||'请输入'" style="flex:1" :controls="false"></el-input-number>
                <div class="appendbox" v-if="item.appendname">{{item.appendname}}</div>
              </div>
            </el-form-item>
            <el-form-item v-if="item.type=='textarea'" :label="item.label+'：'" :prop="item.prop">
                <el-input type="textarea" v-model="formdata[item.prop]" :placeholder="item.placeholder||'请输入'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button style="background:#E2E2E2;color:#000000" @click="dialogclick('cancel')">取 消</el-button>
          <el-button style="background:#1890FF;color:#ffffff" @click="dialogclick('sure')">确 定</el-button>
        </span>
      </template>
    </el-dialog>
</template>
  
<script>
  import { defineComponent, ref, watch } from "vue";
  export default defineComponent({
    name: "PublicDialog",
    emits: ["addsure"],
    props: {
        labelwidth:{
          type: String,
          default: "120px"
        },
        activetab:{
            type: String,
            default: "线路表"
        },
        title:{
            type: String,
            default: "数据录入"
        },
        formItems:{
            type: Array,
            default: () =>[]
        },
        editData: {
            type: Object,
            default: () => { }
        }
    },
    setup(props, { emit }) {
      const dialogVisible = ref(false)
      const dialogforms = ref(null)
      const formdata = ref({})
      const refreshFn = () => {
        formdata.value={}
      }
      const dialogclick = (type) => {
        if (type == 'sure') {
          dialogforms.value.validate((res) => {
            if (res) {
                emit("addsure",formdata.value)
            }
          })
        } else {
          dialogVisible.value = false
          refreshFn()
        }
      }
      watch(
        () => props.editData,
        (val) => {
            if (val != {}) {
                formdata.value=props.editData
            } else {
              refreshFn()
            }
        }
      );
  
      return { dialogVisible, formdata, dialogclick, dialogforms }
    }
  })
</script>
  
<style lang="scss" scoped>

</style>
  