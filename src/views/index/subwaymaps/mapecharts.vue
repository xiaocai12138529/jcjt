<template>
  <div class="mapecharts">
    <div class="topleftbox">
      <div class="lablelist" v-for="(item, index) in lineList" :key="item.ID">
        <span :style="{ background: colorarr[index] }"></span>
        <span>{{ item.NAME }}</span>
      </div>
    </div>
    <div class="chartbox" id="myChart"></div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { MP } from './map'
import { mapStyleBrown } from './featuretype'
import { redPoint } from './mapBase64'
const until = require('@/utils/wgs2bd09')
import proj4 from 'proj4'
var wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs  '
var cgcs2000 = '+proj=tmerc +lat_0=0 +lon_0=111.833333 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs'
import { GetAllList_ProjectLine } from '@/api/interface/map'
export default defineComponent({
  name: 'MAPS',
  setup() {
    const myMap = ref()
    const busline = ref()
    const maplines = ref([])
    const labelarr = ref([])
    const colorarr = ref(['#eb4933', '#73fe24', '#4155c6', '#ff7e79', '#fecc53', '#8dc0ff', '#7991ff'])
    const lineList = ref([])
    const init = () => {
      MP().then((BMapGL) => {
        myMap.value = new BMapGL.Map('myChart')
        // 初始化地图,设置中心点坐标和地图级别
        myMap.value.centerAndZoom(new BMapGL.Point(106.114129, 30.150339), 5)

        myMap.value.setMapStyleV2({ styleJson: mapStyleBrown })
        myMap.value.enableScrollWheelZoom()
        myMap.value.addEventListener('zoomend', function () {
          let zoom = myMap.value.getZoom()
          if (labelarr.value.length > 0) {
            if (zoom >= 14) {
              labelarr.value.map((item) => {
                item.show()
              })
            } else {
              labelarr.value.map((item) => {
                item.hide()
              })
            }
          }
        })
        labelarr.value = []
        function makepoints(arr, icons) {
          let pointArr = []
          arr.map((item) => {
            let lngandlat = proj4(cgcs2000, wgs84, [item.midLine_Y, item.midLine_X])
            let latlon = until.wgs2bd(lngandlat[1], lngandlat[0])
            pointArr.push(new BMapGL.Point(latlon.lon, latlon.lat))
          })
          let myIcon = new BMapGL.Icon(icons, new BMapGL.Size(12, 12), {
            imageOffset: new BMapGL.Size(0, 0),
          })
          let newlistlength = pointArr.length
          for (let i = 0; i < newlistlength; i++) {
            //  添加mar
            const marker = new BMapGL.Marker(pointArr[i], { icon: myIcon })
            marker.setTitle(arr[i].NAME)
            //  添加label
            let mylabel = null
            mylabel = new BMapGL.Label(arr[i].NAME, {
              position: pointArr[i],
              offset: new BMapGL.Size(10, -10),
            })
            mylabel.setStyle({
              color: '#ffffff',
              borderColor: '#2b468d',
              backgroundColor: '#041644',
              fontSize: '12px',
              padding: '0 4px',
              borderRadius: '4px',
            })
            labelarr.value.push(mylabel)
            myMap.value.addOverlay(mylabel)
            myMap.value.addOverlay(marker)
          }
        }
        maplines.value.map((items) => {
          if (items.listLineData && items.listLineData.length > 0) {
            makepoints(items.listLineData, redPoint)
          }
        })
      })
    }
    onMounted(() => {
      GetAllList_ProjectLine().then((res) => {
        if (res?.length) {
          res.map((item) => {
            if (item.listLineData && item.listLineData.length > 0) {
              item.listLineData.map((items) => {
                items.NAME = item?.lineName
              })
            }
          })
          maplines.value = res
          init()
        } else {
          maplines.value = []
        }
      })
    })
    return { myMap, busline, lineList, colorarr }
  },
})
</script>

<style lang="scss" scoped>
.mapecharts {
  width: 100%;
  height: 100%;
  position: relative;

  .topleftbox {
    padding: 10px 20px;
    background-color: rgb(2, 34, 95, 50%);
    top: 0;
    left: 0;
    position: absolute;
    z-index: 99999;

    .lablelist {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      height: 24px;

      span:nth-child(1) {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      span:nth-child(2) {
        font-size: 14px;
        color: #40edfc;
        margin-left: 10px;
      }
    }
  }

  .chartbox {
    width: 100%;
    height: 100%;
    background: #070a2a;
  }
}

:deep() .BMap_Marker {
  background: none !important;
}

:deep() .anchorBL {
  display: none !important;
}
</style>
