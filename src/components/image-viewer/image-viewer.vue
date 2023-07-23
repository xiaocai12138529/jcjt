<template>
    <div>
        <el-image-viewer v-if="isshow" @close="closeViewer" :url-list="[url]" />
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "ImgPrivew",
    components: {},
    props: {
        url: {
            type: String,
            default: ""
        }
    },
    setup() {
        const isshow = ref(false)
        const closeViewer = () => {
            isshow.value = false
        }
        return { closeViewer, isshow };
    }
});
</script>
  
<style lang="scss" scoped></style>