<template>
  <div class="mileage-bar">
    <!-- 线路选择 -->
    <div class="line-dropdown" @click="onVisible">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ this.lineName }}<i class="el-icon-caret-right"></i>
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="
            background-color: rgb(28, 56, 75);
            border: 0px;
            font-size: 14px;
            z-index: 999999999999;
          "
        >
          <el-dropdown-item
            v-for="(item, index) in lines"
            :key="index"
            @click.native="selectLine(item)"
            >{{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 里程选择 -->
    <div class="chart-tab" v-show="this.visible">
      <!-- x号 -->
      <!--      <i class="el-icon-close" @click="close"></i>-->
      <!-- 输入里程 -->
      <div class="inputs">
        k
        <input
          v-model="kmQuery"
          @keypress="handleEnter"
          type="text"
          placeholder="公里"
        />
        <!--        +-->
        <!--        <input type="text" placeholder="米数" />-->
      </div>
      <!-- 里程条 -->
      <div class="mileage-select" @mouseenter="handlePointerEnter">
        <!-- 对应元素 -->
        <div
          class="long"
          v-for="(item, index) in features"
          :key="index"
          @click="onClick(item, index)"
        >
          <span :class="[current === index ? 'alone' : 'as']">
            <span>{{ item.name }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getKMTag, getLines, getXYZByMileage } from "@/api";
import { GeoJSON } from "ol/format";

export default {
  data() {
    return {
      lines: [],
      cache: {},
      defaultFeatures: Array(20)
        .fill(0)
        .map((_) => {
          return { name: "·", x: 0, y: 0, value: "k" };
        }),
      features: this.defaultFeatures,
      lineId: "",
      // 里层条显示与否
      visible: true,
      // 默认小圆圈点击值
      current: undefined,
      kmQuery: "",
    };
  },
  computed: {
    line() {
      return this.lines.find((i) => i.id === this.lineId);
    },
    lineName() {
      if (!this.line) {
        return "加载中···";
      }
      return this.line.name;
    },
  },
  methods: {
    // 回车
    handleEnter(evt) {
      if (evt.key === "Enter") {
        // Cancel the default action, if needed
        evt.preventDefault();
        // Trigger the button element with a click
        if (!isNaN(this.kmQuery)) {
          getXYZByMileage(this.lineId, {
            mileage: this.kmQuery * 1000,
          }).then((res) => {
            // Geometry { type ,coordinates}
            if (res) {
              const coordinate = res.coordinates;
              this.$bus.$emit("map-navigate-to", {
                lon: coordinate[0],
                lat: coordinate[1],
              });
            }
          });
        }
      }
    },
    // 动态添加类名
    onClick(item, index) {
      this.$bus.$emit("map-navigate-to", { lon: item.x, lat: item.y });
      this.current = index;
    },
    // 改变线路数据
    selectLine(item) {
      this.current = undefined;
      const id = item.id;
      this.lineId = id;
      if (id === null) {
        this.features = this.defaultFeatures;
      } else {
        const cached = this.cache[id];
        if (cached) {
          this.features = cached;
        } else {
          getKMTag({ railLineId: id }).then((res) => {
            const features = new GeoJSON().readFeatures(res);
            this.features = features.map((f) => {
              return {
                name: f.get("name"),
                x: f.get("x"),
                // x: f.getGeometry().getCoordinates()[0],
                y: f.get("y"),
                // y: f.getGeometry().getCoordinates()[1],
                value: f.get("value"),
              };
            });
            this.cache[id] = this.features;
          });
        }
      }
    },
    // 点击x号
    close() {
      this.visible = false;
    },
    // 显示隐藏里程条
    onVisible() {
      this.visible = true;
    },

    // 鼠标进入
    handlePointerEnter() {
      let strip = document.querySelector(".mileage-select");
      strip.addEventListener("wheel", (event) => {
        event.preventDefault();
        strip.scrollLeft += event.deltaY / 2;
      });
    },
  },
  created() {
    this.features = this.defaultFeatures;
  },
  mounted() {
    const cache = this.$store.state.allRails;
    if (cache.length > 0) {
      this.lines = cache;
      this.lineId = this.lines.at(-1).id;
      this.selectLine(this.lines.at(-1));
    } else {
      getLines().then((cache) => {
        this.lines = cache;
        this.lineId = this.lines.at(-1).id;
        this.selectLine(this.lines.at(-1));
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.mileage-bar {
  white-space: nowrap;
  width: 100%;
  height: 60%;
  // background-color: pink;
  // margin-top: 40%;
  & > div {
    float: left;
  }

  .line-dropdown {
    width: 10vw;
    height: 100%;
    background-color: rgb(28, 56, 75);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1vw;
    border-radius: 15px;
    cursor: pointer;
  }

  .chart-tab {
    //width: 90%;
    //width: calc(90%- 150px);
    width: calc(100% - 15vw);
    height: 100%;
    // background-color: purple;
    //margin-left: 10px;
    position: relative;

    .el-icon-close {
      position: absolute;
      right: -2%;
      top: 2%;
      color: white;
      cursor: pointer;
    }

    & > div {
      float: left;
    }

    .inputs {
      width: 6vw;
      height: 100%;
      // background-color: aqua;
      display: flex;
      align-items: center;
      justify-content: center;
      //margin-left: 1.6px;
      color: white;
      font-size: 16px;

      & > input {
        width: 50px;
        height: 70%;
        border: none;
        border-bottom: 2px solid rgb(192, 212, 245);
        margin-left: 5px;
        margin-right: 5px;
        background-color: transparent;
        outline: none;
        color: white;
      }
    }

    .mileage-select {
      width: calc(100% - 6vw);
      height: 100%;
      // background-color: brown;
      margin-top: 1vh;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      // position: relative;
      white-space: nowrap;
      // cursor: pointer;
      overflow: auto;
      cursor: pointer;
      overflow-y: hidden;
      padding-bottom: 7px;
      // &::-webkit-scrollbar {
      //   display: none;
      // }
      &::-webkit-scrollbar {
        width: 3px;
        height: 5px;
        display: none;
      }

      /* 滚动条⾥⾯⼩⽅块 */
      &::-webkit-scrollbar-thumb {
        border-radius: 20px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgb(193, 193, 193, 0.5);
      }

      /* 滚动条⾥⾯轨道 */
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        background: transparent;
      }

      &:hover {
        &::-webkit-scrollbar {
          width: 5px;
          height: 5px;
          display: block;
        }
      }

      .long {
        width: 50px;
        height: 4px;
        background-color: rgb(21, 79, 109);
        // float: left;
        // display:inline;
        // margin-right: 10px;
        display: inline-block;
        margin-top: 15px;
        position: relative;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        & > span {
          position: absolute;
          width: 13px;
          height: 13px;
          // background-color: rgb(7, 176, 238);
          border-radius: 15px;
          margin-top: -5px;
          margin-left: 16px;
          display: flex;
          align-items: center;
          justify-content: center;

          & > span {
            // margin-left: -5px;
            // margin-bottom: -7px;
            position: absolute;
            // left: -5px;
            top: 17px;
            font-size: 14px;
            color: white;
          }
        }
      }

      .alone {
        background-color: white;
        border: 1px solid rgb(0, 213, 213);
      }

      .as {
        background-color: rgb(0, 213, 213);
      }
    }
  }
}

::v-deep {
  .el-dropdown {
    color: white;
  }

  .el-icon-caret-right {
    color: rgb(0, 213, 213);
  }

  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: rgb(0, 213, 213) !important;
    color: white !important;
  }

  .el-dropdown-menu__item:not(.is-disabled) {
    color: white;
  }

  .popper__arrow {
    border-bottom-color: black !important;
    // left: 50% !important;
    visibility: hidden;
  }
}
</style>
