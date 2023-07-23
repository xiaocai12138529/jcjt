// import { Rules } from '@/views/validate'
const baseURL = process.env.VUE_APP_TRACK_URL
export const accountoptions = [
    {
        name: "大机捣固", id: 1, children: [
            { name: "施工管理", id: 1 },
        ]
    }
];
export const columData = [
    { prop: "lineName", label: "所属线路" },
    { prop: "goType", label: "行别" },
    { prop: "time", label: "起止时间" },
    { prop: "endStart_M", label: "里程范围(公里)" },
    { prop: "trackCode", label: "捣固车型号" },
    { prop: "trackNumber", label: "捣固车数量" },
    { prop: "diydwName", label: "所属单位" },//(部门)
]
export const formItems =
    [
        { type: "number", prop: "lineId", label: "所属线路" },
        { type: "input", prop: "goType", label: "行别" },
        { type: "date", prop: "startDate", label: "计划开始时间" },
        { type: "date", prop: "endDate", label: "计划结束时间" },
        { type: "number", prop: "start_M", label: "开始里程", appendname: "公里" },
        { type: "number", prop: "end_M", label: "结束里程", appendname: "公里" },
        { type: "input", prop: "trackCode", label: "捣固车型号" },
        { type: "number", prop: "trackNumber", label: "捣固车数量" },
    ]

export const apiurls = {
    dataurl: baseURL + "/Api/JcjdMan/DgPlan/GetListByPage",
    addurl: baseURL + "/Api/JcjdMan/DgPlan/Add",
    editurl: baseURL + "/Api/JcjdMan/DgPlan/Edit",
    delurl: baseURL + "/Api/JcjdMan/DgPlan/Delete",
    dowload: baseURL + "/Api/JcjdMan/XzjlDeviationMan/Export",
    upload: baseURL + "/Api/JcjdMan/XzjlDeviationMan/Import"
};
