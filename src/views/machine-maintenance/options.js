// import { Rules } from '@/views/validate'
const baseURL = process.env.VUE_APP_TRACK_URL
export const accountoptions = [
    {
        name: "", id: 1, children: [
            { name: "线路作业", id: 2 },
            { name: "岔区作业", id: 3 },
        ]
    }
];
export const columData = {

    '线路作业': [
        { prop: "startDate", label: "起始日期" },
        { prop: "endDate", label: "结束日期" },
        { prop: "ifLongChain", label: "是否长链（Y、N）" },
        { prop: "length", label: "长度" },
        { prop: "getWork", label: "工班" },
        { prop: "gageModel", label: "测量方式" },
        { prop: "workModel", label: "作业方式" },
        { prop: "remark", label: "备注" },
        { prop: "dgPlanId", label: "捣固计划" },
    ],
    '岔区作业': [
        { prop: "startDate", label: "起始日期" },
        { prop: "endDate", label: "结束日期" },
        { prop: "station", label: "车站" },
        { prop: "cQ", label: "岔区" },
        { prop: "ifOnLongChain", label: "是否位于长链" },
        { prop: "getWork", label: "工班" },
        { prop: "gageModel", label: "测量方式" },
        { prop: "workModel", label: "作业方式" },
        { prop: "workDevice", label: "作业设备" },
        { prop: "driver", label: "操作手" },
        { prop: "trackNum", label: "车号" },
        { prop: "stableMode", label: "稳定方式" },
        { prop: "wDCZDPL", label: "稳定车振动频率" },
        { prop: "remark", label: "备注" },
        { prop: "dgPlanId", label: "捣固计划" },
    ],
};
export const formItems = {

    "线路作业": [
        { type: "date", prop: "startDate", label: "起始日期" },
        { type: "date", prop: "endDate", label: "结束日期" },
        { type: "select", prop: "ifLongChain", label: "是否长链", optionlist: [{ name: 'Y', id: 'Y' }, { name: 'N', id: 'N' }] },
        { type: "number", prop: "length", label: "长度", appendname: "公里" },
        { type: "input", prop: "getWork", label: "工班" },
        { type: "input", prop: "gageModel", label: "测量方式" },
        { type: "input", prop: "workModel", label: "作业方式" },
        { type: "input", prop: "remark", label: "备注" },
        { type: "input", prop: "dgPlanId", label: "捣固计划" },
    ],
    "岔区作业": [
        { type: "date", prop: "startDate", label: "起始日期" },
        { type: "date", prop: "endDate", label: "结束日期" },
        { type: "input", prop: "station", label: "车站" },
        { type: "input", prop: "cQ", label: "岔区" },
        { type: "select", prop: "ifLongChain", label: "是否位于长链", optionlist: [{ name: 'Y', id: 'Y' }, { name: 'N', id: 'N' }] },
        { type: "input", prop: "getWork", label: "工班" },
        { type: "input", prop: "gageModel", label: "测量方式" },
        { type: "input", prop: "workModel", label: "作业方式" },
        { type: "input", prop: "workDevice", label: "作业设备" },
        { type: "input", prop: "driver", label: "操作手" },
        { type: "input", prop: "trackNum", label: "车号" },
        { type: "input", prop: "stableMode", label: "稳定方式" },
        { type: "input", prop: "wDCZDPL", label: "稳定车振动频率" },
        { type: "input", prop: "remark", label: "备注" },
        { type: "input", prop: "dgPlanId", label: "捣固计划" },
    ],
};
export const apiurls = {

    "线路作业": {
        listurl: baseURL + "/Api/JcjdMan/DgLineWork/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/DgLineWork/Add",
        editurl: baseURL + "/Api/JcjdMan/DgLineWork/Edit",
        delurl: baseURL + "/Api/JcjdMan/DgLineWork/Delete",
        dowload: baseURL + "/Api/JcjdMan/DgLineWork/Export",
        upload: baseURL + "/Api/JcjdMan/DgLineWork/Import"
    },
    "岔区作业": {
        listurl: baseURL + "/Api/JcjdMan/DgCQWork/GetListByPage",
        addurl: baseURL + "/Api/JcjdMan/DgCQWork/Add",
        editurl: baseURL + "/Api/JcjdMan/DgCQWork/Edit",
        delurl: baseURL + "/Api/JcjdMan/DgCQWork/Delete",
        dowload: baseURL + "/Api/JcjdMan/DgCQWork/Export",
        upload: baseURL + "/Api/JcjdMan/DgCQWork/Import"
    },
};
