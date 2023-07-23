import service from "@/api/index";
const baseURL = process.env.VUE_APP_JCSJ_URL
const JDbaseURL = process.env.VUE_APP_TRACK_URL
// 基础数据，文档管理
export const GetAllListData = (params) => service.get({ url: "/api/TechnicalQuality/TechDocData/GetAllList", params });
export const AddFileDir = (params) => service.post({ url: `/api/TechnicalQuality/TechDocData/AddFileDir`, params });
export const TechDocDataUpdate = (data) => service.post({ url: `/api/TechnicalQuality/TechDocData/Update`, data });
// 移动
export const MoveLocation = (params) => service.post({ url: `/api/TechnicalQuality/TechDocData/MoveLocation`, params });
// 批量删除
export const TechDocDataDelete = (params) =>
  service.post({ url: `/api/TechnicalQuality/TechDocData/Delete`, params });
// 添加
export const AddDocInfo = (data) =>
  service.post({ url: `/api/TechnicalQuality/TechDocData/AddDocInfo?remark=${data.remark}`, data });

// 线路
export const GetTbLineByPage = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbLine/GetListByPage", params });
export const Add_TbLine = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbLine/Add", data });
export const Edit_TbLine = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbLine/Edit", data });
export const Del_TbLine = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbLine/DeleteByIds", params });
// 单位类型
export const GetTbDwTypeByPage = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbDwType/GetListByPage_Root", params });
export const GetListAllWithDepartment = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbDw/GetListAllWithDepartment", params });
export const Add_TbDwType = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbDwType/Add", data });
export const Edit_TbDwType = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbDwType/Edit", data });
export const Del_TbDwType = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbDwType/DeleteByIds", params });
// 单位
export const GetTbDwByPage = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbDw/GetListByPage", params });
export const Add_TbDw = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbDw/Add", data });
export const Edit_TbDw = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbDw/Edit", data });
export const Del_TbDw = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbDw/DeleteByIds", params });
// 部门
export const GetTbDepartChild = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbDepartment/GetList_WithChildrens", params });
export const Add_TbDepartment = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbDepartment/Add", data });
export const Edit_TbDepartment = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbDepartment/Edit", data });
export const Del_TbDepartment = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbDepartment/DeleteByIds", params });
// 项目
export const GetTbProjectByPage = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbProject/GetListByPage", params });
export const Add_TbProject = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbProject/Add", data });
export const Edit_TbProject = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbProject/Edit", data });
export const Del_TbProject = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbProject/DeleteByIds", params });
// 权限
export const GetTbQxListAll = () => service.get({ url: baseURL + "/Api/SystemMan/TbQx/GetListAll" });
export const Add_TbQx = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbQx/Add", data });
export const Edit_TbQx = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbQx/Edit", data });
export const Del_TbQx = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbQx/Delete", params });
// 权限类型
export const GetTbQxTypeListAll = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbQxType/GetListByPage", params });
export const Add_TbQxType = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbQxType/Add", data });
export const Edit_TbQxType = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbQxType/Edit", data });
export const Del_TbQxType = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbQxType/DeleteByIds", params });
// 人员
export const GetUserInfo = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbPeople/GetUserInfo", params });
export const GetTbPeopleByPage = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbPeople/GetListByPage", params });
export const GetTbPeopleDetailById = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbPeople/DetailById", params });
export const Add_TbPeople = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbPeople/Add", data });
export const Edit_TbPeople = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbPeople/Edit", data });
export const Del_TbPeople = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbPeople/RemoveByIds", params });
export const drop_TbPeople = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbPeople/DeleteByIds", params });
export const RecoverPeopleByIds = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbPeople/RecoverPeopleByIds", params });
// 角色
export const GetTbJsListAll = () => service.get({ url: baseURL + "/Api/SystemMan/TbJs/GetListAll" });
export const Add_TbJs = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbJs/Add", data });
export const Edit_TbJs = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbJs/Edit", data });
export const Del_TbJs = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbJs/DeleteByIds", params });
export const GetJsPow = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbJs/GetJsPow", params });
export const UpdateJsPow = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbJs/UpdateJsPow", params });

// 角色类型
export const GetTbJsTypeListAll = (params) => service.get({ url: baseURL + "/Api/SystemMan/TbJsType/GetListByPage", params });
export const Add_TbJsType = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbJsType/Add", data });
export const Edit_TbJsType = (data) => service.post({ url: baseURL + "/Api/SystemMan/TbJsType/Edit", data });
export const Del_TbJsType = (params) => service.post({ url: baseURL + "/Api/SystemMan/TbJsType/DeleteByIds", params });

// 计划
export const GetListByLine = (params) => service.get({ url: JDbaseURL + "/Api/JcjdMan/DgPlan/GetListByLine", params });