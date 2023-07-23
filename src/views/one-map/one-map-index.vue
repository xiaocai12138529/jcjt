<template>
  <div class="onemapouter">
    <div class="one-map" id="onemap"></div>
    <div class="contabbox">
      <FormTab ref="tab" :activetab="activetab" :tablist="tablist" @formchange="formchange"></FormTab>
    </div>
    <div class="projectouter" v-if="activetab=='项目一张图'" v-loading="isloading">
      <ProjectBox @getprojectrow="getprojectrow" @lcClick="lcClick" :prolines="prolines"></ProjectBox>
    </div>
    <div class="projectouter" v-if="activetab=='平纵断面优化一张图'">
      <PZDMBox @getpzdm="getpzdm" @getrowclick="getrowclick"></PZDMBox>
    </div>
  </div>
</template>
  
<script>
import { defineComponent, ref, onMounted, onUnmounted,reactive,toRefs } from "vue";
import { Map, View } from 'ol'      // 地图实例方法、视图方法
//引入proj4
import proj4 from 'proj4'
import { Layers, Sources } from '@/components/map/layers.js'
import { transform, transformExtent } from 'ol/proj'
import { Styles } from '@/components/map/styles'
import { Measure } from '@/components/map/measure_v2'
import { MainModes } from '@/components/map/constrants'
import { Point } from 'ol/geom'
import { ColorBarControl,CoordinateInfoControl,LayerControl,MeasureControl} from '@/components/map/controls'
import emitter from "tiny-emitter/instance"
import { Stroke, Style, Fill, Text, } from "ol/style";
import { Vector as VectorLayer ,Heatmap} from "ol/layer";
import { Vector as SourceLayer } from "ol/source";
import Feature from 'ol/Feature';
import { LineString } from 'ol/geom';
import CircleStyle from "ol/style/Circle";
import VectorSource from "ol/source/Vector";
var wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs  ';
var cgcs2000 = '+proj=tmerc +lat_0=0 +lon_0=111.833333 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs';
import { GeoJSON as GeoJSONFormat} from "ol/format";

import FormTab from '@/components/component/formtab';
import ProjectBox from "./component/projectBox.vue"
import PZDMBox from "./component/PZDMBox.vue"
import {GetAllList_ProjectLineLc} from "@/api/interface/map"
export default defineComponent({
  name: "OneMap",
  components: {FormTab,ProjectBox,PZDMBox},
  setup() {
    const mymap = ref(null)
    const colorBar = ref(null)
    const measure = ref(null)
    const data = reactive({
        isloading:false,
        activetab: "项目一张图",
        tablist: [{ name: "项目一张图", id: 1 },{ name: "平纵断面优化一张图", id: 2 }],
        prolines:[],
        pointlist:[],
    })
    const formchange = (row) => {
        data.activetab = row.name
        initMap()
    }
    const getprojectrow=(row)=>{
      if(row.listLineData?.length){
        data.pointlist=row.listLineData
      }else{
        data.pointlist=[]
      }
      if(mymap.value){
        mymap.value.getView().setCenter(transform(proj4(cgcs2000, wgs84, [row.listLineData[0].midLine_Y, row.listLineData[0].midLine_X]), 'EPSG:4326', 'EPSG:3857'))
      }
    }
    const getrowclick=(row)=>{
      if(mymap.value){
        mymap.value.getView().setCenter(transform(proj4(cgcs2000, wgs84, [row.y, row.x]), 'EPSG:4326', 'EPSG:3857'))
      }
    }
    const lcClick=(row)=>{
      console.log(row)
      if(mymap.value){
        mymap.value.getView().setCenter(transform(proj4(cgcs2000, wgs84, [row.midLine_Y, row.midLine_X]), 'EPSG:4326', 'EPSG:3857'))
      }
    }
    const getlines=()=>{
      data.isloading=true
      GetAllList_ProjectLineLc({ProjectId:-1}).then((res)=>{
        if(res?.length){
          data.prolines=res
          if(data.activetab=="项目一张图"){
            res.map((items,index)=>{
              let colors=(index % 2==0)?"#fcca00":"#1890ff";
              if(items.listLineData?.length){
                drawline(items.listLineData, colors)
                addpoint(items.listLineData, colors, items.lineId)
                addlinenameponit(items.listLineData[0], colors, items.lineName)
                if(index==0){
                  mymap.value.getView().setCenter(transform(proj4(cgcs2000, wgs84, [items.listLineData[0].midLine_Y, items.listLineData[0].midLine_X]), 'EPSG:4326', 'EPSG:3857'))
                }
              }
            })
          }
        }
        data.isloading=false
      })
    }
    const getpzdm=(row)=>{
      if(row?.length){
        if (mymap.value) {
          console.log(hotlayers.value)
          if(hotlayers.value){
            mymap.value.removeLayer(hotlayers.value)
          }
          heatpragram(row)
          addhotpoint(row,null,'hotlable')
          mymap.value.getView().setCenter(transform(proj4(cgcs2000, wgs84, [row[0].y, row[0].x]), 'EPSG:4326', 'EPSG:3857'))
        }
      }
     
    }
    function initMap() {
      if (mymap.value) {
        mymap.value.setTarget(null)
        mymap.value = null
      }
      // 地图实例
      mymap.value = new Map({
        target: 'onemap',                         // 对应页面里 id 为 map 的元素
        layers: [
          Layers.GeoVisLabel,                       // 图层
          Layers.BaseGroup,
          // Layers.ArcGISDarkBaseMap,
          // Layers.OverrunColorLine,
          // Layers.Points,
          // Layers.SelectedPoints,
          // Layers.Measure
        ],
        view: new View({
          Projection: "EPSG:4490",
          center: transform(proj4(cgcs2000, wgs84, [491098.925355087, 3565834.94530541]), 'EPSG:4326', 'EPSG:3857'),
          // center:transform([116.45371666666666, 39.860391666666665], 'EPSG:4326', 'EPSG:3857'),
          zoom: 16,
          enableRotation: false,
        }),
      })
      getlines()

      // drawline(XiangYu, "#fcca00")
      // drawline(XiangYu1, "#1890ff")
      // addpoint(XiangYu, "#1890ff", "XiangYu")
      // addpoint(XiangYu1, "#fcca00", "XiangYu1")
      // heatpragram(XiangYu1)
  
      mymap.value.addControl(
        new CoordinateInfoControl({
          projection: 'EPSG:4326',
        })
      )
      mymap.value.addControl(
        new MeasureControl({
          source: Sources.Measure,
          style: Styles.MeasureEditing,
        })
      )
      colorBar.value = new ColorBarControl()
      mymap.value.addControl(colorBar.value)
      mymap.value.addControl(
        new LayerControl({
          setStyle: changeBaseMap,
        })
      )
      emitter.emit(
        'layer-change',
        getAllLayers(mymap.value.getLayers().getArray())
      )
      mymap.value.getLayers().on('change', (e) => {
        const maps = e.target
        emitter.emit(
          'layer-change',
          getAllLayers(maps.getLayers().getArray())
        )
      })
      enterHitMode()
    }
    const hotlayers=ref(null)
    const heatpragram=(linelist)=>{
      let feas=[]
      linelist.map((item,index) => {
        let  fea = {
            "type": "Feature",
            "properties": {
              weight: index/(linelist.length-1)
            },
            "geometry": {
                "type": "Point",
                "coordinates": proj4(cgcs2000, wgs84, [item.y, item.x])
            }
        };
        feas.push(fea);
      })
      let heatData = {
        type: "FeatureCollection",
        features:feas
      }
      let myVector = new VectorSource({
          features: (new GeoJSONFormat()).readFeatures(heatData,{
            dataProjection : 'EPSG:4326',
            featureProjection : 'EPSG:3857'
          })
      });
      //定义热力图图层
      let vector = new Heatmap({
          source: myVector,
          blur: 2,
          radius: 10,
          zIndex: 41,
          gradient: ["#96f6be", "#fffe00", "#ff0000"]
        });
        hotlayers.value=vector
      mymap.value.addLayer(vector);

    }
    const addhotpoint = (linelist, color, name) => {
      if (linelist.length) {
        let source = new VectorSource()
        let layer = new VectorLayer({
          name: name,
          source: source,
          zIndex:41,
          visible:false
        })
        
        linelist.map((item) => {
          let pointFeature = new Feature({
            geometry: new Point(transform(proj4(cgcs2000, wgs84, [item.y, item.x]), 'EPSG:4326', 'EPSG:3857')), // 经纬度
            key: item.id,
          });
          pointFeature.setStyle(new Style({
            image: new CircleStyle({
              fill: new Fill({
                color: color
              }),
              width: 0,
              radius: 0
            }),
            text: new Text({
              font: 'normal 12px 黑体',
              // // 对其方式
              textAlign: 'center',
              // 基准线
              textBaseline: 'middle',
              offsetY: -25,
              offsetX: 0,
              backgroundFill: new Stroke({
                color: 'rgba(0,0,255,0.7)',
              }),
              // 文本填充样式
              fill: new Fill({
                color: 'rgba(236,218,20,1)'
              }),
              padding: [5, 5, 5, 5],
              text: `${item.deflectionDistance||item.fallingValue||0}`,
            }),
          }))
          source.addFeature(pointFeature)
          layer.setSource(source)
        })
        mymap.value.addLayer(layer)

        mymap.value.getView().on('change:resolution', function () {
          var zoom = mymap.value.getView().getZoom();
          let layers = mymap.value.getLayers().getArray()
          // console.log(zoom)
          if (zoom < 22) {
            layers.map((item) => {
              if (item.values_.name === name) {
                item.values_.visible = false
              }
            })
          } else {
            layers.map((item) => {
              if (item.values_.name === name) {
                item.values_.visible = true
              }
            })
          }
        });
      }
    }
    const addpoint = (linelist, color, name) => {
      if (linelist.length) {
        let source = new VectorSource()
        let layer = new VectorLayer({
          name: name,
          source: source,
          zIndex: 40,
        })
        
        linelist.map((item) => {
          let pointFeature = new Feature({
            geometry: new Point(transform(proj4(cgcs2000, wgs84, [item.midLine_Y, item.midLine_X]), 'EPSG:4326', 'EPSG:3857')), // 经纬度
            key: item.id,
          });
          pointFeature.setStyle(new Style({
            image: new CircleStyle({
              fill: new Fill({
                color: color
              }),
              width: 12,
              radius: 6
            }),
            text: new Text({
              font: 'normal 12px 黑体',
              // // 对其方式
              textAlign: 'center',
              // 基准线
              textBaseline: 'middle',
              offsetY: -25,
              offsetX: 0,
              backgroundFill: new Stroke({
                color: 'rgba(0,0,255,0.7)',
              }),
              // 文本填充样式
              fill: new Fill({
                color: 'rgba(236,218,20,1)'
              }),
              padding: [5, 5, 5, 5],
              text: `${item.mileage_K}`,
            }),
          }))
          source.addFeature(pointFeature)
          layer.setSource(source)
        })
        mymap.value.addLayer(layer)

        mymap.value.getView().on('change:resolution', function () {
          var zoom = mymap.value.getView().getZoom();
          let layers = mymap.value.getLayers().getArray()
          if (zoom < 14) {
            layers.map((item) => {
              if (item.values_.name === name) {
                item.values_.visible = false
              }
            })
          } else {
            layers.map((item) => {
              if (item.values_.name === name) {
                item.values_.visible = true
              }
            })
          }
        });
      }
    }
    const addlinenameponit=(item,color,name)=>{
      let source = new VectorSource()
        let layer = new VectorLayer({
          name: name,
          source: source,
          zIndex: 41,
        })
        let pointFeature = new Feature({
            geometry: new Point(transform(proj4(cgcs2000, wgs84, [item.midLine_Y, item.midLine_X]), 'EPSG:4326', 'EPSG:3857')), // 经纬度
            key: item.id,
          });
          pointFeature.setStyle(new Style({
            image: new CircleStyle({
              fill: new Fill({
                color: color
              }),
              width: 12,
              radius: 6
            }),
            text: new Text({
              font: 'normal 12px 黑体',
              // // 对其方式
              textAlign: 'center',
              // 基准线
              textBaseline: 'middle',
              offsetY: 20,
              offsetX: 60,
              backgroundFill: new Stroke({
                color: 'rgba(0,0,255,0.7)',
              }),
              // 文本填充样式
              fill: new Fill({
                color: 'rgba(236,218,20,1)'
              }),
              padding: [5, 5, 5, 5],
              text: `${name}`,
            }),
          }))
          source.addFeature(pointFeature)
          layer.setSource(source)
          mymap.value.addLayer(layer)
    }
    const drawline = (linelist, color) => {
      let LineStringlist = []
      linelist.map((item) => {
        LineStringlist.push(transform(proj4(cgcs2000, wgs84, [item.midLine_Y, item.midLine_X]), 'EPSG:4326', 'EPSG:3857'),)
      })
      let wireFeature = new Feature({
        geometry: new LineString(LineStringlist)
      });
      let vectorSource = new SourceLayer({
        features: [wireFeature]
      });
      let vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: 40,
        style: new Style({
          stroke: new Stroke({
            color: color,
            width: 4
          }),
        })
      });
      mymap.value.addLayer(vectorLayer)
    }
    const changeBaseMap = (val) => {
      const vector = 'streets'
      const satellite = 'satellite'
      const terrain = 'terrain'
      switch (val) {
        case vector:
          changeLayerVisible({ val: true, id: vector })
          changeLayerVisible({ val: false, id: satellite })
          changeLayerVisible({ val: false, id: terrain })
          break
        case satellite:
          changeLayerVisible({ val: true, id: satellite })
          changeLayerVisible({ val: false, id: vector })
          changeLayerVisible({ val: false, id: terrain })
          break
        case terrain:
          changeLayerVisible({ val: true, id: terrain })
          changeLayerVisible({ val: false, id: vector })
          changeLayerVisible({ val: false, id: satellite })
          break
      }
    }
    const changeLayerVisible = ({ val: visible, id: id }) => {
      if (!mymap.value) return
      mymap.value.getLayers().forEach((v) => {
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
        colorBar.value && colorBar.value.setDisplay(visible)
      }
    }
    const navigateTo = ({ lon, lat }) => {
      mymap.value
        .getView()
        .fit(
          new Point(
            transform([lon, lat], 'EPSG:4326', 'EPSG:3857')
          ).getExtent(),
          {
            maxZoom: 20,
          }
        )
    }
    const fitTo = (extent, delay, padding) => {
      extent = transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
      mymap.value.getView().fit(extent, {
        padding: padding ?? [200, 200, 200, 200],
        maxZoom: 20,
        duration: delay ?? 500,
      })
    }
    const destroyMap = () => {
      if (mymap.value) {
        mymap.value.setTarget(null)
        mymap.value = null
      }
    }
    const getAllLayers = (layerCollection) => {
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
    }
    const enterHitMode = () => {
      if (mymap.value) {
        mymap.value.on('singleclick', hitHandler)
        mymap.value.on('pointermove', hoverHandler)
      }
    }
    const exitHitMode = () => {
      if (mymap.value) {
        mymap.value.un('singleclick', hitHandler)
        mymap.value.un('pointermove', hoverHandler)
      }
    }
    const enterMeasureMode = (mode) => {
      exitMeasureMode()
      measure.value = Measure(mymap.value, mode)
      mymap.value.addInteraction(measure.value)
    }
    const exitMeasureMode = () => {
      if (measure.value && mymap.value) {
        mymap.value.removeInteraction(measure.value)
        measure.value = null
      }
    }
    const switchMode = (mode) => {
      switch (mode) {
        case MainModes.POINTER:
          exitMeasureMode()
          enterHitMode()
          break
        case MainModes.AREA:
        case MainModes.LENGTH:
          exitHitMode()
          enterMeasureMode(mode)
      }
    }
    const hoverHandler = (e) => {
      if (!Layers.Points.getVisible()) return
      Layers.Points.getFeatures(e.pixel).then((features) => {
        if (features.length > 0) {
          const feature = features[0]
          Layers.HoveredPointId = feature.getId()
          mymap.value.getTargetElement().style.cursor = 'pointer'
        } else {
          Layers.HoveredPointId = ''
          mymap.value.getTargetElement().style.cursor = 'auto'
        }
        Layers.SelectedPoints.changed()
      })
    }
    const hitHandler = (e) => {
      // 如果数据开关开着,关闭
      emitter.emit('close-if-layer-control-show')
      console.log('wot')
      if (!Layers.Points.getVisible()) return
      Layers.Points.getFeatures(e.pixel).then((features) => {
        if (features.length > 0) {
          const feature = features[0]
          // emit('set-current-point-id', feature.getId())
          Layers.HighlightPointId = feature.getId()
        } else {
          // emit('set-current-point-id', null)
          Layers.HighlightPointId = ''
        }
        Layers.SelectedPoints.changed()
      })
    }
    const mountBus = () => {
      emitter.on('map-navigate-to', navigateTo)
      emitter.on('map-fit-to', fitTo)
      emitter.on('map-switch-mode', switchMode)
      emitter.on('map-change-layer-visible', changeLayerVisible)
      emitter.on('map-change-base-map', changeBaseMap)
    }
    const unmountBus = () => {
      emitter.off('map-navigate-to', navigateTo)
      emitter.off('map-fit-to', fitTo)
      emitter.off('map-switch-mode', switchMode)
      emitter.off('map-change-layer-visible', changeLayerVisible)
      emitter.off('map-change-base-map', changeBaseMap)
    }
    onMounted(() => {
      initMap()
      mountBus()
    })
    onUnmounted(() => {
      destroyMap()
      unmountBus()
    })
    return { ...toRefs(data),formchange,getprojectrow,heatpragram,getpzdm,getrowclick,lcClick}
  }
})
</script>
<style lang="scss" scoped>
.onemapouter{
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 999;
  .one-map {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  }
  .contabbox{
    position: absolute;
    left: 20px;
    top: 10px;
    z-index: 3;
  }
  .projectouter{
    position: absolute;
    left: 20px;
    top: 60px;
    z-index: 3;
  }
}


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

:deep() {
  .ol-control {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    padding: 1px;
  }

  .ol-color-bar:hover {
    cursor: vertical-text;
  }

  .ol-color-bar {
    bottom: calc(30vh + 65px);
    right: 19.2px;
    width: 25px;
    margin: 1px;
    height: 180px;
    background-color: rgba(255, 255, 255, 0.1);
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
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25) !important;
    width: 95px;
    height: auto;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .ol-measure {
    top: 35px;
    right: 10px;
    z-index: 5;
  }

  .ol-weather {
    top: 180px;
    right: 10px;
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
    bottom: calc(15vh + 60px);
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
    top: 0px;
    z-index: -1;
    overflow: hidden;
  }

  .ol-layer-ctrl .list-type-map.open {
    width: 280px;
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

  .ol-box {
    box-sizing: border-box;
    border-radius: 2px;
    border: 1.5px solid rgb(179, 197, 219);
    background-color: rgba(255, 255, 255, 0.4);
  }

  .ol-mouse-position {
    top: 8px;
    right: 8px;
    position: absolute;
  }

  .ol-scale-line {
    background: rgba(0, 60, 136, 0.3);
    border-radius: 4px;
    bottom: 8px;
    left: 8px;
    padding: 2px;
    position: absolute;
  }

  .ol-scale-line-inner {
    border: 1px solid #eee;
    border-top: none;
    color: #eee;
    font-size: 10px;
    text-align: center;
    margin: 1px;
    will-change: contents, width;
    transition: all 0.25s;
  }

  .ol-scale-singlebar-even {
    background-color: #000000;
  }

  .ol-scale-singlebar-odd {
    background-color: #ffffff;
  }

  .ol-scale-bar {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  .ol-scale-step-marker {
    width: 1px;
    height: 15px;
    background-color: #000000;
    float: right;
    z-index: 10;
  }

  .ol-scale-step-text {
    position: absolute;
    bottom: -5px;
    font-size: 12px;
    z-index: 11;
    color: #000000;
    text-shadow: -2px 0 #FFFFFF, 0 2px #FFFFFF, 2px 0 #FFFFFF, 0 -2px #FFFFFF;
  }

  .ol-scale-text {
    position: absolute;
    font-size: 14px;
    text-align: center;
    bottom: 25px;
    color: #000000;
    text-shadow: -2px 0 #FFFFFF, 0 2px #FFFFFF, 2px 0 #FFFFFF, 0 -2px #FFFFFF;
  }

  .ol-scale-singlebar {
    position: relative;
    height: 10px;
    z-index: 9;
    box-sizing: border-box;
    border: 1px solid black;
  }

  .ol-unsupported {
    display: none;
  }

  .ol-viewport,
  .ol-unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .ol-viewport canvas {
    all: unset;
  }

  .ol-selectable {
    -webkit-touch-callout: default;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

  .ol-grabbing {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing;
  }

  .ol-grab {
    cursor: move;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
  }

  .ol-control {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    padding: 1px;
  }

  .ol-control:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }

  .ol-zoom {
    top: .5em;
    left: .5em;
    display: none;
  }

  .ol-rotate {
    top: .5em;
    right: .5em;
    transition: opacity .25s linear, visibility 0s linear;
  }

  .ol-rotate.ol-hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity .25s linear, visibility 0s linear .25s;
  }

  .ol-zoom-extent {
    top: 4.643em;
    left: .5em;
  }

  .ol-full-screen {
    right: .5em;
    top: .5em;
  }

  .ol-control button {
    display: block;
    margin: 1px;
    padding: 0;
    color: black;
    font-weight: bold;
    text-decoration: none;
    font-size: inherit;
    text-align: center;
    height: 3em;
    width: 3em;
    line-height: .4em;
    background-color: rgb(255, 255, 255);
    border: none;
    border-radius: 2px;
  }

  .ol-control button::-moz-focus-inner {
    border: none;
    padding: 0;
  }

  .ol-zoom-extent button {
    line-height: 1.4em;
  }

  .ol-compass {
    display: block;
    font-weight: normal;
    font-size: 1.2em;
    will-change: transform;
  }

  .ol-touch .ol-control button {
    font-size: 1.5em;
  }

  .ol-touch .ol-zoom-extent {
    top: 5.5em;
  }

  .ol-control button:hover {
    cursor: pointer;
    text-decoration: none;
    background-color: rgba(232, 231, 231, 0.7);
  }

  .ol-control button:focus {
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .ol-zoom .ol-zoom-in {
    border-radius: 2px 2px 0 0;
  }

  .ol-zoom .ol-zoom-out {
    border-radius: 0 0 2px 2px;
  }


  .ol-attribution {
    text-align: right;
    bottom: .5em;
    right: .5em;
    max-width: calc(100% - 1.3em);
    display: flex;
    flex-flow: row-reverse;
    align-items: center;
  }

  .ol-attribution a {
    color: rgba(0, 60, 136, 0.7);
    text-decoration: none;
  }

  .ol-attribution ul {
    margin: 0;
    padding: 1px .5em;
    color: #000;
    text-shadow: 0 0 2px #fff;
    font-size: 12px;
  }

  .ol-attribution li {
    display: inline;
    list-style: none;
  }

  .ol-attribution li:not(:last-child):after {
    content: " ";
  }

  .ol-attribution img {
    max-height: 2em;
    max-width: inherit;
    vertical-align: middle;
  }

  .ol-attribution button {
    flex-shrink: 0;
  }

  .ol-attribution.ol-collapsed ul {
    display: none;
  }

  .ol-attribution:not(.ol-collapsed) {
    background: rgba(255, 255, 255, 0.8);
  }

  .ol-attribution.ol-uncollapsible {
    bottom: 0;
    right: 0;
    border-radius: 4px 0 0;
  }

  .ol-attribution.ol-uncollapsible img {
    margin-top: -.2em;
    max-height: 1.6em;
  }

  .ol-attribution.ol-uncollapsible button {
    display: none;
  }

  .ol-zoomslider {
    top: 4.5em;
    left: .5em;
    height: 200px;
  }

  .ol-zoomslider button {
    position: relative;
    height: 10px;
  }

  .ol-touch .ol-zoomslider {
    top: 5.5em;
  }

  .ol-overviewmap {
    left: 0.5em;
    bottom: 0.5em;
  }

  .ol-overviewmap.ol-uncollapsible {
    bottom: 0;
    left: 0;
    border-radius: 0 4px 0 0;
  }

  .ol-overviewmap .ol-overviewmap-map,
  .ol-overviewmap button {
    display: block;
  }

  .ol-overviewmap .ol-overviewmap-map {
    border: 1px solid #7b98bc;
    height: 150px;
    margin: 2px;
    width: 150px;
  }

  .ol-overviewmap:not(.ol-collapsed) button {
    bottom: 2px;
    left: 2px;
    position: absolute;
  }

  .ol-overviewmap.ol-collapsed .ol-overviewmap-map,
  .ol-overviewmap.ol-uncollapsible button {
    display: none;
  }

  .ol-overviewmap:not(.ol-collapsed) {
    background: rgba(255, 255, 255, 0.8);
  }

  .ol-overviewmap-box {
    border: 2px dotted rgba(0, 60, 136, 0.7);
  }

  .ol-overviewmap .ol-overviewmap-box:hover {
    cursor: move;
  }

}
</style>
  