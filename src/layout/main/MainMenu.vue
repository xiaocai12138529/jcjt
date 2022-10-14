<template>
  <div class="logo fade-from-left-enter-active">
    <span v-show="!collapsed">
      项目管理系统
    </span>
  </div>
  <a-menu
    mode="inline"
    :selected-keys="curMenu"
    v-model:openKeys="openKeys"
    :inline-collapsed="collapsed"
    theme="dark"
  >
    <template
      v-for="(item, index) in menuList"
      :key="index"
    >
      <!-- {{ item }} -->
      <a-menu-item
        :key="item?.path"
        v-if="!item.children"
        @click="routerToPath(item)"
      >
        <template #icon>
          <span>
            <i
              class=" group-icon iconfont "
              :class="item.meta.icon"
              v-if="item.meta.icon"
            ></i>
          </span>
        </template>
        <span>{{  item.meta.title }}</span>
      </a-menu-item>
      <a-sub-menu
        :key="item?.path"
        v-else
      >
        <template #icon>
          <i
            class=" group-icon iconfont "
            :class="item.meta.icon"
            v-if="item.meta.icon"
          ></i>
        </template>
        <template #title>{{ item.meta.title }}</template>
        <a-menu-item
          v-for="subItem in item.children"
          :key="subItem.meta.title"
          @click="routerToPath(subItem)"
        >{{ subItem.meta.title }}
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import "@/assets/icon/iconfont.css";
export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const menuList = router.getRoutes().filter((v: any) => v.meta?.isShow);
    console.log(menuList);
    const curMenu = computed(() => {
      return [route.meta.title];
    });
    const routerToPath = (item: any) => {
      if (item.path) {
        router.push(item.path);
      }
    };

    const openKeys = menuList.map((item: any) => {
      return item.path;
    });
    return {
      routerToPath,
      curMenu,
      openKeys,
      menuList,
      selectedKeys: ref<string[]>(["1"]),
    };
  },
});
</script>
<style scoped lang='scss'>
.logo {
  height: 32px;
  // background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  font-size: 20px;
  white-space: nowrap;
}
</style>