import Style from "ol/style/Style";
import { Circle, Fill, RegularShape, Stroke, Text } from "ol/style";
import Gradient from "javascript-color-gradient";
// import { LayerIndexes } from "@/components/map/layers";

export class ResolutionConfig {
  static PointLabelVisible = 0.1;
  static switchFromClusterToPoint = 18;
  static DistrictCityLabelVisible = 350;
  static DistrictCountyLabelVisible = 150;
  static OverrunCluster = 1;
}

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

const gradientArray = new Gradient()
  .setColorGradient("#96f6be", "#fffe00", "#ff0000")
  .setMidpoint(100)
  .getColors();
const gradientStyle = gradientArray.map((color) => {
  color = hexToRGB(color, 1);
  return new Style({
    image: new RegularShape({
      // fill: fill,
      fill: new Fill({
        color: color,
      }),
      // stroke: stroke,
      points: 6,
      radius: 4,
      angle: Math.PI / 6,
    }),
    // new Circle({
    // radius: 2,
    // stroke: new Stroke({
    //   color: color,
    //   width: 1
    // }),
    //   fill: new Fill({
    //     color: color
    //   })
    // }),
  });
});

const getOverrunColorStyle = (value) => {
  if (value >= 0) return gradientStyle[0];
  // value = Math.floor(value * -100);
  if (value <= -0.6) return gradientStyle[99];
  value = -1 * value;
  let percent = Math.round((value / 0.6) * 100);
  if (percent > 99) percent = 99;

  return gradientStyle[percent];
};
const getOverrunColorPercent = (value) => {
  if (value >= 0) return 0;
  // value = Math.floor(value * -100);
  if (value <= -0.6) return 99;
  value = -1 * value;
  let percent = Math.round((value / 0.6) * 100);
  if (percent > 99) percent = 99;

  return percent;
};

class PointColors {
  static Control = "#d2d9f2";
  static BenchMark = "#ffff00";
  static SettlementMark = "#00ffFF";
}

const PointColorStyles = [
  PointColors.Control,
  PointColors.BenchMark,
  PointColors.SettlementMark,
].map(
  (color) =>
    new Style({
      image: new Circle({
        radius: 6,
        stroke: new Stroke({
          color: color,
          width: 3,
        }),
      }),
      text: new Text({
        // offsetX: 15,
        offsetY: 20,
        font: "14px KaiTi",
        fill: new Fill({
          color: "#00FFFF",
        }),
        backgroundFill: new Fill({
          color: [0, 0, 0, 0.5],
        }),
      }),
    })
);
export const PickPointColor = (type) => PointColorStyles[type - 1];

const clusterStyleCache = {};
export const randomColor = (() => {
  "use strict";

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return () => {
    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };
})();
export const getRailLineColor = (lineName) => {
  lineName = "ok";
  if (Styles.RailLineColors[lineName]) {
    return Styles.RailLineColors[lineName];
  } else {
    Styles.RailLineColors[lineName] = randomColor();
    return Styles.RailLineColors[lineName];
  }
};

export class Styles {
  static KmTag = new Style({
    text: new Text({
      font: "bold 14px Calibri,sans-serif",
      fill: new Fill({
        color: "#000",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 3,
      }),
      offsetY: -15,
    }),
  });
  static RailLineHoverStyle = new Style({
    stroke: new Stroke({
      color: "#00eeee",
      lineCap: "round",
      lineJoin: "bevel",
      width: 6,
      zIndex: 10009,
    }),
  });

  static RailLineColors = {};
  static RailLine = (color) =>
    new Style({
      stroke: new Stroke({
        color: color,
        lineCap: "round",
        lineJoin: "bevel",
        width: 4,
        zIndex: 10009,
        // lineDash: [10, 10]
      }),
      text: new Text({
        declutter: true,
        // overflow:true,
        // offsetX: 15,
        // offsetY: -30,
        font: "bold 20px KaiTi",
        scale: 1.0,
        // font: "14px KaiTi",
        placement: "line",
        textBaseline: "middle",
        fill: new Fill({
          color: "rgb(255, 70, 131)",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 3,
        }),
      }),
    });
  static PointHoverStyle = new Style({
    image: new Circle({
      radius: 6,
      stroke: new Stroke({
        color: "#ffe619",
        width: 1,
      }),
      fill: new Fill({
        color: "rgba(252,216,14,1)",
      }),
    }),
    text: new Text({
      // offsetX: 15,
      offsetY: 20,
      font: "14px KaiTi",
      fill: new Fill({
        color: "#00FFFF",
      }),
      backgroundFill: new Fill({
        color: [0, 0, 0, 0.5],
      }),
    }),
  });
  static Points = new Style({
    image: new Circle({
      radius: 6,
      stroke: new Stroke({
        color: "#d78414",
        width: 3,
      }),
    }),
    text: new Text({
      // offsetX: 15,
      offsetY: 20,
      font: "14px KaiTi",
      fill: new Fill({
        color: "#00FFFF",
      }),
      backgroundFill: new Fill({
        color: [0, 0, 0, 0.5],
      }),
    }),
  });
  static DistrictCity = new Style({
    stroke: new Stroke({
      color: "#00FBFC",
      lineCap: "round",
      lineJoin: "bevel",
      width: 2,
      zIndex: 10001,
    }),
    fill: new Fill({
      color: "rgba(0, 251, 252, 0.1)",
    }),
    text: new Text({
      font: "25px DFLiJinHeiW8",
      fill: new Fill({
        color: "#fff",
      }),
      stroke: new Stroke({
        color: "#2AACFF",
        width: 10,
      }),
    }),
  });
  static DistrictCounty = new Style({
    stroke: new Stroke({
      color: "#426F8C",
      lineCap: "round",
      lineJoin: "bevel",
      width: 0.5,
    }),
    text: new Text({
      offsetX: 2,
      offsetY: 2,
      font: "14px nssjt",
      fill: new Fill({
        color: "#426F8C",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 1,
      }),
    }),
  });
  //#region 量测
  static MeasureStyle = new Style({
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)",
    }),
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.5)",
      lineDash: [10, 10],
      width: 2,
    }),
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)",
      }),
    }),
  });
  static labelStyle = new Style({
    text: new Text({
      font: "14px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      padding: [3, 3, 3, 3],
      textBaseline: "bottom",
      offsetY: -15,
    }),
    image: new RegularShape({
      radius: 8,
      points: 3,
      angle: Math.PI,
      displacement: [0, 10],
      fill: new Fill({
        color: "rgba(0, 0, 0, 0.7)",
      }),
    }),
  });
  static tipStyle = new Style({
    text: new Text({
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.4)",
      }),
      padding: [2, 2, 2, 2],
      textAlign: "left",
      offsetX: 15,
    }),
  });
  static modifyStyle = new Style({
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      fill: new Fill({
        color: "rgba(0, 0, 0, 0.4)",
      }),
    }),
    text: new Text({
      text: "Drag to modify",
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      padding: [2, 2, 2, 2],
      textAlign: "left",
      offsetX: 15,
    }),
  });
  static segmentStyle = new Style({
    text: new Text({
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.4)",
      }),
      padding: [2, 2, 2, 2],
      textBaseline: "bottom",
      offsetY: -12,
    }),
    image: new RegularShape({
      radius: 6,
      points: 3,
      angle: Math.PI,
      displacement: [0, 8],
      fill: new Fill({
        color: "rgba(0, 0, 0, 0.4)",
      }),
    }),
  });
  static segmentStyles = [this.segmentStyle];

  static PointsCluster = (feature) => {
    const size = feature.get("features").length;
    let style = clusterStyleCache[size];
    if (!style) {
      style = new Style({
        image: new Circle({
          displacement: [0, 20],

          radius: 16,
          stroke: new Stroke({
            color: "#fff",
          }),
          fill: new Fill({
            color: "#e75c6e",
          }),
        }),
        text: new Text({
          offsetY: -20,

          font: "bold 16px Calibri,sans-serif",
          text: size.toString(),
          fill: new Fill({
            color: "#fff",
          }),
        }),
      });
      clusterStyleCache[size] = style;
    }
    return style;
  };

  static OverrunColorMap = (f) => {
    const value = f.get("value");
    // console.log(f)
    return getOverrunColorStyle(value);
  };
  static OverrunColorLineInstance = new Style({
    stroke: new Stroke({
      // lineCap: "butt",
      lineJoin: "bevel",
      width: 9,
      zIndex: 10009,
    }),
  });
  static OverrunColorLine = (f) => {
    const value = f.get("value");
    const style = this.OverrunColorLineInstance;
    style.getStroke().setColor(gradientArray[getOverrunColorPercent(value)]);
    return style;
  };
  static Measure = new Style({
    fill: new Fill({
      color: "rgba(250,61,61,0.6)",
    }),
    stroke: new Stroke({
      color: "#fafafa",
      width: 2,
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: "#ffcc33",
      }),
    }),
  });
  static MeasureEditing = new Style({
    fill: new Fill({
      color: "rgba(250,61,61,0.8)",
    }),
    stroke: new Stroke({
      color: "#fafafa",
      lineDash: [5, 5],
      width: 2,
    }),
    image: new Circle({
      radius: 6,
      stroke: new Stroke({
        color: "#fafafa",
        width: 1,
      }),
      fill: new Fill({
        color: hexToRGB("#D20C0C", 0.6),
      }),
    }),
  });

  //#endregion
}
