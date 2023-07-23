<template>
  <div class="map-container">
    <div id="map-ref">
      <canvas
        id="windy"
        ref="windy"
        style="
          position: absolute;
          pointer-events: none;
          z-index: 1;
          width: 100%;
          height: 100%;
        "
      ></canvas>
    </div>
  </div>
</template>

<script>
import './ol-mb.css'
import { Map } from 'ol'
import { Layers, Sources } from '@/components/map/layers'
import View from 'ol/View'
import { transform, transformExtent } from 'ol/proj'
import { Point } from 'ol/geom'
import { MainModes } from '@/components/map/constrants'
import { Measure } from '@/components/map/measure_v2'
import {
  ColorBarControl,
  CoordinateInfoControl,
  LayerControl,
  MeasureControl,
  WeatherLayerControl,
} from '@/components/map/controls'
import '@/components/map/windy'
import { WindyV2 } from '@/components/map/windy'
import { Styles } from '@/components/map/styles'

export default {
  name: 'one-map',
  props: {
    lines: Array,
  },
  data() {
    return {
      windy: null,
      windyCanvas: null,
      enableWindy: false,
      measure: null,
    }
  },
  computed: {},
  mounted() {
    this.init()
    this.mountBus()
  },
  methods: {
    init() {
      const global = this
      this.windyCanvas = this.$refs.windy

      this.map = new Map({
        target: 'map-ref',
        controls: [],
        layers: [
          // Layers.AMapLabel(),
          Layers.GeoVisLabel,
          Layers.BaseGroup,
          Layers.OverrunColorLine,
          // new WebGLTileLayer({
          //   source:new OSM()
          // })
          // Layers.RailLines,
          Layers.NASARain,
          Layers.NASACloud,
          Layers.Points,
          Layers.SelectedPoints,
          // Layers.PointsCluster,
          // Layers.Heatmap,
          // Layers.KMTags,
          // Layers.OverrunColorMap,
          Layers.Measure,
          // Layers.HoveredPoint,
          // Layers.HoveredRailLine
          // Layers.ArcGISLine,
          // Layers.ArcGISLineJinan,
          // Layers.ArcGISLineZhenghe,
          // Layers.ArcGISImagine,
        ],
        view: new View({
          // center: [116.08572146300406, 30.446470225414302],
          center: transform([116.2, 39.4], 'EPSG:4326', 'EPSG:3857'),
          zoom: 5,
          enableRotation: false,
          // projection: "EPSG:3857",
        }),
      })
      fetch('https://tile2.gosurmaps.com/static/windy/wind-gfs-latest.json')
        // fetch("https://esri.github.io/wind-js/gfs.json")
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          global.windy = new WindyV2({
            canvas: global.windyCanvas,
            data: json,
          })
          // global.refreshWindy();
        })
      this.addWindyHandler()
      // this.map.addControl(new Zoom());
      this.map.addControl(
        new WeatherLayerControl({
          setVisible: (id, visible) => {
            switch (id) {
              case 'wind':
                if (visible) {
                  this.enableWindy = true
                  this.refreshWindy()
                } else {
                  this.enableWindy = false
                  this.stopWindy()
                }
                break
              case 'rain':
              case 'cloud':
                this.changeLayerVisible({ id: id, val: visible })
                break
            }
          },
        })
      )
      this.map.addControl(
        new CoordinateInfoControl({
          projection: 'EPSG:4326',
        })
      )
      this.map.addControl(
        new MeasureControl({
          source: Sources.Measure,
          style: Styles.MeasureEditing,
        })
      )
      this.colorBar = new ColorBarControl()
      this.map.addControl(this.colorBar)
      this.map.addControl(
        new LayerControl({
          setStyle: this.changeBaseMap,
        })
      )
      const _this = this
      _this.$bus.$emit(
        'layer-change',
        _this.getAllLayers(_this.map.getLayers().getArray())
      )
      this.map.getLayers().on('change', (e) => {
        const map = e.target
        _this.$bus.$emit(
          'layer-change',
          _this.getAllLayers(map.getLayers().getArray())
        )
      })
      this.enterHitMode()
    },
    navigateTo({ lon, lat }) {
      this.map
        .getView()
        .fit(
          new Point(
            transform([lon, lat], 'EPSG:4326', 'EPSG:3857')
          ).getExtent(),
          {
            maxZoom: 20,
          }
        )
    },
    fitTo(extent, delay, padding) {
      extent = transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
      this.map.getView().fit(extent, {
        padding: padding ?? [200, 200, 200, 200],
        maxZoom: 20,
        duration: delay ?? 500,
      })
    },
    changeLayerVisible({ val: visible, id: id }) {
      if (!this.map) return
      this.map.getLayers().forEach((v) => {
        // if (v.getLayers && v.get("hasChildren")) {
        if (v.getLayers) {
          let layerCollection_ = v.getLayers()
          layerCollection_.forEach((v_) => {
            if (v_.get('layerId') === id) {
              v_.setVisible(visible)
            }
          })
        }
        if (v.get('layerId') === id) {
          v.setVisible(visible)
        }
      })
      if (id === 'color-map') {
        this.colorBar.setDisplay(visible)
      }
    },
    changeBaseMap(val) {
      const vector = 'streets'
      const satellite = 'satellite'
      const terrain = 'terrain'
      switch (val) {
        case vector:
          this.changeLayerVisible({ val: true, id: vector })
          this.changeLayerVisible({ val: false, id: satellite })
          this.changeLayerVisible({ val: false, id: terrain })
          break
        case satellite:
          this.changeLayerVisible({ val: true, id: satellite })
          this.changeLayerVisible({ val: false, id: vector })
          this.changeLayerVisible({ val: false, id: terrain })
          break
        case terrain:
          this.changeLayerVisible({ val: true, id: terrain })
          this.changeLayerVisible({ val: false, id: vector })
          this.changeLayerVisible({ val: false, id: satellite })
          break
      }
    },
    switchMode(mode) {
      switch (mode) {
        case MainModes.POINTER:
          this.exitMeasureMode()
          this.enterHitMode()
          break
        case MainModes.AREA:
        case MainModes.LENGTH:
          this.exitHitMode()
          this.enterMeasureMode(mode)
      }
    },
    hoverHandler(e) {
      if (!Layers.Points.getVisible()) return
      Layers.Points.getFeatures(e.pixel).then((features) => {
        if (features.length > 0) {
          const feature = features[0]
          Layers.HoveredPointId = feature.getId()
          this.map.getTargetElement().style.cursor = 'pointer'
        } else {
          Layers.HoveredPointId = ''
          this.map.getTargetElement().style.cursor = 'auto'
        }
        Layers.SelectedPoints.changed()
      })
    },
    hitHandler(e) {
      // 如果数据开关开着,关闭
      this.$bus.$emit('close-if-layer-control-show')
      console.log('wot')
      if (!Layers.Points.getVisible()) return
      Layers.Points.getFeatures(e.pixel).then((features) => {
        if (features.length > 0) {
          const feature = features[0]
          this.$emit('set-current-point-id', feature.getId())
          Layers.HighlightPointId = feature.getId()
        } else {
          this.$emit('set-current-point-id', null)
          Layers.HighlightPointId = ''
        }
        Layers.SelectedPoints.changed()
      })
    },
    enterHitMode() {
      if (this.map) {
        this.map.on('singleclick', this.hitHandler)
        this.map.on('pointermove', this.hoverHandler)
      }
    },
    exitHitMode() {
      if (this.map) {
        this.map.un('singleclick', this.hitHandler)
        this.map.un('pointermove', this.hoverHandler)
      }
    },
    enterMeasureMode(mode) {
      this.exitMeasureMode()
      this.measure = Measure(this.map, mode)
      this.map.addInteraction(this.measure)
    },
    exitMeasureMode() {
      if (this.measure && this.map) {
        this.map.removeInteraction(this.measure)
        this.measure = null
      }
    },
    getAllLayers(layerCollection) {
      let layers = []
      layerCollection.forEach((l) => {
        if (l.get('controllable')) {
          console.log(l.get('title'))
          let layerObj = {
            id: l.get('layerId'),
            label: l.get('title'),
            visible: l.get('visible'),
            children: [],
          }
          layers.push(layerObj)
          if (l.getLayers && l.get('hasChildren')) {
            let collection = l.getLayers()
            collection.forEach((v) => {
              layerObj.children.push({
                id: v.get('layerId'),
                label: v.get('title'),
                visible: v.get('visible'),
              })
              layers.push(layerObj)
            })
          }
        }
      })
      return layers
    },
    addWindyHandler() {
      if (this.map) {
        this.map.on(['movestart', 'pointerdrag'], this.stopWindy)
        this.map.on('moveend', this.refreshWindy)
      }
    },
    refreshWindy() {
      if (!this.windy || !this.enableWindy) {
        return
      }
      this.windy.stop()
      var mapSize = this.map.getSize()
      var extent = transformExtent(
        this.map.getView().calculateExtent(mapSize),
        'EPSG:3857',
        'EPSG:4326'
      )
      this.windyCanvas.width = mapSize[0]
      this.windyCanvas.height = mapSize[1]
      this.windy.start(
        [
          [0, 0],
          [this.windyCanvas.width, this.windyCanvas.height],
        ],
        this.windyCanvas.width,
        this.windyCanvas.height,
        [
          [extent[0], extent[1]],
          [extent[2], extent[3]],
        ]
      )
    },
    stopWindy() {
      if (this.windy && this.windyCanvas) {
        this.windy.stop()
        this.windyCanvas
          .getContext('2d')
          .clearRect(0, 0, this.windyCanvas.width, this.windyCanvas.height)
      }
    },
    destroyMap() {
      if (this.map) {
        console.log('wo')
        this.map.setTarget(null)
        this.map = null
      }
    },
    mountBus() {
      this.$bus.$on('map-navigate-to', this.navigateTo)
      this.$bus.$on('map-fit-to', this.fitTo)
      this.$bus.$on('map-switch-mode', this.switchMode)
      this.$bus.$on('map-change-layer-visible', this.changeLayerVisible)
      this.$bus.$on('map-change-base-map', this.changeBaseMap)
    },
    unmountBus() {
      this.$bus.$off('map-navigate-to', this.navigateTo)
      this.$bus.$off('map-fit-to', this.fitTo)
      this.$bus.$off('map-switch-mode', this.switchMode)
      this.$bus.$off('map-change-layer-visible', this.changeLayerVisible)
      this.$bus.$off('map-change-base-map', this.changeBaseMap)
    },
  },
  beforeDestroy() {
    // this.unmountBus()
    this.map.setTarget(null)
    this.map = null
  },
}
</script>

<style lang="scss" scoped>
#map-ref {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 30px;
  //padding: 2vh;
  //height: calc(100% - 30px);
}

.map-container {
  position: absolute;
  top: -30px;
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.ol-overlaycontainer-stopevent {
  z-index: 5 !important;
}

@media screen and (max-height: 900px) {
  .ol-color-bar {
    right: 64px !important;
  }
  .ol-layer-ctrl {
    right: 64px !important;
  }
  .ol-coordinate-ctrl {
    right: 64px !important;
  }
}

.ol-color-bar:hover {
  cursor: vertical-text;
}

.ol-color-bar {
  bottom: calc(30vh + 75px);
  right: 19.2px;
  width: 25px;
  margin: 1px;
  height: 180px;
  background-color: rgba(255, 255, 255, 0.1);
}

.ol-color-bar :hover {
}

.ol-color-bar-content {
  width: 100%;
  height: calc(100% - 28px);
  border-width: 2px;
  border-radius: 8px;
  background-image: linear-gradient(to bottom, #96f6be, #fffe00, #ff0000);
}

.ol-coordinate-ctrl {
  bottom: 15vh;
  right: 8px;
  background: rgb(255 255 255/75%);
  border-radius: 8px;
  cursor: pointer;
  font-weight: bolder;
  //padding: 8px;
  //padding: 1px 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25) !important;
  width: 95px;
  height: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.ol-measure {
  top: 0.5em;
  right: 0.5em;
  z-index: 5;
}

.ol-weather {
  top: calc(8px + 130px);
  right: 0.5em;
  z-index: 5;
}

.ol-icon {
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
}

.ol-icon-small {
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.ol-weather-wind {
  border-radius: 8px 8px 0 0;
  background-image: url('../../assets/map-icon/wind.png');
}

.ol-weather-rain {
  background-size: 65% !important;
  background-image: url('../../assets/map-icon/rain.png');
}

.ol-weather-cloud {
  border-radius: 0 0 8px 8px;
  background-image: url('../../assets/map-icon/cloud.png');
}

.ol-measure .ol-measure-length {
  background-image: url('../../assets/map-icon/ruler.svg');
  border-radius: 8px 8px 0 0;
}

.ol-measure .ol-measure-area {
  background-image: url('../../assets/map-icon/shape.svg') !important;
}

.ol-measure .ol-measure-trash {
  background-image: url('../../assets/map-icon/delete.svg') !important;
  border-radius: 0 0 8px 8px;
}

.ol-selected {
  //background-color: rgb(129, 163, 171) !important;
  background-color: rgb(5, 206, 206) !important;
  color: white;
}

.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.m-0 {
  margin: 0 !important;
}

.ol-layer-ctrl {
  bottom: calc(15vh + 50px);
  right: 0.5em;
  width: 95px;
  height: 95px;
  overflow: visible;
  box-shadow: none !important;
}

.ol-layer-ctrl .mini-map-img {
  border: 2px solid #fff;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3) !important;
}

.ol-layer-ctrl .mini-map-img img {
  width: 100%;
}

.ol-layer-ctrl .list-type-map {
  width: 0;
  position: absolute;
  right: 15px;
  top: 10px;
  z-index: -1;
  //float: left;
  //transition: width 0.4s ease-in;
  /*transition-timing-function: ease-in-out;*/
  /*transition:transform 1s linear;*/
  overflow: hidden;
}

.ol-layer-ctrl .list-type-map.open {
  width: 280px;
  /*transition-timing-function: ease-in;*/
  /*transition: width .4s ease-in;*/
  overflow: visible;
}

.ol-layer-ctrl .btn-type {
  text-align: center;
  padding: 0;
}

.ol-layer-ctrl .btn-type a {
  color: inherit;
}

.ol-layer-ctrl .btn-type:hover .label-type {
  background-color: #ccc;
}

.ol-layer-ctrl .btn-type.selected .label-type {
  background-color: #262626;
  color: #fff;
}

.ol-layer-ctrl .btn-type:hover .type-map-image,
.ol-layer-ctrl .btn-type.selected .type-map-image {
  border-color: #ccc;
}

.ol-layer-ctrl .type-map-image {
  border: 2px solid #fff;
  border-radius: 8px;
  width: 45px;
  height: 45px;
  display: inline-block;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.1s;
  overflow: hidden;
}

.ol-layer-ctrl .list-type-map.open .type-map-image {
  transition: opacity 0.8s;
  opacity: 1;
}

.ol-layer-ctrl .type-map-image img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.ol-layer-ctrl .text-type {
  background-color: #fff;
  padding: 4px 8px;
  margin-top: 4px;
  cursor: pointer;
}

.ol-layer-ctrl .label-type {
  padding: 6.4px 8px;
  border-radius: 4px;
  line-height: normal;
}

.ol-layer-ctrl .col-hide .text-type {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  padding-right: 0;
  cursor: pointer;
}

//.ol-layer-ctrl .list-type-map {
//  right: unset;
//  left: 93px;
//}

.ol-layer-ctrl .list-type-map .row {
  //flex-direction: row-reverse;
}

.ol-layer-ctrl .list-type-map .col-hide .text-type {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-left: 0;
  padding-right: 8px;
}

.ol-layer-ctrl .list-type-map .col-hide .text-type .label-type {
  transform: rotate(180deg);
}

.ol-tooltip {
  position: relative;
  //background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
  font-size: 22px;
  font-weight: bolder;
  cursor: default;
  user-select: none;
}

.ol-tooltip-measure {
  opacity: 1;
  font-weight: bolder;
}

.ol-tooltip-close {
  font-weight: bolder;
  font-size: 24px;
  margin-left: 4px;
  color: #fd792a;
  cursor: pointer;
}

.ol-tooltip-static {
  //background-color: rgba(206, 201, 187, 0.18);
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  //border: 1.5px solid white;
}

.ol-tooltip-measure:before,
.ol-tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  //border-right: 6px solid transparent;
  //border-left: 6px solid transparent;
  content: '';
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}

.ol-tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>
