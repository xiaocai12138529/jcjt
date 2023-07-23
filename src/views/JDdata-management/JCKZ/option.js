import { Rules } from '@/views/validate'
const baseURL = process.env.VUE_APP_TRACK_URL
export const accountoptions =
    [
        { name: "坐标系统", id: 1 },
        { name: "CPI", id: 2 },
        { name: "CPII", id: 3 },
        { name: "CPIII", id: 4 },
        { name: "高程网", id: 5 },
        { name: "加密水准", id: 6 },
    ]
    
export const columData = {

    "坐标系统": [
        { prop: "pointNo", label: "点号" },
        { prop: "location_X", label: "位置(X)" },
        { prop: "location_Y", label: "位置(Y)" },
        { prop: "remark", label: "备注" },
    ],
    "CPI": [
        { prop: "pointNo", label: "点号" },
        { prop: "location_X", label: "位置(X)" },
        { prop: "location_Y", label: "位置(Y)" },
        { prop: "remark", label: "备注" },
    ],
    "CPII": [
        { prop: "pointNo", label: "点号" },
        { prop: "location_X", label: "位置(X)" },
        { prop: "location_Y", label: "位置(Y)" },
        { prop: "remark", label: "备注" },
    ],
    "CPIII": [
        { prop: "pointNo", label: "点号" },
        { prop: "location_X", label: "位置(X)" },
        { prop: "location_Y", label: "位置(Y)" },
        { prop: "prismCenterHight", label: "棱镜中心高程" },
        { prop: "domeElevation", label: "球顶高程" },
        { prop: "remark", label: "备注" },
    ],
    "高程网": [
        { prop: "pointNo", label: "点号" },
        { prop: "vertical", label: "高程" },
        { prop: "remark", label: "备注" },
    ],
    "加密水准": [
        { prop: "pointNo", label: "点号" },
        { prop: "domeElevation", label: "球顶高程" },
        { prop: "remark", label: "备注" },
    ],
}
export const formItems = {


    "坐标系统": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "CPI": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "CPII": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "CPIII": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "位置(X)", prop: "location_X" },
        { type: "number", label: "位置(Y)", prop: "location_Y" },
        { type: "number", label: "棱镜中心高程", prop: "prismCenterHight" },
        { type: "number", label: "球顶高程", prop: "domeElevation" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "高程网": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "高程", prop: "vertical", rules: Rules.Number(true) },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
    "加密水准": [
        { type: "input", label: "点号", prop: "pointNo", rules: Rules.Text(true) },
        { type: "number", label: "球顶高程", prop: "domeElevation" },
        { type: "textarea", label: "备注", prop: "remark" }
    ],
}
export const apiurls = {

    "坐标系统": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPI/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPI/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPI/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPI/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPI/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPI/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPI/DeleteByDataPerid"
    },
    "CPI": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPI/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPI/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPI/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPI/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPI/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPI/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPI/DeleteByDataPerid"
    },
    "CPII": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPII/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPII/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPII/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPII/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPII/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPII/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPII/DeleteByDataPerid"
    },
    "CPIII": {
        listurl: baseURL + "/Api/JcjdMan/XzjlCPIII/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlCPIII/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlCPIII/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlCPIII/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlCPIII/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlCPIII/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlCPIII/DeleteByDataPerid"
    }, "高程网": {
        listurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Add",
        editurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Edit",
        delurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Delete",
        dowload: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Export",
        upload: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Import",
        delallurl: baseURL + "/Api/JcjdMan/XzjlVertivalNet/DeleteByDataPerid"
    },
    "加密水准": {
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