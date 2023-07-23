<template>
  <div id="trackBox" class="flexbox">
    <!-- <div class="boxleft" :class="showleftType == 2 ? 'fadeOutActive' : showleftType == 3 ? 'fadeInActive' : ''" :style="showleftType != 2 ? 'height:100%' : 'height:50px'">
      <LineTab @linechange="linechange" @titleclick="titleclick"></LineTab>
    </div>
    <div class="boxlefttitle flexbox" @click.stop="titleclick" v-if="showleftType != 3">
      <font-awesome-icon icon="fas fa-outdent" />
      <span class="protitle" style="margin-left: 8px">当前项目：{{ projectname }}</span>
    </div>
    <div class="boxcenter flexbox" v-if="showleftType == 3">
      <el-icon>
        <caret-right />
      </el-icon>
    </div> -->
    <div class="boxright" :class="showleftType == 2 ? 'goleftactive' : showleftType == 3 ? 'gorightactive' : ''">
      <div class="boxrighttop">
        <TypeTab :activetype="activetype" :typelist="typelist" @typechange="typechange"></TypeTab>
      </div>
      <div class="boxrightbot">
        <div class="tabbox flexbox">
          <FormTab :activetab="activetab" :tablist="tablist" @formchange="formchange"></FormTab>
          <div class="lrbtn flexbox">
            <el-input placeholder="请输入点号关键字" clearable v-model="key" style="width: 200px; margin-right: 10px" @clear="search" v-if="projectid && activetab == '坐标系统'">
              <template #suffix>
                <el-icon style="cursor: pointer" @click.stop="search">
                  <Search />
                </el-icon>
              </template>
            </el-input>
            <el-button type="primary" @click.stop="handleclick('addcoord', {})" v-if="activetab == '坐标系统'">新增坐标系统</el-button>
          </div>
        </div>
        <CoordinateBox ref="coordinate" v-if="activetab == '坐标系统'" :projectid="projectid"></CoordinateBox>
        <BASEBOX v-else :projectid="projectid" :linelist="linelist" :activetab="activetab" :activetype="activetype" :showleftType="showleftType"></BASEBOX>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import TypeTab from '@/components/component/typetab'
import FormTab from '@/components/component/formtab'
import CoordinateBox from './coordinate/coordinate.vue'
import BASEBOX from './base.vue'

import { accountoptions } from './options'
export default defineComponent({
  name: 'track-management',
  components: { TypeTab, FormTab, CoordinateBox, BASEBOX },
  setup() {
    const coordinate = ref(null)
    const showleftType = ref(1)
    const data = reactive({
      key: '',
      projectname: '',
      projectid: null,
      linelist: [],
      addcoordFn: false,
      typelist: accountoptions,
      activetype: accountoptions[0].name,
      tablist: accountoptions[0].children,
      activetab: accountoptions[0].children[0].name,
    })
    const titleclick = () => {
      console.log('dianjile')
      if (showleftType.value == 1) {
        showleftType.value = 3
      } else if (showleftType.value == 2) {
        showleftType.value = 3
      } else if (showleftType.value == 3) {
        showleftType.value = 2
      }
    }
    const linechange = (row) => {
      data.projectid = row.id
      data.projectname = row.name
      data.linelist = row.tbProjectLine ? row.tbProjectLine : []
    }
    const formchange = (row) => {
      data.activetab = row.name
    }
    const typechange = (row) => {
      data.activetype = row.name
      accountoptions.map((item) => {
        if (item.name == row.name) {
          if (row.children && row.children.length) {
            data.tablist = row.children
            data.activetab = row.children[0].name
          } else {
            data.tablist = []
          }
        }
      })
    }
    const handleclick = (type) => {
      if (type == 'addcoord') {
        coordinate.value.addcoordFn()
      }
    }
    const search = () => {
      coordinate.value.key = data.key
      coordinate.value.getdata()
    }

    return {
      titleclick,
      handleclick,
      linechange,
      formchange,
      typechange,
      ...toRefs(data),
      coordinate,
      search,
      showleftType,
    }
  },
})
</script>
<style lang="scss" scoped>
#trackBox {
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
    margin-top: 50px;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    z-index: 2;
    color: #fcca00;
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
    height: 100%;
    width: calc(100vw - 35px);
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
        padding-left: 20px;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;

        .lrbtn {
          margin-right: 20px;
          button {
            // height: 40px;
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
