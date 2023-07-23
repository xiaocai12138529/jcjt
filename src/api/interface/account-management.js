import service from "@/api/index";
const baseURL = process.env.VUE_APP_GWTZ_URL

// 路局列表
export const GetListAll_Dw = () => service.get({ url: baseURL + "/Api/LkjMan/LkjLine/GetListAll_Dw" });
// ============================线路表====================
export const GetListByPage = (params) => service.get({ url: baseURL + "/Api/LkjMan/LkjLine/GetListByPage", params });
export const Add_Line = (data) => service.post({ url: baseURL + "/Api/LkjMan/LkjLine/Add", data });
export const Edit_Line = (data) => service.post({ url: baseURL + "/Api/LkjMan/LkjLine/Edit", data });
export const Del_Line = (params) => service.post({ url: baseURL + "/Api/LkjMan/LkjLine/DeleteByIds", params });
// ============================车站表====================
export const GetListByPage_Station = (params) => service.get({ url: baseURL + "/Api/LkjMan/LkjStation/GetListByPage", params });
export const Add_Station = (data) => service.post({ url: baseURL + "/Api/LkjMan/LkjStation/Add", data });
export const Edit_Station = (data) => service.post({ url: baseURL + "/Api/LkjMan/LkjStation/Edit", data });
export const Del_Station = (data) => service.post({ url: baseURL + "/Api/LkjMan/LkjStation/DeleteByIds", data });

// ============================断链表====================
export const GetListByPage_Chain = (params) => service.get({ url: baseURL + "/Api/LkjMan/LkjChain/GetListByPage", params });
export const Add_Chain = (data) => service.post({ url: baseURL + "/Api/LkjMan/LkjChain/Add", data });
export const Edit_Chain = (data) => service.post({ url: baseURL + "/Api/LkjMan/LkjChain/Edit", data });
export const Del_Chain = (data) => service.post({ url: baseURL + "/Api/LkjMan/LkjChain/DeleteByIds", data });

// 首页台账信息统计
export const Static_Info = () => service.get({ url: baseURL + "/Api/LkjMan/LkjMainPage/Static_Info" });