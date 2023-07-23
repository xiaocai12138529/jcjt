import { getArea, getLength } from "ol/sphere";
import { Draw, Modify } from "ol/interaction";
import { Styles } from "@/components/map/styles";
import { LineString, Point } from "ol/geom";
import { Sources } from "@/components/map/layers";
import { Vector as VectorLayer } from "ol/layer";

export const MeasureLayer = new VectorLayer({
  source: Sources.Measure,
  style: function (feature) {
    return MeasureStyleFunc(feature, true);
  },
});
const MeasureType = {
  AREA: "Polygon",
  LENGTH: "LineString",
};
let MeasureDraw;
let tipPoint;
const modify = new Modify({
  source: Sources.Measure,
  style: Styles.modifyStyle,
});
const MeasureStyleFunc = (feature, segments, drawType, tip) => {
  const styles = [Styles.MeasureStyle];
  const geometry = feature.getGeometry();
  const type = geometry.getType();
  let point, label, line;
  if (!drawType || drawType === type) {
    if (type === MeasureType.AREA) {
      point = geometry.getInteriorPoint();
      label = formatArea(geometry);
      line = new LineString(geometry.getCoordinates()[0]);
    } else if (type === MeasureType.LENGTH) {
      point = new Point(geometry.getLastCoordinate());
      label = formatLength(geometry);
      line = geometry;
    }
  }
  if (segments && line) {
    let count = 0;
    line.forEachSegment(function (a, b) {
      const segment = new LineString([a, b]);
      const label = formatLength(segment);
      if (Styles.segmentStyles.length - 1 < count) {
        Styles.segmentStyles.push(Styles.segmentStyle.clone());
      }
      const segmentPoint = new Point(segment.getCoordinateAt(0.5));
      Styles.segmentStyles[count].setGeometry(segmentPoint);
      Styles.segmentStyles[count].getText().setText(label);
      styles.push(Styles.segmentStyles[count]);
      count++;
    });
  }
  if (label) {
    Styles.labelStyle.setGeometry(point);
    Styles.labelStyle.getText().setText(label);
    styles.push(Styles.labelStyle);
  }
  if (
    tip &&
    type === "Point" &&
    !modify.getOverlay().getSource().getFeatures().length
  ) {
    tipPoint = geometry;
    Styles.tipStyle.getText().setText(tip);
    styles.push(Styles.tipStyle);
  }
  return styles;
};
const formatLength = function (line) {
  const length = getLength(line);
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + " km";
  } else {
    output = Math.round(length * 100) / 100 + " m";
  }
  return output;
};

const formatArea = function (polygon) {
  const area = getArea(polygon);
  let output;
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + " km\xB2";
  } else {
    output = Math.round(area * 100) / 100 + " m\xB2";
  }
  return output;
};

function addMeasure(map, type) {
  console.log("add measure");
  //TODO
  const drawType = type;
  const drawTypeString = drawType === "Polygon" ? "面积" : "长度";
  const activeTip = `点击开始${drawTypeString}量测, 双击结束`;
  const idleTip = "点击开始量测";
  let tip = idleTip;
  MeasureDraw = new Draw({
    source: Sources.Measure,
    type: drawType,
    style: function (feature) {
      //TODO
      return MeasureStyleFunc(feature, true, drawType, tip);
    },
  });
  MeasureDraw.on("drawstart", function () {
    //TODO clear
    // if (1<2) {
    Sources.Measure.clear();
    // }
    modify.setActive(false);
    tip = activeTip;
  });
  MeasureDraw.on("drawend", function () {
    Styles.modifyStyle.setGeometry(tipPoint);
    modify.setActive(true);
    map.once("pointermove", function () {
      Styles.modifyStyle.setGeometry();
    });
    tip = idleTip;
  });
  modify.setActive(true);
  map.addInteraction(MeasureDraw);
}

function removeMeasure(map) {
  console.log("removeMeasure");
  map.removeInteraction(MeasureDraw);
  map.removeInteraction(modify);
  Sources.Measure.clear();
}

export { addMeasure, removeMeasure, MeasureStyleFunc };
