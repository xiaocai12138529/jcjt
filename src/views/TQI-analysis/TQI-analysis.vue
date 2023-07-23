<template>
    <div class="tqibox">
        <UNDONE></UNDONE>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import UNDONE from "../undone.vue"
export default defineComponent({
    name: 'account-management',
    components: {UNDONE},
    setup() {


        return {}
    }
})
</script>
<style lang="scss" scoped>
.tqibox{
    color:#ffffff;
    width: 100%;
    height: 100%;
}
</style>
