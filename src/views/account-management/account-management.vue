<template>
  <div id="accountBox" class="flexbox">
    <PublicMenu :menulist="menulist" :activemenu="activemenu" @getmenu="getmenu"></PublicMenu>
    <div class="boxright" v-if="activemenu==1">
      <div class="boxrighttop">
        <TypeTab :typelist="typelist" :activetype="activetype" @typechange="typechange"></TypeTab>
      </div>
      <div class="boxrightbot">
        <div class="tabbox">
          <FormTab :tablist="tablist" :activetab="activetab" @formchange="formchange"></FormTab>
        </div>
        <TABBASE :activetab="activetab"></TABBASE>
      </div>
    </div>
    <div v-else class="boxright">
      <div class="boxrightbot boxrightbot1">
        <div class="tabbox">
          <FormTab :tablist="tablist1" :activetab="activetab1" @formchange="formchange1"></FormTab>
        </div>
        <TABBASE :activetab="activetab1"></TABBASE>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import {accountoptions,tablist1} from "./options";
import PublicMenu from "@/components/publicMenu/publicMenu.vue"
import TypeTab from "@/components/component/typetab";
import FormTab from "@/components/component/formtab";
import TABBASE from "./tabbase.vue";
export default defineComponent({
  name: "account-management",
  components: { PublicMenu,TypeTab, FormTab, TABBASE},
  setup() {
    const data = reactive({
      activemenu:1,
      menulist:[{id:1,name:"铁路设备台账"},{id:2,name:"轨道线形数据台账"}],
      activetype: accountoptions[0].name,
      tableData: [],
      typelist: accountoptions,
      tablist: accountoptions[0].children,
      activetab: accountoptions[0].children[0].name,
      activetab1:tablist1[0].name
    });
    const getmenu=(id)=>{
      data.activemenu=id
      if(id==1){
        data.tablist=accountoptions[0].children
        data.activetype=accountoptions[0].name
        data.activetab=accountoptions[0].children[0].name
      }else{
        data.activetab1=tablist1[0].name
      }
    }
    const linechange = (row) => {
      console.log(row)
    };
    const typechange = (row) => {
      data.activetype=row.name
      accountoptions.map((item) => {
        if (item.name == row.name) {
          if(row.children&&row.children.length){
            data.tablist = row.children;
            data.activetab=row.children[0].name
          }else{
            data.tablist = [];
          }
        }
      });
    };
    const formchange1= (row) => {
      data.activetab1=row.name
    };
    const formchange = (row) => {
      data.activetab=row.name
    };
    return {...toRefs(data),linechange,typechange,formchange,getmenu,tablist1,formchange1};
  },
});
</script>
<style lang="scss" scoped>
#accountBox {
  position: relative;
  width: 100%;
  height: calc(100vh - 20px);
  color: #00ffff;
  z-index: 998;
  .boxright {
    width: calc(100vw - 20px);
    height: 100%;
    margin: 0 auto;
    .boxrighttop {
      width: 100%;
    }
    
    .boxrightbot {
      width: 100%;
      height: calc(100vh - 120px);
      padding-right: 20px;
      line-height: 20px;
      border-radius: 16px;
      color: rgba(90, 187, 243, 1);
      font-size: 14px;
      box-shadow: 0px 10px 30px 14px rgba(1, 11, 51, 100);

      .tabbox {
        padding-left: 22px;
        padding-top: 14px;
      }

      .querybox {
        margin-top: 14px;
        margin-left: 22px;
        height: 66px;
        background: rgba(33, 84, 118, 0.4);
        align-items: center;
        justify-content: space-between;

        .queryleft {
          margin-left: 12px;
          font-size: 14px;
          color: #fcca00;
        }

        .lrbtn {
          button {
            height: 40px;
            background: #1890ff;
            border: none;
            margin-right: 8px;
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
        padding-left: 22px;
        margin-top: 16px;

        .tablebtn {
          width: 100%;
          justify-content: center;

          i {
            font-size: 16px;
            margin-left: 16px;
            cursor: pointer;
          }

          i:nth-child(1) {
            margin-left: 0px;
          }

          .delbtn {
            color: #ff4b51;
          }
        }
        .tablepagination {
          width: 100%;
          justify-content: center;
          margin-top: 62px;
        }
      }
    }
    .boxrightbot1{
      margin-top: 50px;
    }
  }
}
</style>
