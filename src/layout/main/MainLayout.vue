<template>
  <a-layout>
    <!-- 顶部 -->
    <a-layout-header>
      <MainHeader />
    </a-layout-header>
    <a-layout-content>
      <div class="tab">
        <a-tabs v-if="routeItem" class="route-tab-2" @change="to">
          <a-tab-pane
            v-for="item in routeItem.children"
            :key="item.name"
            :tab="item.meta.title"
          >
            <a-tabs class="route-tab-3" @change="to">
              <a-tab-pane
                v-for="items in item.children"
                :key="items.name"
                :tab="items.meta.title"
              ></a-tab-pane>
            </a-tabs>
          </a-tab-pane>
        </a-tabs>
      </div>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import MainHeader from './MainHeader.vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
export default defineComponent({
  components: { MainHeader },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const routerMain = router.getRoutes()
    let path: any = ref()
    let routeItem: any = ref()
    path.value = route.fullPath.split('/')
    routeItem.value = routerMain.find((item: any) => item.name == path.value[1])

    onBeforeRouteUpdate(async (to, from) => {
      path.value = to.fullPath.split('/')
      routeItem.value = routerMain.find(
        (item: any) => item.name == path.value[1]
      )
    })

    const to = (item: any) => {
      console.log(item)

      router.push({ name: item })
    }

    return { routeItem, to }
  },
})
</script>

<style lang="scss" scoped>
.ant-layout {
  height: 100vh;
}
.ant-layout-content {
  padding: 20px 20px 0;
}
.ant-layout {
  // background-color: #04355c;
  background-image: url(~@/assets/images/bac.jpg);
  .tab {
    // display: flex;
    // justify-content: space-between;
    position: relative;
    .route-tab-2 {
      color: rgba(117, 249, 253, 0.39);
      :deep().ant-tabs-tab {
        height: 42px;
        padding: 10px 10px;
        border: 3px;
        background-image: linear-gradient(
          90deg,
          rgba(0, 123, 211, 0.69),
          rgba(20, 144, 232, 0.14)
        );
      }
      :deep() .ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #75f9fd;
      }
      :deep() .ant-tabs-tab + .ant-tabs-tab {
        margin-left: 8px;
      }
    }
    .route-tab-3 {
      position: absolute;
      right: 0;
      top: 0;
      overflow: initial;

      :deep() .ant-tabs-nav-wrap {
        overflow: initial;
      }

      :deep().ant-tabs-tab {
        background-color: transparent;
        background-image: none;
        color: #fff;
        padding: 10px 20px;
      }
      :deep() .ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #fff;
      }
      :deep() .ant-tabs-ink-bar {
        height: 6px;
        background: none;
        background-image: radial-gradient(
          rgba(255, 255, 255, 1) 20%,
          rgba(255, 255, 255, 0) 75%
        );
        bottom: -2px;
        z-index: 10;
      }

      .ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar,
      .ant-tabs-top > div > .ant-tabs-nav .ant-tabs-ink-bar {
        color: red;
      }
    }
  }
  :deep() .ant-tabs {
    .ant-tabs-nav {
      margin: 0;
      &::before {
        content: none;
      }
    }
  }
}
.ant-layout-header {
  background-color: transparent;
  height: 60px;
}
</style>
