import { Rules } from '@/views/validate'
const baseURL = process.env.VUE_APP_TRACK_URL
export const accountoptions =
    [
        { name: "优化前后平面对比", id: 1 },
        { name: "优化前后高程对比", id: 2 },
        { name: "轨向不平顺", id: 3 },
        { name: "高低不平顺", id: 4 },
        {
            name: "优化前后静态TQI对比", id: 5, children: [
                { name: 'TQI管理值', id: 1 },
                { name: 'TQI峰值', id: 2 },
                { name: 'TQI超限统计', id: 3 },
            ]
        },
    ]

export const columData = {
    "限界/导高/拉出值": [
        { prop: "mileage_Through", label: "贯通里程" },
        { prop: "minDistance_L", label: "左侧最近距离（mm）", width: 140 },
        { prop: "height_L", label: "左侧相对高度（mm）", width: 140 },
        { prop: "minDistance_R", label: "右侧最近距离（mm）", width: 140 },
        { prop: "height_R", label: "右侧相对高度（mm）", width: 140 },
        { prop: "guideHeight", label: "导高（mm）" },
        { prop: "staggerValue", label: "拉出值（mm）", width: 100 },
    ],
    "TQI管理值": [
        { prop: "pointNo", label: "点号" },
        { prop: "location_X", label: "位置(X)" },
        { prop: "location_Y", label: "位置(Y)" },
        { prop: "remark", label: "备注" },
    ],
    "TQI峰值": [
        { prop: "pointNo", label: "点号" },
        { prop: "location_X", label: "位置(X)" },
        { prop: "location_Y", label: "位置(Y)" },
        { prop: "prismCenterHight", label: "棱镜中心高程" },
        { prop: "domeElevation", label: "球顶高程" },
        { prop: "remark", label: "备注" },
    ],
    "TQI超限统计": [
        { prop: "pointNo", label: "点号" },
        { prop: "vertical", label: "高程" },
        { prop: "remark", label: "备注" },
    ],
    "测量成果": [
        { prop: "pointNo", label: "点号" },
        { prop: "domeElevation", label: "球顶高程" },
        { prop: "remark", label: "备注" },
    ],
    "逐桩数据": [
        { prop: "pointNo", label: "点号" },
        { prop: "domeElevation", label: "球顶高程" },
        { prop: "remark", label: "备注" },
    ],
}
export const formItems = {
    "限界/导高/拉出值": [
        { type: "number", prop: "mileage_Through", label: "贯通里程", rules: Rules.Number(true) },
        { type: "number", prop: "minDistance_L", label: "左侧最近距离（mm）" },
        { type: "number", prop: "height_L", label: "左侧相对高度（mm）" },
        { type: "number", prop: "minDistance_R", label: "右侧最近距离（mm）" },
        { type: "number", prop: "height_R", label: "右侧相对高度（mm）" },
        { type: "number", prop: "guideHeight", label: "导高（mm）" },
        { type: "number", prop: "staggerValue", label: "拉出值（mm）" },
    ],
    "TQI管理值": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "TQI峰值": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "TQI超限统计": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "number", label: "棱镜中心高程", prop: "prismCenterHight" },
        { type: "number", label: "球顶高程", prop: "domeElevation" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "测量成果": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "高程", prop: "vertical", rules: Rules.Number(true) },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "逐桩数据": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "球顶高程", prop: "domeElevation" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
}
export const apiurls = {

    "测量成果": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPI/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPI/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPI/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPI/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPI/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPI/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPI/DeleteByDataPerid"
    },
    "逐桩数据": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPI/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPI/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPI/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPI/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPI/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPI/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPI/DeleteByDataPerid"
    },
    "限界/导高/拉出值": {
        listurl: baseURL + "/Api/JcjdMan/XzjlOCS/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlOCS/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlOCS/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlOCS/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlOCS/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlOCS/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlOCS/DeleteByDataPerid"
    },
    "TQI管理值": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPIII/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPIII/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPIII/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPIII/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPIII/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPIII/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPIII/DeleteByDataPerid"
    },
    "TQI峰值": {
        listurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/DeleteByDataPerid"
    },
    "TQI超限统计": {
        listurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlDensifiedLv/DeleteByDataPerid"
    },
}

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
}