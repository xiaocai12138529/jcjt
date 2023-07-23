<template>
    <div class="pzdmBox">
       <div class="querys">
        <el-row>
            <el-col :span="24">
                <el-select v-model="projectId" placeholder="请选择项目" @change="prochange">
                    <el-option v-for="item in projectlist" :key="item.projectId" :label="item.projectName" :value="item.projectId"></el-option>
                </el-select>
            </el-col>
            <el-col :span="24" style="margin-top:10px">
                <el-select v-model="activeQC" placeholder="请选择期次" @change="tabchange">
                    <el-option v-for="item in QClist" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-col>
        </el-row>
       </div>
       <div class="tabs">
            <el-tabs v-model="activename" @tab-change="tabchange">
                <el-tab-pane label="静态TQI" name="jtTQI"></el-tab-pane>
                <el-tab-pane label="测点拨距" name="cdbj"></el-tab-pane>
                <el-tab-pane label="抬落量" name="tll"></el-tab-pane>
            </el-tabs>
       </div>
       <div class="tablebox">
            <el-table :data="tableData" style="width: 100%" height="calc(60vh - 10px)" :border="false" v-loading="loading" @cell-click="cellclick">
                <el-table-column label="序号" type="index" :index="indexMethod" align="center"></el-table-column>
                <el-table-column prop="mileage" label="里程" align="center"></el-table-column>
                <el-table-column prop="deflectionDistance" label="拨距" align="center" v-if="activename=='cdbj'"></el-table-column>
                <el-table-column prop="fallingValue" label="抬落量" align="center" v-if="activename=='tll'"></el-table-column>
            </el-table>
            <div class="tablepagination flexbox">
                <el-pagination background layout="total,prev,jumper,next" :current-page="page" :page-size="pagesize" :total="total"
                    @current-change="pagechange">
                </el-pagination>
            </div>
       </div>
    </div>
</template>
  
<script>
import { defineComponent, reactive, toRefs } from "vue";
import { GetAllList_ProjectLine,GetAllLis_DataGroup,GetAllLis_Falling,GetAllLis_Distance,GetAllLis_TQIManValue_Static} from "@/api/interface/map"

export default defineComponent({
    name: "PZDMBox",
    components:{},
    emits: ["getpzdm","getrowclick"],
    props: {

    },
    setup(props,{emit}) {
        const data = reactive({
            activename:"jtTQI",
            projectId:null,
            activeproject: {},
            projectlist: [],
            QClist:[],
            activeQC:null,
            tableheight:"calc(60vh - 10px)",
            tableData: [],
            loading: true,
            page: 1,
            pagesize: 20,
            total: 0,
            
        })
        const indexMethod = (index) => {
            return Number(data.page - 1) * data.pagesize + index + 1;
        }
        const pagechange = (page) => {
            data.page = page;
            getdata();
        };
        const getproject = () => {
            GetAllList_ProjectLine().then((res) => {
                if (res?.length) {
                    data.projectlist = res
                    data.projectId=res[res.length-1].projectId
                    data.activeproject = res[res.length-1]
                    getQC()
                } else {
                    data.projectlist = []
                    data.activeproject = {}
                }
            })
        }
        const getQC=()=>{
            GetAllLis_DataGroup({ProjectId:data.projectId}).then((res)=>{
                console.log(res)
                if (res?.length) {
                    data.QClist=res
                    data.activeQC=res[0].id
                    getdata()
                }else{
                    data.QClist=[]
                    data.tableData=[]
                    data.total=0
                }
            })
        }
        const prochange=()=>{
            data.QClist=[]
            data.activeQC=null
            getQC()
        }
        const tabchange=()=>{
            data.page=1
            data.total=0
            data.tableData=[]
            getdata()
        }
        const cellclick=(row)=>{
            emit("getrowclick",row)
        }
        const getdata=()=>{
            data.loading=true
            if(data.activename=='tll'){
                GetAllLis_Falling({DataGroupId:data.activeQC}).then((res)=>{
                    if(res?.length){
                        data.total=res.length
                        if(data.page==1){
                            emit("getpzdm",res)
                        }
                        let leftindex=(data.page-1)*data.pagesize
                        data.tableData=res.splice(leftindex,data.pagesize)
                        
                    }else{
                        data.tableData=[]
                        data.total=0
                    }
                    data.loading=false
                })
            }else if(data.activename=='cdbj'){
                GetAllLis_Distance({DataGroupId:data.activeQC}).then((res)=>{
                    if(res?.length){
                        data.total=res.length
                        if(data.page==1){
                            emit("getpzdm",res)
                        }
                        let leftindex=(data.page-1)*data.pagesize
                        data.tableData=res.splice(leftindex,data.pagesize)
                    }else{
                        data.tableData=[]
                        data.total=0
                    }
                    data.loading=false
                })
            } else if(data.activename=='jtTQI'){
                GetAllLis_TQIManValue_Static({DataGroupId:data.activeQC}).then((res)=>{
                    if(res?.length){
                        data.total=res.length
                        if(data.page==1){
                            emit("getpzdm",res)
                        }
                        let leftindex=(data.page-1)*data.pagesize
                        data.tableData=res.splice(leftindex,data.pagesize)
                    }else{
                        data.tableData=[]
                        data.total=0
                    }
                    data.loading=false
                })
            }
           
        }
        getproject()
        return {
            ...toRefs(data),prochange,pagechange,tabchange,indexMethod,cellclick
        };
    },
});
</script>
  
<style lang="scss" scoped>
.pzdmBox {
    width: 300px;
    background: #08275d;
    .querys{
        padding: 10px;
        padding-bottom: 0;
    }
    .tabs{
        padding:0 10px;
        height: 50px;
    }
    .tablebox{
        padding:0 10px;
        .tablepagination {
            width: 100%;
            height: 50px;
            align-items: center;
            justify-content: center;
        }
        :deep(){
            .el-pagination__jump{
                margin-left: 0;
            }
            .el-pagination__goto,.el-pagination__classifier{
                display: none;
            }
        }
    }
}
</style>
  