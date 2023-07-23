<template>
  <div id="machineBox" class="flexbox">
    <div class="boxright" :class=" showleftType == 2 ? 'goleftactive' : showleftType == 3 ? 'gorightactive': ''">
      <div class="boxrighttop">
        <TypeTab :activetype="activetype" :typelist="typelist" @typechange="typechange"></TypeTab>
      </div>
      <div class="boxrightbot">
        <div class="tabbox flexbox">
          <FormTab :activetab="activetab" :tablist="tablist" @formchange="formchange"></FormTab>
        </div>

        <BASEBOX :projectid="projectid" :projectname="projectname" :activetab="activetab" :showleftType="showleftType"></BASEBOX>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import TypeTab from "@/components/component/typetab";
import FormTab from "@/components/component/formtab";
import BASEBOX from "./base.vue";
import { accountoptions } from "./options";
export default defineComponent({
  name: "account-management",
  components: { TypeTab, FormTab, BASEBOX },
  setup() {
    const coordinate = ref(null);
    const showleftType = ref(1);
    const data = reactive({
      key: "",
      projectid: null,
      projectname: "",
      addcoordFn: false,
      typelist: accountoptions,
      activetype: accountoptions[0].name,
      tablist: accountoptions[0].children,
      activetab: accountoptions[0].children[0].name,
    });
    const titleclick = () => {
      console.log("dianjile");
      if (showleftType.value == 1) {
        showleftType.value = 3;
      } else if (showleftType.value == 2) {
        showleftType.value = 3;
      } else if (showleftType.value == 3) {
        showleftType.value = 2;
      }
      console.log(showleftType.value);
    };
    const linechange = (row) => {
      data.projectid = row.id;
      data.projectname = row.name;
    };
    const formchange = (row) => {
      data.activetab = row.name;
    };
    const typechange = (row) => {
      data.activetype = row.name;
      accountoptions.map((item) => {
        if (item.name == row.name) {
          if (row.children && row.children.length) {
            data.tablist = row.children;
            data.activetab = row.children[0].name;
          } else {
            data.tablist = [];
          }
        }
      });
    };
    const handleclick = (type) => {
      if (type == "addcoord") {
        coordinate.value.addcoordFn();
      } else if (type == "zmline") {
        coordinate.value.showzmlineFn();
      }
    };
    const search = () => {
      coordinate.value.key = data.key;
      coordinate.value.getdata();
    };

    return {
      handleclick,
      linechange,
      formchange,
      typechange,
      ...toRefs(data),
      coordinate,
      search,
      showleftType,
      titleclick,
    };
  },
});
</script>
<style lang="scss" scoped>
#machineBox {
  position: relative;
  width: 100%;
  height: calc(100% - 7px);
  color: #00ffff;
  z-index: 998;
  .boxlefttitle {
    position: absolute;
    left: 15px;
    padding: 0 20px;
    height: 50px;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    z-index: 2;
    color: #fcca00;
    margin-top: 50px;
  }
  .boxlefttitle:hover {
    color: #75feff;
    text-decoration: underline;
  }
  .boxleft {
    z-index: 2;
    position: absolute;
    left: -315px;
    width: 320px;
    height: 100%;
    line-height: 20px;
    border-radius: 0px 20px 20px 0px;
    box-shadow: 21px 8px 38px 5px rgba(1, 11, 51, 100);
    overflow: hidden;
    margin-top: 50px;
  }
  .fadeOutActive {
    -webkit-animation: fadeout 0.2s;
    animation: fadeout 0.2s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  .fadeInActive {
    -webkit-animation: fadein 0.2s;
    animation: fadein 0.2s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  @-webkit-keyframes fadeout {
    from {
      left: 15px;
    }
    to {
      left: -315px;
    }
  }
  @keyframes fadeout {
    from {
      left: 15px;
    }
    to {
      left: -315px;
    }
  }
  @-webkit-keyframes fadein {
    from {
      left: -315px;
    }
    to {
      left: 15px;
    }
  }
  @keyframes fadein {
    from {
      left: -315px;
    }
    to {
      left: 15px;
    }
  }

  .boxcenter {
    position: absolute;
    left: 335px;
    width: 50px;
    height: 100%;
    align-items: center;
    justify-content: center;

    i {
      font-size: 60px;
      color: rgba(255, 255, 255, 0.36);
    }
  }

  .boxright {
    position: absolute;
    left: 15px;
    width: calc(100vw - 35px);
    height: 100%;
    z-index: 1;

    .boxrighttop {
      width: 100%;
    }

    .boxrightbot {
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

        .lrbtn {
          margin-right: 20px;
          button {
            background: #1890ff;
            border: none;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .goleftactive {
    -webkit-animation: goleft 0.2s;
    animation: goleft 0.2s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  .gorightactive {
    -webkit-animation: goright 0.2s;
    animation: goright 0.2s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  @-webkit-keyframes goleft {
    from {
      left: 385px;
      width: calc(100vw - 405px);
    }
    to {
      left: 15px;
      width: calc(100vw - 35px);
    }
  }
  @keyframes goleft {
    from {
      left: 385px;
      width: calc(100vw - 405px);
    }
    to {
      left: 15px;
      width: calc(100vw - 35px);
    }
  }

  @-webkit-keyframes goright {
    from {
      left: 15px;
      width: calc(100vw - 35px);
    }
    to {
      left: 385px;
      width: calc(100vw - 405px);
    }
  }
  @keyframes goright {
    from {
      left: 15px;
      width: calc(100vw - 35px);
    }
    to {
      left: 385px;
      width: calc(100vw - 405px);
    }
  }
}
</style>
