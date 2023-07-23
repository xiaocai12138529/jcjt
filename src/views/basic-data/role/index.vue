<template>
  <div class="rolebox flexbox">
    <div class="boxleft">
      <JSList @selectsure="selectsure"></JSList>
    </div>
    <div class="boxcenter flexbox">
      <el-icon><caret-right /></el-icon>
    </div>
    <div class="boxright">
      <TableBox :activejsid="activejsid" :JSname="JSname"></TableBox>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";

import JSList from "./catalogue.vue";
import TableBox from "./table.vue";
export default defineComponent({
  name: "ROLE",
  components: { TableBox, JSList },
  setup() {
    const AddDialogdom = ref(null);
    const bachupload = ref(null);
    const data = reactive({
      JSname: "",
      activejsid: 0,
      tableData: [],
    });
    const addsure = (e) => {
      console.log(e);
    };
    const selectsure = (e) => {
      console.log(e);
      data.JSname = "（" + e.name + "）";
      data.activejsid = e.id;
    };
    
    return { addsure, ...toRefs(data), AddDialogdom, bachupload, selectsure };
  },
});
</script>
<style lang="scss" scoped>
.rolebox {
  position: relative;
  width: 100%;
  height: calc(100% - 77px);
  color: #00ffff;
  z-index: 998;
  margin-top: 30px;

  .boxleft {
    margin-left: 15px;
    width: 320px;
    height: 100%;
    border-radius: 0px 20px 20px 0px;
    box-shadow: 21px -30px 38px 5px rgba(1, 11, 51, 100);
  }

  .boxcenter {
    width: 70px;
    justify-content: center;
    align-items: center;
    i {
      font-size: 60px;
      color: rgba(255, 255, 255, 0.36);
    }
  }

  .boxright {
    width: calc(100vw - 425px);
    margin-right: 20px;
    height: 100%;
    border-radius: 16px;
    font-size: 14px;
    box-shadow: 0px 10px 30px 14px rgba(1, 11, 51, 100);

    
    .querybox {
      align-items: center;
      padding-left: 20px;
      padding-bottom: 20px;
      button {
        margin-left: 10px;
      }
    }
  }
}
</style>
