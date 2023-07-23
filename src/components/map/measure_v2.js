import { Draw } from "ol/interaction";
import { Sources } from "@/components/map/layers";
import { Styles } from "@/components/map/styles";
import { getUid, Overlay } from "ol";
import { LineString, Polygon } from "ol/geom";
import { getArea, getLength } from "ol/sphere";
import { unByKey } from "ol/Observable";

const CreateTooltipOverlay = () => {
  const target = document.createElement("div");
  target.className = "ol-tooltip";
  target.innerHTML = "起点";
  return new Overlay({
    element: target,
    offset: [0, -15],
    positioning: "bottom-center",
    stopEvent: true,
  });
};
/**
 * Format length output.
 * @param {LineString} line The line.
 * @return {string} The formatted length.
 */
const formatLength = function (line) {
  const length = getLength(line);
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + " " + "km";
  } else {
    output = Math.round(length * 100) / 100 + " " + "m";
  }
  return output;
};

/**
 * Format area output.
 * @param {Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
const formatArea = function (polygon) {
  const area = getArea(polygon);
  let output;
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
  } else {
    output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
  }
  return output;
};

export function Measure(map, type) {
  const draw = new Draw({
    source: Sources.Measure,
    type: type,
    style: Styles.MeasureEditing,
    condition: () => {
      return true;
    },
  });

  let overlay;
  let listener;
  const offset = (coordinate) => {
    return [coordinate[0], coordinate[1] + 0];
  };
  draw.on("drawstart", (e) => {
    overlay = CreateTooltipOverlay();
    const sketch = e.feature;
    let tooltipCoordinate = e.coordinate;
    map.addOverlay(overlay);
    listener = sketch.getGeometry().on("change", function (evt) {
      const geom = evt.target;
      if (geom instanceof Polygon) {
        overlay.getElement().innerHTML = formatArea(geom);
        tooltipCoordinate = geom.getInteriorPoint().getCoordinates();
        overlay.setPosition(offset(tooltipCoordinate));
      } else if (geom instanceof LineString) {
        overlay.getElement().innerHTML = formatLength(geom);
        tooltipCoordinate = geom.getLastCoordinate();
        overlay.setPosition(offset(tooltipCoordinate));
      }
    });
  });
  draw.on("drawend", (e) => {
    overlay.getElement().className = "ol-tooltip ol-tooltip-static";
    let closeBtn = document.createElement("span");
    closeBtn.innerHTML = "×";
    closeBtn.className = "ol-tooltip-close";
    const fid = getUid(e.feature);
    const oid = getUid(overlay);
    closeBtn.addEventListener("click", () => {
      const o = map
        .getOverlays()
        .getArray()
        .find((i) => getUid(i) === oid);
      map.removeOverlay(o);
      const f = Sources.Measure.getFeatureByUid(fid);
      Sources.Measure.removeFeature(f);
    });
    overlay.getElement().appendChild(closeBtn);
    unByKey(listener);
  });

  return draw;
}
