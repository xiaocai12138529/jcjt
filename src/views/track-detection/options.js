import { Rules } from '@/views/validate'
const baseURL = process.env.VUE_APP_TRACK_URL
export const accountoptions = [
    {
        name: "轨道检测数据", id: 2, children: [
            { name: "轨道线形检测数据", id: 1 },
            { name: "轨道中心线", id: 2 },
            { name: "限界/导高/拉出值", id: 3 }
        ]
    },
    {
        name: "精测网数据", id: 1, children: [
            { name: "坐标系统", id: 1 },
            { name: "高程网成果", id: 2 },
            { name: "CPI数据成果", id: 3 },
            { name: "CPII数据成果", id: 4 },
            { name: "CPIII数据成果", id: 5 },
            { name: "加密水准成果", id: 6 }
        ]
    }
];
export const columData = {
    "高程网成果": [
        { prop: "pointNo", label: "点号" },
        { prop: "vertical", label: "高程" },
        { prop: "remark", label: "备注" },
    ],
    "CPI数据成果": [
        { prop: "pointNo", label: "点号" },
        { prop: "location_X", label: "位置(X)" },
        { prop: "location_Y", label: "位置(Y)" },
        { prop: "remark", label: "备注" },
    ],
    "CPII数据成果": [
        { prop: "pointNo", label: "点号" },
        { prop: "location_X", label: "位置(X)" },
        { prop: "location_Y", label: "位置(Y)" },
        { prop: "remark", label: "备注" },
    ],
    "CPIII数据成果": [
        { prop: "pointNo", label: "点号" },
        { prop: "location_X", label: "位置(X)" },
        { prop: "location_Y", label: "位置(Y)" },
        { prop: "prismCenterHight", label: "棱镜中心高程" },
        { prop: "domeElevation", label: "球顶高程" },
        { prop: "remark", label: "备注" },
    ],
    "加密水准成果": [
        { prop: "pointNo", label: "点号" },
        { prop: "domeElevation", label: "球顶高程" },
        { prop: "remark", label: "备注" },
    ],
    // 轨道线形检测数据分为三个类型展示
    "-1": [
        { prop: "mileage_K", label: "测量里程(K)", width: "100px" },
        { prop: "leftTrack_X", label: "左轨北坐标X", width: "100px" },
        { prop: "leftTrack_Y", label: "左轨东坐标Y", width: "100px" },
        { prop: "leftTrack_H", label: "左轨高程H", width: "100px" },
        { prop: "midLine_X", label: "中线北坐标X", width: "100px" },
        { prop: "midLine_Y", label: "中线东坐标Y", width: "100px" },
        { prop: "midLinek_H", label: "中线高程H", width: "100px" },
        { prop: "rightTrack_X", label: "右轨北坐标X", width: "100px" },
        { prop: "rightTrack_Y", label: "右轨东坐标Y", width: "100px" },
        { prop: "rightTrack_H", label: "右轨高程H", width: "100px" },
        { prop: "offsetLateral_L", label: "左轨横偏(mm)", width: "100px" },
        { prop: "offsetLateral_M", label: "中线横偏(mm)", width: "100px" },
        { prop: "offsetLateral_R", label: "右轨横偏(mm)", width: "100px" },
        { prop: "offsetVertical_L", label: "左轨竖偏(mm)", width: "100px" },
        { prop: "offsetVertical_M", label: "中线竖偏(mm)", width: "100px" },
        { prop: "offsetVertical_R", label: "右轨竖偏(mm)", width: "100px" },
        { prop: "trackDistOffset", label: "轨距偏差量(mm)", width: "120px" },
        { prop: "superHightOffset", label: "超高偏差量(mm)", width: "120px" },
        { prop: "trackDistChangeRadio", label: "轨距变化率(‰)", width: "120px" },
        { prop: "trangularPit", label: "三角坑(mm)", width: "100px" },
        { prop: "trackDirectOffset_L", label: "左轨轨向偏差(mm)", width: "130px" },
        { prop: "trackDirectOffset_M", label: "中线轨向偏差(mm)", width: "130px" },
        { prop: "trackDirectOffset_R", label: "右轨轨向偏差(mm)", width: "130px" },
        { prop: "hightLowOffset_L", label: "左轨高低偏差(mm)", width: "130px" },
        { prop: "hightLowOffset_M", label: "中线高低偏差(mm)", width: "130px" },
        { prop: "hightLowOffset_R", label: "右轨高低偏差(mm)", width: "130px" },
        { prop: "plusVector_L", label: "左轨正矢(mm)", width: "100px" },
        { prop: "plusVector_M", label: "中线正矢(mm)", width: "100px" },
        { prop: "plusVector_R", label: "右轨正矢(mm)", width: "100px" },
        { prop: "plusVectorOff_L", label: "左轨正矢偏差(mm)", width: "130px" },
        { prop: "plusVectorOff_M", label: "中线正矢偏差(mm)", width: "130px" },
        { prop: "plusVectorOff_R", label: "右轨正矢偏差(mm)", width: "130px" },
        { prop: "curveType", label: "曲线类型" },
        { prop: "offDirection", label: "偏向" },
        { prop: "trackDist_Actual", label: "实测斜轨距(mm)", width: "130px" },
        { prop: "superHight_Actual", label: "实测超高(mm)", width: "100px" },
        { prop: "trackDist_Theory", label: "理论平轨距(mm)", width: "130px" },
        { prop: "superHight_Theory", label: "理论超高(mm)", width: "100px" },
        { prop: "planeReference_Rail", label: "平面基准轨" },
        { prop: "altitedeReference_Rail", label: "高程基准轨" },
    ],
    "1": [
        { prop: "midLine_X", label: "中线北坐标X" },
        { prop: "midLine_Y", label: "中线东坐标Y" },
        { prop: "midLinek_H", label: "中线高程H" },
    ],
    "2": [
        { prop: "mileage_K", label: "测量里程(K)"},
        { prop: "leftTrack_X", label: "左轨北坐标X", width: "100px" },
        { prop: "leftTrack_Y", label: "左轨东坐标Y", width: "100px" },
        { prop: "leftTrack_H", label: "左轨高程H", width: "100px" },
        { prop: "midLine_X", label: "中线北坐标X", width: "100px" },
        { prop: "midLine_Y", label: "中线东坐标Y", width: "100px" },
        { prop: "midLinek_H", label: "中线高程H", width: "100px" },
        { prop: "rightTrack_X", label: "右轨北坐标X", width: "100px" },
        { prop: "rightTrack_Y", label: "右轨东坐标Y", width: "100px" },
        { prop: "rightTrack_H", label: "右轨高程H", width: "100px" },
    ],
    "限界/导高/拉出值":[
        { prop: "mileage_Through", label: "贯通里程" },
        { prop: "minDistance_L", label: "左侧最近距离（mm）",width:140  },
        { prop: "height_L", label: "左侧相对高度（mm）" ,width:140},
        { prop: "minDistance_R", label: "右侧最近距离（mm）" ,width:140},
        { prop: "height_R", label: "右侧相对高度（mm）",width:140 },
        { prop: "guideHeight", label: "导高（mm）"},
        { prop: "staggerValue", label: "拉出值（mm）",width:100 },
    ],
    "轨道中心线":[
        { prop: "mileage_K", label: "测量里程(K)"},
        { prop: "midLine_X", label: "中线北坐标X"},
        { prop: "midLine_Y", label: "中线东坐标Y"},
        { prop: "midLinek_H", label: "中线高程H" },
    ]
};
export const formItems = {
    "高程网成果": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "高程", prop: "vertical", rules: Rules.Number(true) },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "CPI数据成果": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "CPII数据成果": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "CPIII数据成果": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "number", label: "棱镜中心高程", prop: "prismCenterHight" },
        { type: "number", label: "球顶高程", prop: "domeElevation" },
        { type: "textarea", label: "备注", prop: "remark"}
    ],
    "加密水准成果": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "球顶高程", prop: "domeElevation"},
        { type: "textarea", label: "备注", prop: "remark"}
    ],
    "轨道线形检测数据": [
        { type: "input", prop: "pointNum", label: "点号" },
        { type: "input", prop: "pointAttribute", label: "点属性" },
        { type: "input", prop: "mileage_K", label: "测量里程(K)"},
        { type: "input", prop: "leftTrack_X", label: "左轨北坐标X"},
        { type: "input", prop: "leftTrack_Y", label: "左轨东坐标Y"},
        { type: "input", prop: "leftTrack_H", label: "左轨高程H" },
        { type: "input", prop: "midLine_X", label: "中线北坐标X" },
        { type: "input", prop: "midLine_Y", label: "中线东坐标Y" },
        { type: "input", prop: "midLinek_H", label: "中线高程H"},
        { type: "input", prop: "rightTrack_X", label: "右轨北坐标X" },
        { type: "input", prop: "rightTrack_Y", label: "右轨东坐标Y"},
        { type: "input", prop: "rightTrack_H", label: "右轨高程H" },
        { type: "input", prop: "offsetLateral_L", label: "左轨横偏(mm)" },
        { type: "input", prop: "offsetLateral_M", label: "中线横偏(mm)"},
        { type: "input", prop: "offsetLateral_R", label: "右轨横偏(mm)" },
        { type: "input", prop: "offsetVertical_L", label: "左轨竖偏(mm)"},
        { type: "input", prop: "offsetVertical_M", label: "中线竖偏(mm)"},
        { type: "input", prop: "offsetVertical_R", label: "右轨竖偏(mm)" },
        { type: "input", prop: "trackDistOffset", label: "轨距偏差量(mm)" },
        { type: "input", prop: "superHightOffset", label: "超高偏差量(mm)"},
        { type: "input", prop: "trackDistChangeRadio", label: "轨距变化率(‰)" },
        { type: "input", prop: "trangularPit", label: "三角坑(mm)" },
        { type: "input", prop: "trackDirectOffset_L", label: "左轨轨向偏差(mm)" },
        { type: "input", prop: "trackDirectOffset_M", label: "中线轨向偏差(mm)" },
        { type: "input", prop: "trackDirectOffset_R", label: "右轨轨向偏差(mm)"},
        { type: "input", prop: "hightLowOffset_L", label: "左轨高低偏差(mm)" },
        { type: "input", prop: "hightLowOffset_M", label: "中线高低偏差(mm)" },
        { type: "input", prop: "hightLowOffset_R", label: "右轨高低偏差(mm)"},
        { type: "input", prop: "plusVector_L", label: "左轨正矢(mm)"},
        { type: "input", prop: "plusVector_M", label: "中线正矢(mm)" },
        { type: "input", prop: "plusVector_R", label: "右轨正矢(mm)"},
        { type: "input", prop: "plusVectorOff_L", label: "左轨正矢偏差(mm)"},
        { type: "input", prop: "plusVectorOff_M", label: "中线正矢偏差(mm)"},
        { type: "input", prop: "plusVectorOff_R", label: "右轨正矢偏差(mm)" },
        { type: "select",prop: "curveType", label: "曲线类型" , optionlist: [{ name: "直线", id: 1 }, { name: "圆", id: 2 }, { name: "缓和曲线", id: 3 }] },
        { type: "select", prop: "offDirection", label: "偏向", optionlist: [{ name: "无", id: 0 }, { name: "左偏", id: 1 }, { name: "右偏", id: 2 }] },
        { type: "input", prop: "trackDist_Actual", label: "实测斜轨距(mm)"},
        { type: "input", prop: "superHight_Actual", label: "实测超高(mm)" },
        { type: "input", prop: "trackDist_Theory", label: "理论平轨距(mm)"},
        { type: "input", prop: "superHight_Theory", label: "理论超高(mm)"},
        { type: "input", prop: "planeReference_Rail", label: "平面基准轨" },
        { type: "input", prop: "altitedeReference_Rail", label: "高程基准轨" },
    ],
    "限界/导高/拉出值":[
        { type: "number", prop: "mileage_Through", label: "贯通里程",rules: Rules.Number(true) },
        { type: "number", prop: "minDistance_L", label: "左侧最近距离（mm）" },
        { type: "number", prop: "height_L", label: "左侧相对高度（mm）" },
        { type: "number", prop: "minDistance_R", label: "右侧最近距离（mm）" },
        { type: "number", prop: "height_R", label: "右侧相对高度（mm）" },
        { type: "number", prop: "guideHeight", label: "导高（mm）"},
        { type: "number", prop: "staggerValue", label: "拉出值（mm）"},
    ],
    "轨道中心线":[
        {  type: "input", prop: "pointNum", label: "点号" },
        {  type: "number", prop: "mileage_K", label: "测量里程(K)"},
        {  type: "number", prop: "midLine_X", label: "中线北坐标X"},
        {  type: "number", prop: "midLine_Y", label: "中线东坐标Y"},
        {  type: "number", prop: "midLinek_H", label: "中线高程H" },
    ]
};
export const apiurls = {
    "高程网成果": {
        listurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/DeleteByDataPerid"
    },
    "CPI数据成果": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPI/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPI/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPI/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPI/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPI/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPI/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPI/DeleteByDataPerid"
    },
    "CPII数据成果": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPII/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPII/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPII/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPII/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPII/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPII/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPII/DeleteByDataPerid"
    },
    "CPIII数据成果": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPIII/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPIII/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPIII/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPIII/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPIII/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPIII/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPIII/DeleteByDataPerid"
    },
    "加密水准成果": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/DeleteByDataPerid"
    },
    "轨道线形检测数据": {
        listurl: baseURL + "/Api/JcjdMan/XzjlTrackInspet/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlTrackInspet/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlTrackInspet/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlTrackInspet/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlTrackInspet/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlTrackInspet/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlTrackInspet/DeleteByDataPerid"
    },
    "限界/导高/拉出值":{
        listurl: baseURL + "/Api/JcjdMan/XzjlOCS/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlOCS/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlOCS/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlOCS/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlOCS/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlOCS/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlOCS/DeleteByDataPerid"
    },
    "轨道中心线":{
        listurl: baseURL + "/Api/JcjdMan/XzjlTrackLine/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlTrackLine/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlTrackLine/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlTrackLine/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlTrackLine/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlTrackLine/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlTrackLine/DeleteByDataPerid"
    }
};
export const yearlyApi = {
    "精测网数据": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDataPerid/GetTree",
        addurl: baseURL + "/Api/JcjdMan/XzjlDataPerid/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDataPerid/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDataPerid/Delete"
    },
    "轨道线形检测数据": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDataPeridMonitor/GetTree",
        addurl: baseURL + "/Api/JcjdMan/XzjlDataPeridMonitor/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDataPeridMonitor/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDataPeridMonitor/Delete"
    },
    "轨道中心线": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDataPeridMonitor/GetTree",
        addurl: baseURL + "/Api/JcjdMan/XzjlDataPeridMonitor/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDataPeridMonitor/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDataPeridMonitor/Delete"
    },
    "限界/导高/拉出值": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDataPerid3D/GetTree",
        addurl: baseURL + "/Api/JcjdMan/XzjlDataPerid3D/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDataPerid3D/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDataPerid3D/Delete"
    }
};