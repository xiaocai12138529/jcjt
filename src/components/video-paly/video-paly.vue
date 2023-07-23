<template>
  <div class="video-playerx">
    <video-play class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions">
    </video-play>
    <PlayCircleOutlined v-if="isShow" class="play_circle_outlined" />
  </div>
</template>

<script>
import videoPlay from "vue-video-play/src/player.vue";
import "video.js/dist/video-js.css";
import { defineComponent } from "vue";
export default defineComponent({
  name: "videoPlayx",
  components: {
    videoPlay
  },
  props: {
    url: {
      type: String,
      default: "https://rim.crdc.com:4431/qlqzapi/UploadFiles/15/Integratedinfo/ClassRoomVideo/3/20220608/%E5%A6%82%E4%BD%95%E5%87%86%E7%A1%AE%E7%90%86%E8%A7%A3%E5%85%A8%E8%BF%87%E7%A8%8B%E5%B7%A5%E7%A8%8B%E5%92%A8%E8%AF%A2%E7%9A%84%E6%A6%82%E5%BF%B5%EF%BC%9F_2022060818205291.mp4"
    },
    controls: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const playerOptions = {
      height: "100%",
      playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
      autoplay: false, //如果true,浏览器准备好时开始回放。
      muted: false, // 默认情况下将会消除任何音频。
      loop: false, // 导致视频一结束就重新开始。
      preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      language: "zh-CN",
      aspectRatio: "3:2", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      sources: [
        {
          type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: props.url //url地址
        }
      ],
      poster: "", //你的封面地址
      // width: document.documentElement.clientWidth, //播放器宽度
      notSupportedMessage: "无封面", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      controls: props.controls
    };
    return { playerOptions };
  }
});
</script>

<style lang="scss" scoped>
.video-playerx {
  height: 100%;
  width: 100%;

  .play_circle_outlined,
  svg {
    position: absolute;
    top: calc(50% - 80px);
    left: calc(50% - 20px);
    color: rgba(0, 0, 0, 0.5);
    font-size: 40px;
  }

  video {
    object-fit: fill !important; //消除留白
  }
}

div {
  height: 100%;
  width: 100%;
}

:deep .video-js .vjs-tech {
  object-fit: fill;
}

:deep .vjs-big-play-button {
  border-radius: 1em;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
</style>