<template>
  <simple-input-dialog :visible="true" @ok="onOk" @cancel="onCancel">
    <div id="input-dialog-container">
      <span class="label mr10" v-if="label">{{ label }}</span>
      <a-input v-model:value="textValue" :placeholder="placeholder"></a-input>
    </div>
  </simple-input-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SimpleInputDialog from "@/components/simple-input-dialog/index.vue";
export default defineComponent({
  emits: ["ok", "cancel"],
  components: {
    SimpleInputDialog
  },
  props: {
    label: {
      type: String
    },
    defaultValue: {
      type: String
    },
    placeholder: {
      type: String,
      default: "请输入"
    }
  },
  setup(props, { emit }) {
    const textValue = ref(props.defaultValue || "");

    const onOk = () => emit("ok", textValue.value);
    const onCancel = () => emit("cancel");
    return {
      textValue,
      onOk,
      onCancel
    };
  }
});
</script>

<style lang="scss">
#input-dialog-container {
  display: flex;
  align-items: center;
  .label {
    white-space: nowrap;
  }
}
</style>
