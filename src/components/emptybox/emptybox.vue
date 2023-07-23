<template>
    <div class="emptybox flexbox">
        <img src="@/assets/images/empty.png" alt="empty" />
        <span>{{titles}}...</span>
    </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "EmptyBox",
    components: {},
    props: {
        titles:{
            default:"暂无数据"
        }
    },
    setup() {
        return { };
    }
});
</script>
  
<style lang="scss" scoped>
.emptybox {
    width: 100%;
    align-items: center;
    padding-top: 160px;
    flex-direction: column;

    img {
        width: 100px;
    }

    span {
        font-size: 14px;
        color: #0997ff;
        margin-top: 10px;
    }
}
</style>