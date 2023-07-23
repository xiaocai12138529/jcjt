<template>
  <div class="map-container">
    <div id="map-ref"></div>
  </div>
</template>

<script>
import { Map } from 'ol'
import { Layers } from '@/components/map/layers'
import View from 'ol/View'
import { transform } from 'ol/proj'

export default {
  name: 'main-map',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.map = new Map({
        target: 'map-ref',
        controls: [],
        layers: [
          // Layers.ArcGISLineZhenghe1,
          // Layers.ArcGISLineJinan1,
          // Layers.ArcGISLine1,
          Layers.ArcGISDarkBaseMap,
          // Layers.BaseGroup,
        ],
        view: new View({
          // center: [116.08572146300406, 30.446470225414302],
          center: transform([116.2, 39.4], 'EPSG:4326', 'EPSG:3857'),
          zoom: 5,
          enableRotation: false,
          // projection: "EPSG:3857",
        }),
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#map-ref {
  position: absolute;
  width: 100%;
  top: 30px;
  //padding: 2vh;
  height: calc(100% - 30px);
}

.map-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
