import service from "@/api/index";
const baseURL = process.env.VUE_APP_TRACK_URL
// 
export const XzjlCoordinateProject = (params) => service.get({ url: baseURL + "/Api/JcjdMan/XzjlCoordinateProject/GetListByPage", params });
export const Add_XzjlCoordinateProject = (data) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlCoordinateProject/Add", data });
export const Edit_XzjlCoordinateProject = (data) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlCoordinateProject/Edit", data });
export const Del_XzjlCoordinateProject = (params) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlCoordinateProject/Delete", params });
export const GetList_CoordType = () => service.get({ url: baseURL + "/Api/JcjdMan/XzjlCoordinateProject/GetList_CoordType" });

// 高程网
export const XzjlVertivalNetlist = (params) => service.get({ url: baseURL + "/Api/JcjdMan/XzjlVertivalNet/GetListByPage", params });
export const Add_XzjlVertivalNet = (data) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Add", data });
export const Edit_XzjlVertivalNet = (data) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Edit", data });
export const Del_XzjlVertivalNet = (params) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlVertivalNet/Delete", params });
// 期次
export const XzjlDataPeridlist = (params) => service.get({ url: baseURL + "/Api/JcjdMan/XzjlDataPerid/GetTree", params });
export const Add_XzjlDataPerid = (data) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlDataPerid/Add", data });
export const Edit_XzjlDataPerid = (data) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlDataPerid/Edit", data });
export const Del_XzjlDataPerid = (params) => service.post({ url: baseURL + "/Api/JcjdMan/XzjlDataPerid/Delete", params });