import { Rules } from '@/views/validate'
const baseURL = process.env.VUE_APP_TRACK_URL
export const accountoptions = [
    {
        name: "优化拟合数据", id: 1, children: [
            { name: "平面测点拨距", id: 1 },
            { name: "交点法曲线要素", id: 3 },
            { name: "直线曲线及转角数据", id: 5 },
            { name: "线元法要素", id: 6 },
            { name: "纵断面测点抬落量", id: 2 },
            { name: "设计坡度", id: 4 },
            { name: "优化大机作业文件", id: 7 }
        ]
    },
    {
        name: "静态TQI管理", id: 2, children: [
            { name: "静态TQI管理值", id: 1 },
            { name: "静态TQI峰值", id: 2 },
            { name: "静态TQI超标区段统计", id: 3 },
        ]
    },
    {
        name: "动态TQI管理", id: 3, children: [
            { name: "动态TQI管理值", id: 1 },
            { name: "动态TQI峰值", id: 2 },
            { name: "动态TQI超标区段统计", id: 3 },
        ]
    },
    {
        name: "TQI对比", id: 4, children: [
            { name: "左高低", id: 1 },
            { name: "右高低", id: 2 },
            { name: "左轨向", id: 3 },
            { name: "右轨向", id: 4 },
            { name: "轨距", id: 5 },
            // { name: "超高", id: 6 },
            { name: "水平", id: 7 },
            { name: "三角坑", id: 8 },
        ]
    },
];
export const columData = {
    "平面测点拨距": [
        { prop: "pointNum", label: "点号" },
        { prop: "pointAttribute", label: "点属性" },
        { prop: "x", label: "实测北坐标", width: 140 },
        { prop: "y", label: "实测东坐标", width: 140 },
        { prop: "h", label: "实测高程" },
        { prop: "mileage", label: "里程" },
        { prop: "deflectionDistance", label: "拨距" },
        { prop: "lineShape", label: "线形" },
        { prop: "state", label: "状态" },
        { prop: "controlDistance", label: "控制拨距" },
        { prop: "remark", label: "备注" },
    ],
    "纵断面测点抬落量": [
        { prop: "mileage", label: "里程" },
        { prop: "exist_H", label: "既有高程" },
        { prop: "design_H", label: "设计高程" },
        { prop: "fallingValue", label: "抬落量" },
        { prop: "lineShape", label: "线形" },
        { prop: "remark", label: "备注" },
    ],
    "交点法曲线要素": [
        { prop: "intersection_Num", label: "交点号" },
        { prop: "intersection_StationNum", label: "交点桩号（m）", width: 140 },
        { prop: "intersection_X", label: "交点北坐标", width: 140 },
        { prop: "intersection_Y", label: "交点东坐标", width: 140 },
        { prop: "radius", label: "曲线半径" },
        { prop: "frontSlow", label: "前缓长" },
        { prop: "afterSlow", label: "后缓长" },
        { prop: "corner", label: "转角" },
        { prop: "deflectionDistance_Min", label: "最小拨距（mm）", width: 110 },
        { prop: "deflectionDistance_Max", label: "最大拨距（mm）", width: 110 },
        { prop: "deflectionDistance_Variance", label: "拨据均方差（mm）", width: 130 },
    ],
    "设计坡度": [
        { prop: "slope_M", label: "变坡点里程", width: 120 },
        { prop: "chain_Num", label: "断链序号" },
        { prop: "continuous_M", label: "连续里程", width: 120 },
        { prop: "design_H", label: "设计高程" },
        { prop: "next_Slope", label: "至下一变坡点坡度（‰）", width: 170 },
        { prop: "next_SlopeLength", label: "至下一变坡点长度", width: 150 },
        { prop: "radius", label: "竖曲线半径" },
        { prop: "apexDistance", label: "竖曲线外距" },
        { prop: "curveLength", label: "竖曲线长度" },
        { prop: "if_Overlap", label: "是否缓竖重叠", width: 120 },
        { prop: "remark", label: "备注" },
    ],
    "直线曲线及转角数据": [
        { prop: "intersection_Num", label: "交点号" },
        { prop: "intersection_StationNum", label: "交点桩号" },
        { prop: "intersection_X", label: "交点北坐标" , width: 120 },
        { prop: "intersection_Y", label: "交点东坐标", width: 120  },
        { prop: "radius", label: "半径" },
        { prop: "frontSlow", label: "前缓长" },
        { prop: "afterSlow", label: "后缓长" },
        { prop: "corner", label: "转角" },
        { prop: "tangentLengthT1", label: "前切线长" },
        { prop: "tangentLengthT2", label: "后切线长" },
        { prop: "curveLength", label: "曲线全长" },
        { prop: "off_Vector", label: "外失距" },
        { prop: "includedLine", label: "夹直线长" },
        { prop: "stationNum_ZH", label: "ZH桩号" },
        { prop: "stationNum_HY", label: "HY桩号" },
        { prop: "stationNum_QZ", label: "QZ桩号" },
        { prop: "stationNum_YH", label: "YH桩号" },
        { prop: "stationNum_HZ", label: "HZ桩号" },
        { prop: "azimuth_ZH", label: "ZH方位角" },
        { prop: "zH_X", label: "ZH北坐标" , width: 120 },
        { prop: "azimuth_HY", label: "HY方位角" },
        { prop: "hY_Y", label: "HY东坐标" , width: 120 },
        { prop: "hY_X", label: "HY北坐标" , width: 120 },
        { prop: "azimuth_QZ", label: "QZ方位角" },
        { prop: "qZ_Y", label: "QZ东坐标", width: 120  },
        { prop: "qZ_X", label: "QZ北坐标" , width: 120 },
        { prop: "azimuth_YH", label: "YH方位角" },
        { prop: "yH_Y", label: "YH东坐标" , width: 120 },
        { prop: "yH_X", label: "YH北坐标" , width: 120 },
        { prop: "azimuth_HZ", label: "HZ方位角" },
        { prop: "hZ_Y", label: "HZ东坐标" , width: 120 },
        { prop: "hZ_X", label: "HZ北坐标", width: 120  },
        { prop: "remark", label: "备注" },
    ],
    "线元法要素": [
        { prop: "startNum", label: "起点桩号", width: 140 },
        { prop: "start_X", label: "起点北坐标", width: 140 },
        { prop: "start_Y", label: "起点东坐标", width: 140 },
        { prop: "start_Azimuth", label: "起点方位角" },
        { prop: "lineElementType", label: "线元类型" },
        { prop: "lineElementLength", label: "线元长度", width: 140 },
        { prop: "startRadius", label: "起点半径" },
        { prop: "endRadius", label: "终点半径" },
        { prop: "turnRound", label: "转向" }
    ],
    "静态TQI管理值": [
        { prop: "mileage", label: "里程" },
        { prop: "limitItem", label: "超限单项" },
        { prop: "trackDirection_L", label: "左轨向(mm)",width: "140px" },
        { prop: "trackDirection_R", label: "右轨向(mm)",width: "140px" },
        { prop: "height_L", label: "左高低(mm)" ,width: "140px"},
        { prop: "height_R", label: "右高低(mm)" ,width: "140px"},
        { prop: "horizontal", label: "水平(mm)" ,width: "140px"},
        { prop: "trackGauge", label: "轨距(mm)" ,width: "140px"},
        { prop: "triangularPit", label: "三角坑(mm)" ,width: "140px"},
        { prop: "limitValue", label: "超限数值",width: "140px" },
        { prop: "limitMan", label: "限值管理" },
        { prop: "maintenanceAlert", label: "维修警戒" },
        { prop: "getWord", label: "作业验收" },
        { prop: "speed", label: "速度" },
        { prop: "standard_Final", label: "标准" },
    ],
    "静态TQI峰值": [
        { prop: "mileage", label: "里程" },
        { prop: "trackDirection_L", label: "左轨向" },
        { prop: "trackDirection_R", label: "右轨向" },
        { prop: "height_L", label: "左高低" },
        { prop: "height_R", label: "右高低" },
        { prop: "trackGauge", label: "轨距" },
        { prop: "horizontal", label: "水平" },
        { prop: "triangularPit", label: "三角坑" }
    ],
    "静态TQI超标区段统计":[],
    "优化大机作业文件": [
        { prop: "fileName", label: "文件名称", align: "left" },
        { prop: "fileSize", label: "文件大小（kb）" },
        { prop: "fileType", label: "文件类型" },
        { prop: "remark", label: "备注" },
    ],
    "动态TQI管理值":[
        { prop: "mileage", label: "里程" },
        { prop: "limitItem", label: "超限单项" },
        { prop: "trackDirection_L", label: "左轨向" },
        { prop: "trackDirection_R", label: "右轨向" },
        { prop: "height_L", label: "左高低" },
        { prop: "height_R", label: "右高低" },
        { prop: "horizontal", label: "水平" },
        { prop: "trackGauge", label: "轨距" },
        { prop: "triangularPit", label: "三角坑" },
        { prop: "limitValue", label: "超限数值" },
        { prop: "limitMan", label: "限值管理" },
        { prop: "maintenanceAlert", label: "维修警戒"},
        { prop: "getWord", label: "作业验收" },
        { prop: "speed", label: "速度" },
        { prop: "standard_Final", label: "标准" },
    ],
    "动态TQI峰值":[
        { prop: "mileage", label: "里程km" },
        { prop: "meters", label: "里程m" },
        { prop: "finalM", label: "最终里程" },
        { prop: "lprf", label: "左高低(mm)" },
        { prop: "rprf", label: "右高低(mm)" },
        { prop: "laln", label: "左轨向(mm)" },
        { prop: "raln", label: "右轨向(mm)" },
        { prop: "gage", label: "轨距(mm)" },
        { prop: "cant", label: "超高(mm)" },
        { prop: "xlvl", label: "水平(mm)" },
        { prop: "warp_1", label: "三角坑(mm)" },
        { prop: "remark", label: "备注" }
    ],
    "动态TQI超标区段统计":[]
};
export const formItems = {
    "平面测点拨距": [
        { type: "input", label: "点号", prop: "pointNum", rules: Rules.Text(true) },
        { type: "input", prop: "pointAttribute", label: "点属性" },
        { type: "number", prop: "x", label: "实测北坐标" },
        { type: "number", prop: "y", label: "实测东坐标" },
        { type: "number", prop: "h", label: "实测高程" },
        { type: "number", prop: "mileage", label: "里程" ,appendname:"公里"},
        { type: "number", prop: "deflectionDistance", label: "拨距" },
        { type: "input", prop: "lineShape", label: "线形" },
        { type: "input", prop: "state", label: "状态" },
        { type: "number", prop: "controlDistance", label: "控制拨距" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "纵断面测点抬落量": [
        { type: "number", prop: "mileage", label: "里程" ,appendname:"公里"},
        { type: "number", prop: "exist_H", label: "既有高程" },
        { type: "number", prop: "design_H", label: "设计高程" },
        { type: "input", prop: "fallingValue", label: "抬落量" },
        { type: "input", prop: "lineShape", label: "线形" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "交点法曲线要素": [
        { type: "input", prop: "intersection_Num", label: "交点号" },
        { type: "number", prop: "intersection_StationNum", label: "交点桩号（m）" },
        { type: "number", prop: "intersection_X", label: "交点北坐标" },
        { type: "number", prop: "intersection_Y", label: "交点东坐标" },
        { type: "number", prop: "radius", label: "曲线半径" },
        { type: "number", prop: "frontSlow", label: "前缓长" },
        { type: "number", prop: "afterSlow", label: "后缓长" },
        { type: "input", prop: "corner", label: "转角" },
        { type: "number", prop: "deflectionDistance_Min", label: "最小拨距（mm）" },
        { type: "number", prop: "deflectionDistance_Max", label: "最大拨距（mm）" },
        { type: "number", prop: "deflectionDistance_Variance", label: "拨据均方差（mm）" }
    ],
    "设计坡度": [
        { type: "input", prop: "slope_M", label: "变坡点里程" },
        { type: "input", prop: "chain_Num", label: "断链序号" },
        { type: "input", prop: "continuous_M", label: "连续里程" },
        { type: "number", prop: "design_H", label: "设计高程" },
        { type: "number", prop: "next_Slope", label: "至下一变坡点坡度（‰）" },
        { type: "number", prop: "next_SlopeLength", label: "至下一变坡点长度" },
        { type: "number", prop: "radius", label: "竖曲线半径" },
        { type: "number", prop: "apexDistance", label: "竖曲线外距" },
        { type: "number", prop: "curveLength", label: "竖曲线长度" },
        { type: "input", prop: "if_Overlap", label: "是否缓竖重叠" },
        { type: "textarea", prop: "remark", label: "备注" },
    ],
    "直线曲线及转角数据": [
        { type: "input", prop: "intersection_Num", label: "交点号" },
        { type: "number", prop: "intersection_StationNum", label: "交点桩号" },
        { type: "number", prop: "intersection_X", label: "交点北坐标" },
        { type: "number", prop: "intersection_Y", label: "交点东坐标" },
        { type: "number", prop: "radius", label: "半径" },
        { type: "number", prop: "frontSlow", label: "前缓长" },
        { type: "number", prop: "afterSlow", label: "后缓长" },
        { type: "input", prop: "corner", label: "转角" },
        { type: "number", prop: "tangentLengthT1", label: "前切线长" },
        { type: "number", prop: "tangentLengthT2", label: "后切线长" },
        { type: "number", prop: "curveLength", label: "曲线全长" },
        { type: "number", prop: "off_Vector", label: "外失距" },
        { type: "number", prop: "includedLine", label: "夹直线长" },
        { type: "number", prop: "stationNum_ZH", label: "ZH桩号" },
        { type: "number", prop: "stationNum_HY", label: "HY桩号" },
        { type: "number", prop: "stationNum_QZ", label: "QZ桩号" },
        { type: "number", prop: "stationNum_YH", label: "YH桩号" },
        { type: "number", prop: "stationNum_HZ", label: "HZ桩号" },
        { type: "number", prop: "azimuth_ZH", label: "ZH方位角" },
        { type: "number", prop: "zH_X", label: "ZH北坐标" },
        { type: "number", prop: "azimuth_HY", label: "HY方位角" },
        { type: "number", prop: "hY_Y", label: "HY东坐标" },
        { type: "number", prop: "hY_X", label: "HY北坐标" },
        { type: "number", prop: "azimuth_QZ", label: "QZ方位角" },
        { type: "number", prop: "qZ_Y", label: "QZ东坐标" },
        { type: "number", prop: "qZ_X", label: "QZ北坐标" },
        { type: "number", prop: "azimuth_YH", label: "YH方位角" },
        { type: "number", prop: "yH_Y", label: "YH东坐标" },
        { type: "number", prop: "yH_X", label: "YH北坐标" },
        { type: "number", prop: "azimuth_HZ", label: "HZ方位角" },
        { type: "number", prop: "hZ_Y", label: "HZ东坐标" },
        { type: "number", prop: "hZ_X", label: "HZ北坐标" },
        { type: "textarea", prop: "remark", label: "备注" },
    ],
    "线元法要素": [
        { type: "number", prop: "startNum", label: "起点桩号" },
        { type: "number", prop: "start_X", label: "起点北坐标" },
        { type: "number", prop: "start_Y", label: "起点东坐标" },
        { type: "input", prop: "start_Azimuth", label: "起点方位角" },
        { type: "input", prop: "lineElementType", label: "线元类型" },
        { type: "number", prop: "lineElementLength", label: "线元长度" },
        { type: "number", prop: "startRadius", label: "起点半径" },
        { type: "number", prop: "endRadius", label: "终点半径" },
        { type: "number", prop: "turnRound", label: "转向" }
    ],
    "静态TQI管理值": [
        { type: "number",prop: "mileage", label: "里程"},
        { type: "input", prop: "limitItem", label: "超限单项" },
        { type: "number",prop: "trackDirection_L", label: "左轨向(mm)" },
        { type: "number",prop: "trackDirection_R", label: "右轨向(mm)"},
        { type: "number",prop: "height_L", label: "左高低(mm)"},
        { type: "number",prop: "height_R", label: "右高低(mm)"},
        { type: "number",prop: "horizontal", label: "水平(mm)"},
        { type: "number",prop: "trackGauge", label: "轨距(mm)"},
        { type: "number",prop: "triangularPit", label: "三角坑(mm)"},
        { type: "number",prop: "limitValue", label: "超限数值" },
        { type: "input",prop: "limitMan", label: "限值管理" },
        { type: "input",prop: "maintenanceAlert", label: "维修警戒" },
        { type: "input",prop: "getWord", label: "作业验收" },
        { type: "number",prop: "speed", label: "速度" },
        { type: "input",prop: "standard_Final", label: "标准" },
    ],
    "静态TQI峰值": [
        { type: "number", prop: "mileage", label: "里程" ,appendname:"公里"},
        { type: "number", prop: "trackDirection_L", label: "左轨向" },
        { type: "number", prop: "trackDirection_R", label: "右轨向" },
        { type: "number", prop: "height_L", label: "左高低" },
        { type: "number", prop: "height_R", label: "右高低" },
        { type: "number", prop: "trackGauge", label: "轨距" },
        { type: "number", prop: "horizontal", label: "水平" },
        { type: "number", prop: "triangularPit", label: "三角坑" }
    ],
    "静态TQI超标区段统计":[],
    "优化大机作业文件": [],
    "动态TQI管理值":[
        { type: "input",prop: "mileage", label: "里程" },
        { type: "input",prop: "limitItem", label: "超限单项" },
        { type: "number",prop: "trackDirection_L", label: "左轨向" },
        { type: "number",prop: "trackDirection_R", label: "右轨向" },
        { type: "number",prop: "height_L", label: "左高低" },
        { type: "number",prop: "height_R", label: "右高低" },
        { type: "number",prop: "horizontal", label: "水平" },
        { type: "number",prop: "trackGauge", label: "轨距" },
        { type: "number",prop: "triangularPit", label: "三角坑" },
        { type: "number",prop: "limitValue", label: "超限数值" },
        { type: "input",prop: "limitMan", label: "限值管理" },
        { type: "input",prop: "maintenanceAlert", label: "维修警戒"},
        { type: "input",prop: "getWord", label: "作业验收" },
        { type: "number",prop: "speed", label: "速度" },
        { type: "input",prop: "standard_Final", label: "标准" },
    ],
    "动态TQI峰值":[
        { type: "number",prop: "mileage", label: "里程km" },
        { type: "number",prop: "meters", label: "里程m" },
        { type: "number",prop: "finalM", label: "最终里程" },
        { type: "number",prop: "lprf", label: "左高低(mm)" },
        { type: "number",prop: "rprf", label: "右高低(mm)" },
        { type: "number",prop: "laln", label: "左轨向(mm)" },
        { type: "number",prop: "raln", label: "右轨向(mm)" },
        { type: "number",prop: "gage", label: "轨距(mm)" },
        { type: "number",prop: "cant", label: "超高(mm)" },
        { type: "number",prop: "xlvl", label: "水平(mm)" },
        { type: "number",prop: "warp_1", label: "三角坑(mm)" },
        { type: "textarea",prop: "remark", label: "备注" }
    ],
    "动态TQI超标区段统计":[]
};
export const apiurls = {
    "平面测点拨距": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDistance/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlDistance/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDistance/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDistance/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlDistance/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlDistance/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlDistance/DeleteByDataGroup",
    },
    "纵断面测点抬落量": {
        listurl: baseURL + "/Api/JcjdMan/XzjlFalling/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlFalling/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlFalling/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlFalling/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlFalling/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlFalling/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlFalling/DeleteByDataGroup",
    },
    "交点法曲线要素": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCurve/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCurve/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCurve/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCurve/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCurve/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCurve/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCurve/DeleteByDataGroup",
    },
    "设计坡度": {
        listurl: baseURL + "/Api/JcjdMan/XzjlSlope/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlSlope/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlSlope/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlSlope/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlSlope/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlSlope/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlSlope/DeleteByDataGroup",
    },
    "直线曲线及转角数据": {
        listurl: baseURL + "/Api/JcjdMan/XzhlLineCurveCorner/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzhlLineCurveCorner/Add",
        editurl: baseURL + "/Api/JcjdMan/XzhlLineCurveCorner/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzhlLineCurveCorner/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzhlLineCurveCorner/Export",
        upload: baseURL + "/Api/JcjdMan/XzhlLineCurveCorner/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzhlLineCurveCorner/DeleteByDataGroup",
    },
    "线元法要素": {
        listurl: baseURL + "/Api/JcjdMan/XzjlLineElement/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlLineElement/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlLineElement/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlLineElement/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlLineElement/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlLineElement/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlLineElement/DeleteByDataGroup",
    },
    "静态TQI管理值": {
        listurl: baseURL + "/Api/JcjdMan/TQIStatic_ManValue/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/TQIStatic_ManValue/Add",
        editurl: baseURL + "/Api/JcjdMan/TQIStatic_ManValue/Edit",
        delurl: baseURL + "/Api/JcjdMan/TQIStatic_ManValue/Delete",
        dowload: baseURL + "/Api/JcjdMan/TQIStatic_ManValue/Export",
        upload: baseURL + "/Api/JcjdMan/TQIStatic_ManValue/Import",
        delallurl: baseURL + "/Api/JcjdMan/TQIStatic_ManValue/DeleteByDataGroup",
    },
    "静态TQI峰值": {
        listurl: baseURL + "/Api/JcjdMan/TQIStatic_ByPoint/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/TQIStatic_ByPoint/Add",
        editurl: baseURL + "/Api/JcjdMan/TQIStatic_ByPoint/Edit",
        delurl: baseURL + "/Api/JcjdMan/TQIStatic_ByPoint/Delete",
        dowload: baseURL + "/Api/JcjdMan/TQIStatic_ByPoint/Export",
        upload: baseURL + "/Api/JcjdMan/TQIStatic_ByPoint/Import",
        delallurl: baseURL + "/Api/JcjdMan/TQIStatic_ByPoint/DeleteByDataGroup",
    },
    "静态TQI超标区段统计":{
        listurl: baseURL + "",
        addurl: baseURL + "",
        editurl: baseURL + "",
        delurl: baseURL + "",
        dowload: baseURL + "",
        upload: baseURL + "",
        delallurl: baseURL + "",
    },
    "优化大机作业文件": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDeviationData/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlDeviationData/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDeviationData/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDeviationData/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlDeviationData/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlDeviationData/Import",
        uploadFile: baseURL + "/Api/JcjdMan/XzjlDeviationData/UploadFile/upload",
        delallurl: baseURL + "/Api/JcjdMan/XzjlDeviationData/DeleteByDataGroup",
    },
    "动态TQI管理值": {
        listurl: baseURL + "/Api/JcjdMan/TQIDynamic_ManValue/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/TQIDynamic_ManValue/Add",
        editurl: baseURL + "/Api/JcjdMan/TQIDynamic_ManValue/Edit",
        delurl: baseURL + "/Api/JcjdMan/TQIDynamic_ManValue/Delete",
        dowload: baseURL + "/Api/JcjdMan/TQIDynamic_ManValue/Export",
        upload: baseURL + "/Api/JcjdMan/TQIDynamic_ManValue/Import",
        delallurl: baseURL + "/Api/JcjdMan/TQIDynamic_ManValue/DeleteByDataGroup",
    },
    "动态TQI峰值": {
        listurl: baseURL + "/Api/JcjdMan/TQIDynamic_ByPoint/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/TQIDynamic_ByPoint/Add",
        editurl: baseURL + "/Api/JcjdMan/TQIDynamic_ByPoint/Edit",
        delurl: baseURL + "/Api/JcjdMan/TQIDynamic_ByPoint/Delete",
        dowload: baseURL + "/Api/JcjdMan/TQIDynamic_ByPoint/Export",
        upload: baseURL + "/Api/JcjdMan/TQIDynamic_ByPoint/Import",
        delallurl: baseURL + "/Api/JcjdMan/TQIDynamic_ByPoint/DeleteByDataGroup",
    },
    "动态TQI超标区段统计":{
        listurl: baseURL + "",
        addurl: baseURL + "",
        editurl: baseURL + "",
        delurl: baseURL + "",
        dowload: baseURL + "",
        upload: baseURL + "",
        delallurl: baseURL + "",
    },
};
export const yearlyApi = {
    "优化拟合数据": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDataGroup/GetTree",
        addurl: baseURL + "/Api/JcjdMan/XzjlDataGroup/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDataGroup/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDataGroup/Delete"
    },
    "静态TQI管理": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDataGroup/GetTree",
        addurl: baseURL + "/Api/JcjdMan/XzjlDataGroup/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDataGroup/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDataGroup/Delete"
    },
    "动态TQI管理": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDataPeridDTQI/GetTree",
        addurl: baseURL + "/Api/JcjdMan/XzjlDataPeridDTQI/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDataPeridDTQI/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDataPeridDTQI/Delete"
    }
};