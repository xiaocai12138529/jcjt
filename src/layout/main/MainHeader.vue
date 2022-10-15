<template>
  <div class="header-router">
    <div class="router-left">
      <div
        class="router-item"
        :class="{ active: active == 1 }"
        @click="to('Home', 1)"
      >
        综合信息看板
      </div>
      <div
        class="router-item"
        :class="{ active: active == 2 }"
        @click="to('board', 2)"
      >
        拟合成果展示
      </div>
      <div
        class="router-item"
        :class="{ active: active == 3 }"
        @click="to('operation-data', 3)"
      >
        工序数据管理
      </div>
    </div>
    <div class="title">
      <div>精测精调一体化信息管理平台</div>
    </div>
    <div class="router-right">
      <div
        class="router-item"
        :class="{ active: active == 4 }"
        @click="to('track-status-detection', 4)"
      >
        项目基础信息
      </div>
      <div
        class="router-item"
        :class="{ active: active == 5 }"
        @click="to('track-status-detection', 5)"
      >
        台账信息管理
      </div>
      <div
        class="router-item"
        :class="{ active: active == 6 }"
        @click="to('system', 6)"
      >
        系统维护管理
      </div>
    </div>
    <div class="user">
      <a-dropdown>
        <user-outlined :style="{ color: '#FCCA00', fontSize: '20px' }" />
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">个人信息</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a href="javascript:;">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  emits: ['update:collapsed'],
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isCollapsed = computed({
      get: () => props.collapsed,
      set: (val) => emit('update:collapsed', val),
    })

    // 路由
    const router = useRouter()
    const route = useRoute()

    const data = reactive({
      active: 1,
    })
    const to = (item: any, id: number) => {
      data.active = id
      router.push({ name: item })
    }
    return { ...toRefs(data), isCollapsed, to }
  },
})
</script>
<style scoped lang="scss">
@keyframes toshow {
  0% {
    width: 0;
  }
  100% {
    width: 50%;
  }
}
.header-router {
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 100%;
  position: relative;
  .router-left {
    display: flex;
    justify-content: space-between;
    flex: auto;
    & > div {
      flex: auto;
    }
  }
  .title {
    // width: 550px;
    padding: 0 20px;
    margin: 0 60px;
    background-color: #125d9f;
    // text-align: center;
    color: #f3f0a4;
    font-size: 2rem;
    font-family: SourceHanSansSC-regular;
    position: relative;
    border-bottom: 2px solid #ffdc90;
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &::before {
      position: absolute;
      left: -60px;
      border-top: 30px solid #125d9f;
      border-bottom: 30px solid transparent;
      border-right: 30px solid #125d9f;
      border-left: 30px solid transparent;
      content: '';
    }
    &::after {
      position: absolute;
      right: -60px;
      top: 0;
      border-top: 30px solid #125d9f;
      border-bottom: 30px solid transparent;
      border-right: 30px solid transparent;
      border-left: 30px solid #125d9f;
      content: '';
    }
  }
  .router-right {
    display: flex;
    justify-content: space-between;
    flex: auto;
    & > div {
      flex: auto;
    }
  }
  .router-item {
    cursor: pointer;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .active {
    color: #ffdc90;
    position: relative;
    &::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 5.5px;
      width: 50%;
      background: none;
      background-image: radial-gradient(
        rgba(255, 255, 255, 1) 20%,
        rgba(255, 255, 255, 0) 75%
      );
      bottom: -2px;
      z-index: 10;
      animation-name: toshow;
      animation-duration: 0.4s;
      content: '';
    }
  }
  .user {
    position: absolute;
    right: -25px;
  }
}
</style>
