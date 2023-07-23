<template>
  <div
    class="slide-verify"
    :style="{ width: w + 'px' }"
    id="slideVerify"
    onselectstart="return false;"
  >
    <!-- 图片加载遮蔽罩 -->
    <div :class="{ 'slider-verify-loading': loadBlock }"></div>
    <canvas :width="w" :height="h" ref="canvasDocm"></canvas>
    <div
      v-if="show"
      @click="refresh"
      class="slide-verify-refresh-icon"
    >
    <font-awesome-icon icon="fas fa-refresh" />
  </div>
    <canvas
      :width="w"
      :height="h"
      ref="block"
      class="slide-verify-block"
    ></canvas>
    <!-- container -->
    <div
      class="slide-verify-slider"
      :class="{
        'container-active': containerActive,
        'container-success': containerSuccess,
        'container-fail': containerFail,
      }"
    >
      <div class="slide-verify-slider-mask" :style="{ width: sliderMaskWidth }">
        <!-- slider -->
        <div
          @mousedown="sliderDown"
          @touchstart="touchStartEvent"
          @touchmove="touchMoveEvent"
          @touchend="touchEndEvent"
          class="slide-verify-slider-mask-item"
          :style="{ left: sliderLeft }"
        >
            
          <div class="slide-verify-slider-mask-item-icon">|||</div>
        </div>
      </div>
      <span class="slide-verify-slider-text">{{ sliderText }}</span>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import { imgList } from "./img";
export default defineComponent({
  name: "SlidePuzzleVerification",
  props: {
    l: {
      type: Number,
      default: 42
    },
    r: {
      type: Number,
      default: 10
    },
    w: {
      type: Number,
      default: 310
    },
    h: {
      type: Number,
      default: 155
    },
    sliderText: {
      type: String,
      default: "请按住滑块拖动"
    },
    accuracy: {
      type: Number,
      default: 5 // 若为 -1 则不进行机器判断
    },
    show: {
      type: Boolean,
      default: true
    },
    imgs: {
      type: Array,
      default: () => [
        "/images/0-300x150.jpg",
        "/images/1-300x150.jpg",
        "/images/2-300x150.jpg",
        "/images/3-300x150.jpg",
        "/images/4-300x150.jpg",
        "/images/5-300x150.jpg",
        "/images/6-300x150.jpg",
        "/images/7-300x150.jpg",
        "/images/8-300x150.jpg",
        "/images/9-300x150.jpg"
      ]
    }
  },
  setup(props, { emit, expose }) {
    const containerActive = ref(false);
    const containerSuccess = ref(false);
    const containerFail = ref(false);
    const canvasCtx = ref(null);
    const blockCtx = ref(null);
    const block = ref(null);
    const canvasDocm = ref(null);
    const L = ref(props.l + props.r * 2 + 3);
    const block_x = ref(0);
    const block_y = ref(0);
    const img = ref();
    const originX = ref(0);
    const originY = ref(0);
    const isMouseDown = ref(false);
    const trail = ref([]);
    const sliderLeft = ref("0");
    const sliderMaskWidth = ref("0");
    const success = ref(false);
    const loadBlock = ref(true);
    const timestamp = ref(0);

    const PI = Math.PI;

    const sum = (x, y) => {
      return x + y;
    };

    const square = (x) => {
      return x * x;
    };

    onMounted(() => {
      init();
    });
    const init = () => {
      initDom();
      initImg();
      bindEvents();
    };
    const initDom = () => {
      canvasCtx.value = canvasDocm.value ? canvasDocm.value.getContext("2d") : null;
      blockCtx.value = block.value ? block.value.getContext("2d") : null;
    };
    const initImg = () => {
      const creImg = createImg(() => {
        // 图片加载完关闭遮蔽罩
        loadBlock.value = false;
        drawBlock();
        canvasCtx.value?.drawImage(creImg, 0, 0, props.w, props.h);
        blockCtx.value?.drawImage(creImg, 0, 0, props.w, props.h);
        // let { block_x: x, block_y: y, r, L } = this;
        let _y = block_y.value - props.r * 2 - 1;
        let ImageData = blockCtx.value?.getImageData(block_x.value, _y, L.value, L.value);
        if (block.value) {
          block.value.width = L.value;
        }
        blockCtx.value?.putImageData(ImageData, 0, _y);
      });
      img.value = creImg;
    };
    const drawBlock = () => {
      block_x.value = getRandomNumberByRange(L.value + 10, props.w - (L.value + 10));
      block_y.value = getRandomNumberByRange(10 + props.r * 2, props.h - (L.value + 10));
      draw(canvasCtx.value, block_x.value, block_y.value, "fill");
      draw(blockCtx.value, block_x.value, block_y.value, "clip");
    };
    const draw = (ctx, x, y, operation) => {
      // let { l, r } = this;
      let l = props.l;
      let r = props.r;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
      ctx.lineTo(x + l, y);
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
      ctx.lineTo(x + l, y + l);
      ctx.lineTo(x, y + l);
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
      ctx.lineTo(x, y);
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.stroke();
      if (operation === "fill") {
        ctx[operation]();
      } else {
        ctx.clip();
      }

      // Bug Fixes 修复了火狐和ie显示问题
      ctx.globalCompositeOperation = "destination-over";
    };
    const createImg = (onload) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onerror = () => {
        img.src = getRandomImg();
      };
      img.src = getRandomImg();
      img.onload = onload;

      return img;
    };
    // 随机生成img src
    const getRandomImg = () => {
      return imgList[getRandomNumberByRange(0, imgList.length)];
    };
    const getRandomNumberByRange = (start, end) => {
      return Math.round(Math.random() * (end - start) + start);
    };
    const refresh = () => {
      reset();
      emit("refresh");
    };
    const sliderDown = (event) => {
      if (success.value) return;
      originX.value = event.clientX;
      originY.value = event.clientY;
      isMouseDown.value = true;
      timestamp.value = +new Date();
    };
    const touchStartEvent = (e) => {
      if (success.value) return;
      originX.value = e.changedTouches[0].pageX;
      originY.value = e.changedTouches[0].pageY;
      isMouseDown.value = true;
      timestamp.value = +new Date();
    };
    const bindEvents = () => {
      document.addEventListener("mousemove", (e) => {
        if (!isMouseDown.value) return false;
        const moveX = e.clientX - originX.value;
        const moveY = e.clientY - originY.value;
        if (moveX < 0 || moveX + 38 >= props.w) return false;
        sliderLeft.value = moveX + "px";
        let blockLeft = ((props.w - 40 - 20) / (props.w - 40)) * moveX;
        if (block.value) {
          block.value.style.left = blockLeft + "px";
        }

        containerActive.value = true; // add active
        sliderMaskWidth.value = moveX + "px";
        trail.value.push(moveY);
      });
      document.addEventListener("mouseup", (e) => {
        if (!isMouseDown.value) return false;
        isMouseDown.value = false;
        if (e.clientX === originX.value) return false;
        containerActive.value = false; // remove active
        timestamp.value = +new Date() - timestamp.value;

        const { spliced, TuringTest } = verify();
        if (spliced) {
          if (props.accuracy === -1) {
            containerSuccess.value = true;
            success.value = true;
            emit("success", timestamp.value);
            return;
          }
          if (TuringTest) {
            // succ
            containerSuccess.value = true;
            success.value = true;
            emit("success", timestamp.value);
          } else {
            containerFail.value = true;
            emit("again");
          }
        } else {
          containerFail.value = true;
          emit("fail");
          setTimeout(() => {
            reset();
          }, 1000);
        }
      });
    };
    const touchMoveEvent = (e) => {
      if (!isMouseDown.value) return false;
      const moveX = e.changedTouches[0].pageX - originX.value;
      const moveY = e.changedTouches[0].pageY - originY.value;
      if (moveX < 0 || moveX + 38 >= props.w) return false;
      sliderLeft.value = moveX + "px";
      let blockLeft = ((props.w - 40 - 20) / (props.w - 40)) * moveX;
      if (block.value) {
        block.value.style.left = blockLeft + "px";
      }

      containerActive.value = true;
      sliderMaskWidth.value = moveX + "px";
      trail.value.push(moveY);
    };
    const touchEndEvent = (e) => {
      if (!isMouseDown.value) return false;
      isMouseDown.value = false;
      if (e.changedTouches[0].pageX === originX.value) return false;
      containerActive.value = false;
      timestamp.value = +new Date() - timestamp.value;

      const { spliced, TuringTest } = verify();
      if (spliced) {
        if (props.accuracy === -1) {
          containerSuccess.value = true;
          success.value = true;
          emit("success", timestamp.value);
          return;
        }
        if (TuringTest) {
          // succ
          containerSuccess.value = true;
          success.value = true;
          emit("success", timestamp.value);
        } else {
          containerFail.value = true;
          emit("again");
        }
      } else {
        containerFail.value = true;
        emit("fail");
        setTimeout(() => {
          reset();
        }, 1000);
      }
    };
    const verify = () => {
      const arr = trail.value;
      const average = arr.reduce(sum);
      const deviations = arr.map((x) => x - average);
      const stddev = Math.sqrt(deviations.map(square).reduce(sum));
      const left = parseInt(block.value?.style.left);
      const accuracy = props.accuracy <= 1 ? 1 : props.accuracy > 10 ? 10 : props.accuracy;
      return {
        spliced: Math.abs(left - block_x.value) <= accuracy,
        TuringTest: average !== stddev // equal => not person operate
      };
    };
    const reset = () => {
      success.value = false;
      containerActive.value = false;
      containerSuccess.value = false;
      containerFail.value = false;
      sliderLeft.value = "0";
      if (block.value) {
        block.value.style.left = "0";
      }

      sliderMaskWidth.value = "0";
      canvasCtx.value?.clearRect(0, 0, props.w, props.h);
      blockCtx.value?.clearRect(0, 0, props.w, props.h);
      if (block.value) {
        block.value.width = props.w;
      }
      if (img.value) {
        img.value.src = getRandomImg();
      }
      emit("fulfilled");
    };
    // 暴露方法
    expose({ reset });

    return {
      containerActive,
      containerSuccess,
      containerFail,
      canvasCtx,
      blockCtx,
      block,
      canvasDocm,
      block_x,
      block_y,
      L,
      img,
      originX,
      originY,
      isMouseDown,
      trail,
      sliderLeft,
      sliderMaskWidth,
      success,
      loadBlock,
      timestamp,
      touchStartEvent,
      touchMoveEvent,
      touchEndEvent,
      refresh,
      sliderDown
    };
  }
});
</script>
<style scoped>
.slide-verify {
  position: relative;
}

/* 图片加载样式 */
.slider-verify-loading {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 999;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 9;
  }
}

.slide-verify-block {
  position: absolute;
  left: 0;
  top: 0;
}

.slide-verify-refresh-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  color: #c6e2ff;
  font-size: 18px;
  /* background: url("./img/2.jpg") 0 -437px;
  background-size: 34px 471px; */
}

.slide-verify-slider {
  position: relative;
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background: #1890FF;
  color: #ffffff;
  border: 1px solid #e4e7eb;
}

.slide-verify-slider-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #e6e3e3;
}

.slide-verify-slider-mask-item {
  position: absolute;
  top: -1px;
  left: -1px;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
}

.slide-verify-slider-mask-item:hover {
  background: #1991fa;
}

.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon {
  /* background-position: 0 -13px; */
  color: #fff;
}

.slide-verify-slider-mask-item-icon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 11px;
  font-size: 12;
  line-height: 10px;
  color: #1991fa;
  /* background: url("./img/2.jpg") 0 -26px;
  background-size: 34px 471px; */
}
.container-active .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}

.container-active .slide-verify-slider-mask {
  height: 38px;
  border-width: 1px;
}

.container-success .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.container-success .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.container-success .slide-verify-slider-mask-item-icon {
  /* background-position: 0 0 !important; */
  color: #1991fa;
}

.container-fail .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #fde2e2;
  background-color: #fde2e2 !important;
}

.container-fail .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #fde2e2;
  background-color: #fce1e1;
}

.container-fail .slide-verify-slider-mask-item-icon {
  top: 14px;
  /* background-position: 0 -82px !important; */
  color: #f56c6c;
}

.container-active .slide-verify-slider-text,
.container-success .slide-verify-slider-text,
.container-fail .slide-verify-slider-text {
  display: none;
}
.slide-verify-slider-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>
