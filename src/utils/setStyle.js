import {Circle, Fill, Icon, Stroke, Style, Text} from "ol/style";

//import { DEVICE_PIXEL_RATIO } from "ol/has";
/**
 * 主要景区 polygon ,multipolygon, line , multiline 样式设置
 * 根据geojson类型设置地图样式
 * @param type
 * @param resolution
 * @param feature
 * @return {string}
 */
export function styleSet(type, resolution, feature, zoom) {
  let styleItem = [];
  switch (type) {
    case "City"://市界
      styleItem = [
        new Style({
          stroke: new Stroke({
            color: "#00FBFC",
            lineCap: "round",
            lineJoin: "bevel",
            width: 2,
            zIndex: 10001
          }),
        }),
        new Style({
          fill: new Fill({
            color: "rgba(0, 251, 252, 0.1)",
          }),
        }),
        new Style({
          text: new Text({

            // offsetX: 20,
            // offsetY: 10,
            font: "25px DFLiJinHeiW8",
            // text: feature.get("name"),
            text: resolution < 350 ? feature.get("name") : "",
            fill: new Fill({
              color: "#fff",
            }),
            stroke: new Stroke({
              color: "#2AACFF",
              width: 10,
            }),
          }),
        }),
      ];
      break;
    case "Con"://县界
      styleItem = [
        new Style({
          stroke: new Stroke({
            color: "#426F8C",
            lineCap: "round",
            lineJoin: "bevel",
            width: 0.5,
          }),
        }),
        new Style({
          text: new Text({
            offsetX: 2,
            offsetY: 2,
            font: "14px nssjt",
            text: resolution < 100 ? feature.get("name") : "",
            fill: new Fill({
              color: "#426F8C",
            }),
            stroke: new Stroke({
              color: "#fff",
              width: 1,
            }),
          }),
        }),
      ];
      break;
    case "Railway": // 铁路线和构筑物
      // if (feature.get('type') == 'rail' && zoom < 112) {
      if (feature.get("name")) {
        var steps = 8;
        for (var i = 0; i < steps; i++) {
          styleItem.push(
            new Style({
              stroke: new Stroke({
                color: [214, 255, 255, 1 / (steps - i)],
                width: (steps - i) * 1.2 - 1
              })
            })
          );
        }
        styleItem.push(new Style({
          text: new Text({
            offsetX: -5,
            offsetY: -5,
            font: "25px Time New Roman",
            text: feature.get("name"),
            textBaseline: "bottom",
            placement: "line",
            fill: new Fill({
              color: '#74d4ff',
            }),
            overflow: true,
            // placement:'line',
            stroke: new Stroke({
              color: "#fff",
              width: 3,
            }),
          }),
        }));
      }
      if (feature.get('type') == 'gzw' && zoom >= 12) {
        let linecolor = "";
        let text = feature.get("vname");
        let gzwxs = feature.get("gzwxs");
        if (gzwxs === "桥梁") {
          linecolor = "#74d4ff ";
        } else if (gzwxs === "路基") {
          linecolor = "#fed42e";
        } else if (gzwxs === "隧道") {
          linecolor = "#c30eff";
        }
        styleItem = [
          new Style({
            stroke: new Stroke({
              color: linecolor,
              width: 8,
            }),
          }),
          new Style({
            text: new Text({
              offsetX: -5,
              offsetY: -5,
              font: "14px Time New Roman",
              text: text,
              fill: new Fill({
                color: linecolor,
              }),
              stroke: new Stroke({
                color: "#fff",
                width: 3,
              }),
            }),
          }),
        ];
      }
      break;
    case "Rail_Sel": // 铁路线和构筑物_选中
      if (zoom < 12) {
        steps = 8;
        for (i = 0; i < steps; i++) {
          styleItem.push(
            new Style({
              stroke: new Stroke({
                color: [0, 255, 255, 1 / (steps - i)],
                width: (steps - i) * 1.2 - 1
              })
            })
          );
        }
        styleItem.push(new Style({
          text: new Text({
            offsetX: -5,
            offsetY: -5,
            font: "16px Time New Roman",
            text: feature.get("id"),
            fill: new Fill({
              color: '#74d4ff',
            }),
            overflow: true,
            // placement:'line',
            stroke: new Stroke({
              color: "#fff",
              width: 3,
            }),
          }),
        }));
      }
      break;
    case "Railway_kms"://百米标
      if (zoom <= 8) {
        styleItem = [];
      } else if (zoom > 8 && zoom < 10) {
        if (feature.get("lc").indexOf('DK') >= 0) {
          styleItem = [
            new Style({
              image: new Circle({
                radius: 3,
                fill: new Fill({
                  color: [255, 255, 255, 0.5],
                }),
                stroke: new Stroke({
                  color: [255, 255, 255, 0.5],
                  width: 1,
                }),
              }),
            }),
            new Style({
              text: new Text({
                font: "14px KaiTi",
                text: feature.get("lc").substring(1),
                fill: new Fill({
                  color: "red",
                }),
                stroke: new Stroke({
                  color: "#fff",
                  width: 3,
                }),
                // backgroundFill: new Fill({
                //   color: [255, 255, 255, 0.5],
                // }),
              }),
            }),
          ];
        }
      } else if (zoom >= 10 && zoom < 14) {
        if (feature.get("lc").indexOf('K') >= 0) {
          styleItem = [
            new Style({
              image: new Circle({
                radius: 3,
                fill: new Fill({
                  color: [255, 255, 255, 0.5],
                }),
                stroke: new Stroke({
                  color: [255, 255, 255, 0.5],
                  width: 1,
                }),
              }),
            }),
            new Style({
              text: new Text({
                font: "12px KaiTi",
                text: feature.get("lc"),
                fill: new Fill({
                  color: "red",
                }),
                stroke: new Stroke({
                  color: "#fff",
                  width: 3,
                }),
                // backgroundFill: new Fill({
                //   color: [255, 255, 255, 0.5],
                // }),
              }),
            }),
          ];
        }
      } else {
        if (feature.get("lc").indexOf('K') >= 0) {
          styleItem = [
            new Style({
              image: new Circle({
                radius: 3,
                fill: new Fill({
                  color: [255, 255, 255, 0.5],
                }),
                stroke: new Stroke({
                  color: [255, 255, 255, 0.5],
                  width: 1,
                }),
              }),
            }),
            new Style({
              text: new Text({
                offsetX: 25,
                offsetY: 25,
                font: "12px KaiTi",
                text: feature.get("lc"),
                fill: new Fill({
                  color: "red",
                }),
                stroke: new Stroke({
                  color: "#fff",
                  width: 3,
                }),
                // backgroundFill: new Fill({
                //   color: [255, 255, 255, 0.5],
                // }),
              }),
            }),
          ];
        } else {
          styleItem = [
            new Style({
              image: new Circle({
                radius: 1,
                fill: new Fill({
                  color: [255, 255, 255, 0.5],
                }),
                stroke: new Stroke({
                  color: [255, 255, 255, 0.5],
                  width: 1,
                }),
              }),
            }),
            new Style({
              text: new Text({
                offsetX: 25,
                offsetY: 25,
                font: "10px KaiTi",
                text: feature.get("lc"),
                fill: new Fill({
                  color: "red",
                }),
                stroke: new Stroke({
                  color: "#fff",
                  width: 3,
                }),
              }),
            }),
          ];
        }

      }

      break;
    case "Bd"://标段
      if (zoom < 9) {
        styleItem = [];
      } else {
        var linecolor = "";
        var text = resolution < 0.0044931640625 ? feature.get("VNAME") : "";
        if (text === "1标（中铁十八局）") {
          linecolor = "#74d4ff ";
        } else if (text === "2标（中铁三局）") {
          linecolor = "#fed42e";
        } else if (text === "3标（中铁建大桥局）") {
          linecolor = "#c30eff";
        } else if (text === "4标（中国建筑）") {
          linecolor = "#ff3f13";
        } else if (text === "5标（江西交工）") {
          linecolor = "#53d769";
        } else if (text === "6标（中铁十四局）") {
          linecolor = "#fc3975";
        } else if (text === "7标（中铁二局）") {
          linecolor = "#2a89ff";
        }
        styleItem = [
          new Style({
            stroke: new Stroke({
              color: linecolor,
              width: 8,
            }),
          }),
          new Style({
            text: new Text({
              offsetX: -30,
              offsetY: -25,
              font: "17px Time New Roman",
              text: text,
              fill: new Fill({
                color: linecolor,
              }),
              stroke: new Stroke({
                color: "#fff",
                width: 3,
              }),
            }),
          }),
        ];
      }
      break;
    case "Station"://车站
      if (zoom < 9) {
        styleItem = [
          new Style({
            image: new Icon({
              anchor: [0.5, 0.5],
              crossOrigin: "anonymous",
              scale: zoom * 0.025,
              src: "./image/station.png",
              rotateWithView: true,
            }),
          }),
        ];
      } else {
        styleItem = [
          new Style({
            image: new Circle({
              radius: zoom * 0.75,
              fill: new Fill({
                color: [255, 255, 255, 0.5],
              }),
              stroke: new Stroke({
                color: [255, 255, 255, 0.5],
                width: 1,
              }),
            }),
          }),
          new Style({
            text: new Text({
              offsetX: 25,
              offsetY: 25,
              font: "14px KaiTi",
              text: (resolution < 0.0044931640625 ? feature.get("VNAME") : ""),
              fill: new Fill({
                color: "#DC143C",
              }),
              stroke: new Stroke({
                color: "#fff",
                width: 3,
              }),
              backgroundFill: new Fill({
                color: [255, 255, 255, 0.5],
              }),
            }),
          }),
          new Style({
            image: new Icon({
              anchor: [0.5, 0.5],
              crossOrigin: "anonymous",
              scale: zoom * 0.04,
              src: "../assets/images/station.png",
              rotateWithView: true,
            }),
          }),
        ];
      }
      break;
    case "Dev"://打卡机
      styleItem = [
        new Style({
          image: new Circle({
            radius: zoom * 0.75,
            fill: new Fill({
              color: [255, 255, 255, 0.5],
            }),
            stroke: new Stroke({
              color: [255, 255, 255, 0.5],
              width: 1,
            }),
          }),
        }),
        new Style({
          text: new Text({
            offsetX: 30,
            offsetY: 25,
            font: "14px KaiTi",
            text: resolution < 1 ? feature.get("devname") : "",
            fill: new Fill({
              color: "#DC143C",
            }),
            stroke: new Stroke({
              color: "#fff",
              width: 3,
            }),
            backgroundFill: new Fill({
              color: [255, 255, 255, 0.6],
            }),
          }),
        }),
        new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            crossOrigin: "anonymous",
            scale: zoom * 0.04,
            src: require("../assets/images/index/mapPoint.png"),
            rotateWithView: true,
          }),
        }),
      ];
      break;
    case "MoniPoints"://CP3点
      styleItem = [
        new Style({
          image: new Circle({
            radius: 5,
            // fill: new Fill({
            //   color: "#F3CE3A",
            // }),
            stroke: new Stroke({
              color: "#F3CE3A",
              width: 1,
            }),
          }),
        }),
      ];
      if (zoom > 18)
        styleItem.push(new Style({
          text: new Text({
            offsetX: 15,
            offsetY: 15,
            font: "14px KaiTi",
            text: feature.get("name"),
            fill: new Fill({
              color: "#00FFFF",
            }),
            // stroke: new Stroke({
            //   color: "#fff",
            //   width: 2,
            //}),
            backgroundFill: new Fill({
              color: [0, 0, 0, 0.5],
            }),
          }),
        }));
      break;
    case "MoniPoints_Sel"://CP3点
      styleItem = [
        new Style({
          image: new Circle({
            radius: 5,
            fill: new Fill({
              color: "#F3CE3A",
            }),
            stroke: new Stroke({
              color: "#F3CE3A",
              width: 1,
            }),
          }),
        }),
      ];
      if (zoom > 18)
        styleItem.push(new Style({
          text: new Text({
            offsetX: -15,
            offsetY: -15,
            font: "14px KaiTi",
            text: feature.get("vname"),
            fill: new Fill({
              color: "#00FFFF",
            }),
            // stroke: new Stroke({
            //   color: "#fff",
            //   width: 2,
            // }),
            backgroundFill: new Fill({
              color: [0, 0, 0, 0.5],
            }),
          }),
        }));
      break;
  }
  return styleItem;
}

// ————————————————
// 版权声明：本文为CSDN博主「奔跑的痕迹」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/qq_34817440/article/details/103837326
