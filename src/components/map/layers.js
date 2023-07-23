import {
  Group,
  Tile as TileLayer,
  Vector as VectorLayer,
  VectorTile as VectorTileLayer,
  WebGLTile as WebGLTileLayer,
} from "ol/layer";
import {
  Cluster as ClusterSource,
  ImageArcGISRest,
  Vector as VectorSource,
  VectorTile as VectorTileSource,
  XYZ,
} from "ol/source";
import {
  GeoJSON as GeoJSONFormat,
  MVT as MVTFormat,
  // WKB as WKBFormat,
} from "ol/format";
import { stringify as qs_stringify } from "qs";
import {
  getRailLineColor,
  PickPointColor,
  ResolutionConfig,
  Styles,
} from "@/components/map/styles";
import short from "short-uuid";
import {
  addCoordinateTransforms,
  addProjection,
  Projection,
  get as getProjection,
} from "ol/proj";
import ImageLayer from "ol/layer/Image";
import { getWidth } from "ol/extent";
import dayjs from "dayjs";

const MVT = new MVTFormat({
  idProperty: "id",
});
const GeoJSON = new GeoJSONFormat();
// const WKB = new WKBFormat({
//   splitCollection: true,
//   srid: 3857,
// });
const EPSG3857 = "EPSG:3857";
// const EPSG4326 = "EPSG:4326";
export const EPSG = {
  4326: "EPSG:4326",
  3857: "EPSG:3857",
};

const isProduct = process.env.NODE_ENV === "production";
// const baseEndpoint = process.env.VUE_APP_API_ROOT;
const baseEndpoint = isProduct ? process.env.VUE_APP_API_ROOT + "" : "/api/";

const SourceURLType = {
  MVT: "mvt",
  GeoJSON: "geojson",
  WKB: "wkb",
};

export class SourceURL {
  constructor(route, params = null, urlType = SourceURLType.MVT) {
    this.route = route;
    this.params = params;
    this.urlType = urlType;

    this.urlType = "/mvt/{z}/{x}/{y}.mvt?";
    if (urlType !== SourceURLType.MVT) this.urlType = "/geojson?";
  }

  Value = () =>
    baseEndpoint +
    this.route +
    this.urlType +
    qs_stringify(this.params, { arrayFormat: "repeat" });
}

export class defaultURLs {
  static Overrun = new SourceURL(
    "stats/overrun",
    { type: "MultiLine" },
    SourceURLType.MVT
  );
  static OverrunGeoJSON = new SourceURL(
    "stats/overrun",
    {},
    SourceURLType.GeoJSON
  );
  static RailLines = new SourceURL("rail/line", {});
  static Points = new SourceURL("rail/point", {});
  // static PointsCluster = new SourceURL("/data/point", {railLineIds: []}, SourceURLType.GeoJSON);
  static PointsCluster = new SourceURL(
    "stats/point/overrun",
    { statsType: 1, valueType: 1 },
    SourceURLType.GeoJSON
  );
}

export class LayerIndexes {
  static BaseMap = 1;
  static Annotation = 6;
  static Vector = 20;
  static Measure = 90;
  static Line = 19;
}

const resolutions = new Array(19);
const matrixIds = new Array(19);
const projectionExtent = getProjection("EPSG:3857").getExtent();
for (let z = 0; z < 19; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = getWidth(projectionExtent) / Math.pow(2, z);
  matrixIds[z] = z;
}
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 2);
const yesterdayStr = dayjs(yesterday).format("YYYY-MM-DD");
export class Sources {
  //     "https://gibs-c.earthdata.nasa.gov/wmts/epsg3857/best/IMERG_Precipitation_Rate/default/2022-07-23/GoogleMapsCompatible_Level6/{z}/{x}/{y}.png",
  static NASARain = new XYZ({
    url: `https://gibs-c.earthdata.nasa.gov//wmts/epsg3857/best/IMERG_Precipitation_Rate/default/${yesterdayStr}/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png`,
    projection: "EPSG:3857",
    tileSize: 256,
  });
  static NASACloud = new XYZ({
    url: `https://gibs-b.earthdata.nasa.gov//wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/2022-07-15/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
    projection: "EPSG:3857",
    tileSize: 256,
  });

  static GeoVisLabel = new XYZ({
    url: `https://tiles{1-3}.geovisearth.com/base/v1/cia/{z}/{x}/{y}?token=752f38d83dd91c53614c0e433af64b8462897e63f6e9c7bd6ebbb46d834a5da0\t`,
    projection: "EPSG:3857",
  });
  static ArcGISImagine = new XYZ({
    url: "https://hys.crdc.com:6081/LWHJ/getTiles/Tile/GetTile_ex_ces?tilepath=~/Data/LWHJ/JN/tiles/tiles&x={x}&y={y}&z={z}",
    projection: "EPSG:3857",
    tileSize: 256,
  });
  static ArcGISLine = new ImageArcGISRest({
    url: "https://hys.crdc.com:6080/arcgis/rest/services/BJ_MAPS/RailBaseMap_BJ/MapServer",
    // url: "https://hys.crdc.com:6080/arcgis/rest/services/GZ_V2/BaseMap_GZ/MapServer",
    ratio: 1,
    params: {
      LAYERS: "show:0,1,3",
      LAYERDEFS: JSON.stringify({
        // 0: "XLID in (1,2,3,4,5,6,7,8,9,10)",
        // 1: "XLID in (1,2,3,4,5,6,7,8,9,10)",
        // 3: "XLID in (1,2,3,4,5,6,7,8,9,10)",
      }),
    },
    projection: EPSG3857,
  });
  static ArcGISLineJinan = new ImageArcGISRest({
    url: "https://hys.crdc.com:6080/arcgis/rest/services/JN_Maps/BaseMap_JN/MapServer",
    // url: "https://hys.crdc.com:6080/arcgis/rest/services/GZ_V2/BaseMap_GZ/MapServer",
    ratio: 1,
    params: {
      LAYERS: "show:0,1,2,3",
      LAYERDEFS: JSON.stringify({
        // 0: "XLID in (1,2,3,4,5,6,7,8,9,10)",
        // 1: "XLID in (1,2,3,4,5,6,7,8,9,10)",
        // 3: "XLID in (1,2,3,4,5,6,7,8,9,10)",
      }),
    },
    projection: EPSG3857,
  });
  static ArcGISLineZhenghe = new ImageArcGISRest({
    url: "https://hys.crdc.com:6080/arcgis/rest/services/ZH_Maps/BaseMap_ZH/MapServer",
    // url: "https://hys.crdc.com:6080/arcgis/rest/services/GZ_V2/BaseMap_GZ/MapServer",
    ratio: 1,
    params: {
      LAYERS: "show:0,1,2,3",
      LAYERDEFS: JSON.stringify({
        // 0: "XLID in (1,2,3,4,5,6,7,8,9,10)",
        // 1: "XLID in (1,2,3,4,5,6,7,8,9,10)",
        // 3: "XLID in (1,2,3,4,5,6,7,8,9,10)",
      }),
    },
    projection: EPSG3857,
  });
  static Selection = new VectorSource({
    projection: EPSG3857,
  });
  static RailLines = new VectorTileSource({
    format: MVT,
    url: defaultURLs.RailLines.Value(),
  });
  static OverrunColor = new VectorTileSource({
    format: MVT,
    url: defaultURLs.Overrun.Value(),
  });
  static OverrunColorLine = new VectorSource({
    format: GeoJSON,
    url: defaultURLs.OverrunGeoJSON.Value(),
  });
  static Points = new VectorTileSource({
    format: MVT,
    url: defaultURLs.Points.Value(),
  });
  static PointsClusterGeoJSON = new VectorSource({
    format: GeoJSON,
    url: defaultURLs.PointsCluster.Value(),
  });
  static PointsCluster = new ClusterSource({
    // 越大类越少
    distance: 30,
    // 不能超过distance
    minDistance: 10,
    source: this.PointsClusterGeoJSON,
  });
  static Measure = new VectorSource();
}

// const MapboxToken =
//   "pk.eyJ1IjoieXVoYW5nY2giLCJhIjoiY2p6N3lkejF2MG42czNobWk0NnF1bWh4cyJ9.82POjItgasimRI1LipAnSQ";
const TianMapToken = "e2ab7df84b548904e0047f2d189987bd";
const TianMapURL = (type) =>
  `https://t${Math.round(
    Math.random() * 7
  )}.tianditu.gov.cn/DataServer?T=${type}_w&x={x}&y={y}&l={z}&tk=${TianMapToken}`;

export class Layers {
  static Selection = new VectorLayer({
    renderMode: "vector",
    source: Sources.Selection,
  });
  static NASARain = new WebGLTileLayer({
    layerId: "rain",
    visible: false,
    source: Sources.NASARain,
    zIndex: LayerIndexes.Vector,
    preload: 5,
    opacity: 0.6,
  });
  static NASACloud = new WebGLTileLayer({
    layerId: "cloud",
    visible: false,
    source: Sources.NASACloud,
    preload: 5,
    zIndex: LayerIndexes.Vector,
    opacity: 0.6,
  });
  static GeoVisLabel = new TileLayer({
    controllable: true,
    layerId: "geovis-label",
    title: "底图注记",
    source: Sources.GeoVisLabel,
    zIndex: LayerIndexes.BaseMap + 5,
  });
  static ArcGISDarkBaseMap = new TileLayer({
    layerId: short.generate(),
    preload: 3,
    source: new XYZ({
      url: TianMapURL("img"),
      // url: `https://maponline3.bdimg.com/tile/?qt=vtile&x={x}&y={-y}&z={z}&styles=pl&udt=20210108&scaler=1&showtext=1`,
      // url: `https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}`,
      maxZoom: 18,
    }),
    title: "天地图影像",
  });
  static AMapLabel = () => {
    const gcj02Extent = [
      -20037508.342789244, -20037508.342789244, 20037508.342789244,
      20037508.342789244,
    ];
    const gcjMecator = new Projection({
      code: "GCJ-02",
      extent: gcj02Extent,
      units: "m",
    });
    addProjection(gcjMecator);
    var forEachPoint = function (func) {
      return function (input, opt_output, opt_dimension) {
        var len = input.length;
        var dimension = opt_dimension ? opt_dimension : 2;
        var output;
        if (opt_output) {
          output = opt_output;
        } else {
          if (dimension !== 2) {
            output = input.slice();
          } else {
            output = new Array(len);
          }
        }
        for (var offset = 0; offset < len; offset += dimension) {
          func(input, output, offset);
        }
        return output;
      };
    };
    var gcj02 = {};
    // var i = 0;
    var PI = Math.PI;
    var AXIS = 6378245.0;
    var OFFSET = 0.00669342162296594323; // (a^2 - b^2) / a^2

    function delta(wgLon, wgLat) {
      var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
      var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
      var radLat = (wgLat / 180.0) * PI;
      var magic = Math.sin(radLat);
      magic = 1 - OFFSET * magic * magic;
      var sqrtMagic = Math.sqrt(magic);
      dLat =
        (dLat * 180.0) / (((AXIS * (1 - OFFSET)) / (magic * sqrtMagic)) * PI);
      dLon = (dLon * 180.0) / ((AXIS / sqrtMagic) * Math.cos(radLat) * PI);
      return [dLon, dLat];
    }

    function outOfChina(lon, lat) {
      if (lon < 72.004 || lon > 137.8347) {
        return true;
      }
      if (lat < 0.8293 || lat > 55.8271) {
        return true;
      }
      return false;
    }

    function transformLat(x, y) {
      var ret =
        -100.0 +
        2.0 * x +
        3.0 * y +
        0.2 * y * y +
        0.1 * x * y +
        0.2 * Math.sqrt(Math.abs(x));
      ret +=
        ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) /
        3.0;
      ret +=
        ((160.0 * Math.sin((y / 12.0) * PI) + 320 * Math.sin((y * PI) / 30.0)) *
          2.0) /
        3.0;
      return ret;
    }

    function transformLon(x, y) {
      var ret =
        300.0 +
        x +
        2.0 * y +
        0.1 * x * x +
        0.1 * x * y +
        0.1 * Math.sqrt(Math.abs(x));
      ret +=
        ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) /
        3.0;
      ret +=
        ((150.0 * Math.sin((x / 12.0) * PI) +
          300.0 * Math.sin((x / 30.0) * PI)) *
          2.0) /
        3.0;
      return ret;
    }

    gcj02.toWGS84 = forEachPoint(function (input, output, offset) {
      var lng = input[offset];
      var lat = input[offset + 1];
      if (!outOfChina(lng, lat)) {
        var deltaD = delta(lng, lat);
        lng = lng - deltaD[0];
        lat = lat - deltaD[1];
      }
      output[offset] = lng;
      output[offset + 1] = lat;
    });

    gcj02.fromWGS84 = forEachPoint(function (input, output, offset) {
      var lng = input[offset];
      var lat = input[offset + 1];
      if (!outOfChina(lng, lat)) {
        var deltaD = delta(lng, lat);
        lng = lng + deltaD[0];
        lat = lat + deltaD[1];
      }
      output[offset] = lng;
      output[offset + 1] = lat;
    });

    var sphericalMercator = {};

    var RADIUS = 6378137;
    var MAX_LATITUDE = 85.0511287798;
    var RAD_PER_DEG = Math.PI / 180;

    sphericalMercator.forward = forEachPoint(function (input, output, offset) {
      var lat = Math.max(
        Math.min(MAX_LATITUDE, input[offset + 1]),
        -MAX_LATITUDE
      );
      var sin = Math.sin(lat * RAD_PER_DEG);

      output[offset] = RADIUS * input[offset] * RAD_PER_DEG;
      output[offset + 1] = (RADIUS * Math.log((1 + sin) / (1 - sin))) / 2;
    });

    sphericalMercator.inverse = forEachPoint(function (input, output, offset) {
      output[offset] = input[offset] / RADIUS / RAD_PER_DEG;
      output[offset + 1] =
        (2 * Math.atan(Math.exp(input[offset + 1] / RADIUS)) - Math.PI / 2) /
        RAD_PER_DEG;
    });

    var projzh = {};
    projzh.ll2gmerc = function (input, opt_output, opt_dimension) {
      let output = gcj02.fromWGS84(input, opt_output, opt_dimension);
      return projzh.ll2smerc(output, output, opt_dimension);
    };
    projzh.gmerc2ll = function (input, opt_output, opt_dimension) {
      let output = projzh.smerc2ll(input, input, opt_dimension);
      return gcj02.toWGS84(output, opt_output, opt_dimension);
    };
    projzh.smerc2gmerc = function (input, opt_output, opt_dimension) {
      let output = projzh.smerc2ll(input, input, opt_dimension);
      output = gcj02.fromWGS84(output, output, opt_dimension);
      return projzh.ll2smerc(output, output, opt_dimension);
    };
    projzh.gmerc2smerc = function (input, opt_output, opt_dimension) {
      let output = projzh.smerc2ll(input, input, opt_dimension);
      output = gcj02.toWGS84(output, output, opt_dimension);
      return projzh.ll2smerc(output, output, opt_dimension);
    };

    projzh.ll2smerc = sphericalMercator.forward;
    projzh.smerc2ll = sphericalMercator.inverse;
    addCoordinateTransforms(
      "EPSG:4326",
      gcjMecator,
      projzh.ll2gmerc,
      projzh.gmerc2ll
    );
    addCoordinateTransforms(
      "EPSG:3857",
      gcjMecator,
      projzh.smerc2gmerc,
      projzh.gmerc2smerc
    );
    let tdtAnno = new TileLayer({
      layerId: "base-label",
      preload: 2,
      controllable: true,
      title: "底图注记",
      zIndex: LayerIndexes.Annotation,
      source: new XYZ({
        url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?scl=1&lang=zh_cn&size=1&style=8&x={x}&y={y}&z={z}",
        //url: 'https://t4'+
        //'.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=b719023f72eaa74da827036e20bdad41',
        maxZoom: 18,
        projection: gcjMecator,
      }),
      opacity: 1,
    });
    tdtAnno.setZIndex(12);
    return tdtAnno;
  };

  static ArcGISLine = new ImageLayer({
    controllable: true,
    title: "北京局线位",
    layerId: "line-bj",
    crossOrigin: "anonymous",
    source: Sources.ArcGISLine,
    zIndex: LayerIndexes.Line,
  });
  static ArcGISLineJinan = new ImageLayer({
    controllable: true,
    title: "济南局线位",
    layerId: "line-济南",
    crossOrigin: "anonymous",
    source: Sources.ArcGISLineJinan,
    zIndex: LayerIndexes.Line,
  });
  static ArcGISLineZhenghe = new ImageLayer({
    controllable: true,
    title: "郑合线位",
    layerId: "line-zhenghe",
    crossOrigin: "anonymous",
    source: Sources.ArcGISLineZhenghe,
    zIndex: LayerIndexes.Line,
  });

  static ArcGISLine1 = new ImageLayer({
    controllable: true,
    title: "北京局线位",
    layerId: "line-bj",
    crossOrigin: "anonymous",
    source: Sources.ArcGISLine,
    zIndex: LayerIndexes.Line,
  });
  static ArcGISLineJinan1 = new ImageLayer({
    controllable: true,
    title: "济南局线位",
    layerId: "line-济南",
    crossOrigin: "anonymous",
    source: Sources.ArcGISLineJinan,
    zIndex: LayerIndexes.Line,
  });
  static ArcGISLineZhenghe1 = new ImageLayer({
    controllable: true,
    title: "郑合线位",
    layerId: "line-zhenghe",
    crossOrigin: "anonymous",
    source: Sources.ArcGISLineZhenghe,
    zIndex: LayerIndexes.Line,
  });
  static ArcGISImagine = new WebGLTileLayer({
    controllable: true,
    title: "济南局影像",
    layerId: "line-jn-imagine",
    crossOrigin: "anonymous",
    source: Sources.ArcGISImagine,
    zIndex: LayerIndexes.Line - 10,
  });

  static BaseGroup = new Group({
    // zIndex: LayerIndexes.BaseMap,
    title: "底图",
    baseLayer: true,
    layers: [
      new WebGLTileLayer({
        projection: EPSG["3857"],
        layerId: "satellite",
        preload: 3,
        zIndex: LayerIndexes.BaseMap,
        source: new XYZ({
          url: TianMapURL("img"),
          // url: `https://maponline3.bdimg.com/tile/?qt=vtile&x={x}&y={-y}&z={z}&styles=pl&udt=20210108&scaler=1&showtext=1`,
          // url: `https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}`,
          // url: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=${MapboxToken}`,
          maxZoom: 18,
        }),
        title: "base-satellite",
      }),
      // Layers.AMapLabel(),
      new TileLayer({
        title: "地形",
        visible: false,
        layerId: "terrain",
        maxZoom: 11,
        source: new XYZ({
          url: "https://tiles{1-3}.geovisearth.com/base/v1/ter/{z}/{x}/{y}?token=752f38d83dd91c53614c0e433af64b8462897e63f6e9c7bd6ebbb46d834a5da0",
        }),
      }),
      new TileLayer({
        visible: false,
        layerId: "streets",
        source: new XYZ({
          // url: "https://tiles{1-3}.geovisearth.com/base/v1/vec/{z}/{x}/{y}?&token=752f38d83dd91c53614c0e433af64b8462897e63f6e9c7bd6ebbb46d834a5da0",
          url: TianMapURL("vec"),
          maxZoom: 18,
        }),
        title: "base-vector",
      }),
    ],
  });
  static HoveredRailLineId = "";
  static HoveredRailLine = new VectorTileLayer({
    title: "鼠标悬停线路高亮",
    selectable: true,
    controllable: false,
    layerId: short.generate(),
    renderMode: "vector",
    source: Sources.RailLines,
    style: function (feature) {
      if (feature.getId() === Layers.HoveredRailLineId) {
        return Styles.RailLineHoverStyle;
      }
    },
  });
  static RailLines = new VectorTileLayer({
    title: "线路",
    selectable: true,
    controllable: true,
    layerId: short.generate(),
    source: Sources.RailLines,
    maxZoom: 16,
    declutter: true,
    style: (feature, r) => {
      var name = feature.get("name");
      if (r < 500) name = name.split("").join("     ");
      let style = Styles.RailLine(getRailLineColor(feature.getId()));
      style.getText().setText(name);
      return style;
    },
  });
  static OverrunColorMap = new VectorTileLayer({
    title: "线路沉降热力图",
    maxZoom: 16,
    selectable: true,
    controllable: true,
    layerId: short.generate(),
    source: Sources.OverrunColor,
    zIndex: LayerIndexes.Vector,
    // declutter: true,
    // style: (feature, r) => {
    //   var name = feature.get("name")
    //   if (r < 500)
    //     name = name.split('').join('     ')
    //   Styles.RailLine.getText().setText(name);
    //   return Styles.RailLine;
    // }
    style: (f) => Styles.OverrunColorMap(f),
  });
  static OverrunColorLine = new VectorLayer({
    title: "线路沉降热力图",
    // maxZoom: 16,
    selectable: true,
    controllable: true,
    visible: true,
    layerId: "color-map",
    // minZoom: 10,
    source: Sources.OverrunColorLine,
    zIndex: LayerIndexes.Vector,
    style: Styles.OverrunColorLine,
  });
  static PointsCluster = new VectorLayer({
    className: "cluster-layer",
    title: "点聚类图",
    selectable: true,
    controllable: true,
    zIndex: LayerIndexes.Vector,
    layerId: short.generate(),
    source: Sources.PointsCluster,
    style: Styles.PointsCluster,
    minZoom: 12,
    maxZoom: 18,
    // minResolution: ResolutionConfig.switchFromClusterToPoint,
  });
  static HoveredPointId = "";
  static HighlightPointId = "";
  static SelectedPoints = new VectorTileLayer({
    title: "点位高亮",
    selectable: true,
    controllable: false,
    className: "hightlight",
    layerId: short.generate(),
    renderMode: "vector",
    visible: true,
    source: Sources.Points,
    zIndex: LayerIndexes.Vector + 1,
    style: function (feature) {
      if (
        feature.getId() === Layers.HoveredPointId ||
        feature.getId() === Layers.HighlightPointId
      ) {
        return Styles.PointHoverStyle;
      }
    },
  });
  static Points = new VectorTileLayer({
    title: "点位",
    selectable: true,
    controllable: true,
    // renderMode: "vector",
    layerId: short.generate(),
    declutter: true,
    zIndex: LayerIndexes.Vector,
    maxResolution: ResolutionConfig.switchFromClusterToPoint,
    source: Sources.Points,
    style: (feature, resolution) => {
      if (resolution > ResolutionConfig.switchFromClusterToPoint)
        return Styles.Points;
      let type = feature.get("type");
      // const highlight = this.HoveredPointId === id || this.HightlightPointId === id
      // console.log(this.HoveredPointId,id)
      const style = PickPointColor(type);
      // const style =  highlight ? Styles.PointHoverStyle : PickPointColor(type);
      style.getText().setText(feature.get("name"));
      return style;
    },
  });

  static Measure = new VectorLayer({
    zIndex: LayerIndexes.Measure,
    source: Sources.Measure,
    style: Styles.Measure,
  });
}
