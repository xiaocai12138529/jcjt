import service from "@/api/index";
const baseURL = process.env.VUE_APP_TRACK_URL

// 期次
export const XzjlDataGroupTree = (params) => service.get({ url: baseURL + "/Api/JcjdMan/XzjlDataGroup/GetTree", params });
export const Add_XzjlDataGroup = (data) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlDataGroup/Add", data });
export const Edit_XzjlDataGroup = (data) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlDataGroup/Edit", data });
export const Del_XzjlDataGroup = (params) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlDataGroup/Delete", params });

export const GetList_TQIDataPerid = (params) => service.get({ url: baseURL + "/Api/JcjdMan/XzjlTQICompare/GetList_TQIDataPerid", params });
export const GetList_TQICompare = (params) => service.get({ url: baseURL + "/Api/JcjdMan/XzjlTQICompare/GetList_TQICompare", params });
// 平面测点拨距统计  he  纵断面测点抬落量 统计
export const GetList_XzjlDistanceOrXzjlFalling = (url,params) => service.get({ url: baseURL + url, params });
// 静态管理值和动态管理值   有无超限的饼图
export const GetList_JtOrDt = (url,params) => service.get({ url: baseURL + url, params });

// 超标区段统计
export const GetList_CBQDSTATIC = (url,params) => service.get({ url: baseURL + url, params });